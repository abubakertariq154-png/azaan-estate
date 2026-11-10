'use client';

import { Property } from '@/types/property';
import { INITIAL_PROPERTIES } from '@/data/initialProperties';

const STORAGE_KEY = 'azaan_estate_properties_v1';
const CHANGE_EVENT = 'azaan_properties_changed';

/**
 * Retrieve properties from localStorage, or initialize with INITIAL_PROPERTIES.
 */
export function getStoredProperties(): Property[] {
  if (typeof window === 'undefined') {
    return INITIAL_PROPERTIES;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
      return INITIAL_PROPERTIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_PROPERTIES;
  } catch (error) {
    console.error('Failed to read properties from localStorage:', error);
    return INITIAL_PROPERTIES;
  }
}

/**
 * Persist properties to localStorage and notify other components/tabs.
 */
export function saveProperties(properties: Property[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: properties }));
  } catch (error) {
    console.error('Failed to save properties to localStorage:', error);
  }
}

/**
 * Add a new property to the top of the list.
 */
export function addProperty(property: Property): Property[] {
  const current = getStoredProperties();
  const updated = [property, ...current];
  saveProperties(updated);
  return updated;
}

/**
 * Update an existing property by ID.
 */
export function updateProperty(updatedProperty: Property): Property[] {
  const current = getStoredProperties();
  const updated = current.map((item) =>
    item.id === updatedProperty.id ? updatedProperty : item
  );
  saveProperties(updated);
  return updated;
}

/**
 * Delete a property by ID.
 */
export function deleteProperty(id: string): Property[] {
  const current = getStoredProperties();
  const updated = current.filter((item) => item.id !== id);
  saveProperties(updated);
  return updated;
}

/**
 * Toggle featured flag for a property.
 */
export function toggleFeatured(id: string): Property[] {
  const current = getStoredProperties();
  const updated = current.map((item) =>
    item.id === id ? { ...item, featured: !item.featured } : item
  );
  saveProperties(updated);
  return updated;
}

/**
 * Reset back to sample default properties.
 */
export function resetToDefaults(): Property[] {
  saveProperties(INITIAL_PROPERTIES);
  return INITIAL_PROPERTIES;
}

/**
 * Subscribe to property updates across windows and components.
 */
export function subscribeToProperties(callback: (properties: Property[]) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleCustomEvent = (e: Event) => {
    const custom = e as CustomEvent<Property[]>;
    if (custom.detail) {
      callback(custom.detail);
    } else {
      callback(getStoredProperties());
    }
  };

  const handleStorageEvent = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(getStoredProperties());
    }
  };

  window.addEventListener(CHANGE_EVENT, handleCustomEvent);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    window.removeEventListener(CHANGE_EVENT, handleCustomEvent);
    window.removeEventListener('storage', handleStorageEvent);
  };
}
