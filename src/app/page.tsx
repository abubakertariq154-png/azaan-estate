'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Property, PropertyCategory, PropertyFilterState } from '@/types/property';
import {
  getStoredProperties,
  addProperty,
  updateProperty,
  deleteProperty,
  subscribeToProperties,
} from '@/lib/propertyStorage';
import { HeroSection } from '@/components/HeroSection';
import { PropertyCard } from '@/components/PropertyCard';
import { PropertyFormModal } from '@/components/PropertyFormModal';
import { PropertyDetailsModal } from '@/components/PropertyDetailsModal';
import { VideoModal } from '@/components/VideoModal';
import { ContactSection } from '@/components/ContactSection';
import { Building2, Plus, AlertCircle, SlidersHorizontal } from 'lucide-react';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | PropertyCategory>('all');
  
  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  // Filters state
  const [filters, setFilters] = useState<PropertyFilterState>({
    searchQuery: '',
    category: 'all',
    listingType: 'all',
    city: 'all',
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: 'all',
    sortBy: 'newest',
  });

  // Load properties from persistent storage and subscribe
  useEffect(() => {
    setProperties(getStoredProperties());

    const unsubscribe = subscribeToProperties((updated) => {
      setProperties(updated);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const propertyId = new URLSearchParams(window.location.search).get('property');
    if (!propertyId || properties.length === 0) return;

    const propertyFromUrl = properties.find((item) => item.id === propertyId);
    if (propertyFromUrl) {
      setSelectedProperty(propertyFromUrl);
    }
  }, [properties]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (selectedProperty) {
      params.set('property', selectedProperty.id);
    } else {
      params.delete('property');
    }

    const queryString = params.toString();
    const nextUrl = `${window.location.pathname}${queryString ? `?${queryString}` : ''}`;
    window.history.replaceState({}, '', nextUrl);
  }, [selectedProperty]);

  // Sync category navbar tab with filters
  const handleSelectTab = (tab: 'all' | PropertyCategory) => {
    setActiveCategoryTab(tab);
    setFilters((prev) => ({
      ...prev,
      category: tab,
    }));
  };

  const handleFilterChange = <K extends keyof PropertyFilterState>(
    key: K,
    value: PropertyFilterState[K]
  ) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'category') {
        setActiveCategoryTab(value as any);
      }
      return updated;
    });
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'all',
      listingType: 'all',
      city: 'all',
      minPrice: 0,
      maxPrice: 10000000,
      bedrooms: 'all',
      sortBy: 'newest',
    });
    setActiveCategoryTab('all');
  };

  // Open Add modal
  const handleOpenAdd = () => {
    setEditingProperty(null);
    setIsFormModalOpen(true);
  };

  // Open Edit modal
  const handleOpenEdit = (property: Property, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProperty(property);
    setIsFormModalOpen(true);
  };

  // Save property (handles both Add and Edit)
  const handleSaveProperty = (propertyData: Property) => {
    if (editingProperty) {
      updateProperty(propertyData);
    } else {
      addProperty(propertyData);
    }
    if (selectedProperty?.id === propertyData.id) {
      setSelectedProperty(propertyData);
    }
  };

  // Delete property handler
  const handleDeleteProperty = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this property listing?')) {
      deleteProperty(id);
      if (selectedProperty?.id === id) {
        setSelectedProperty(null);
      }
    }
  };

  // Open video tour
  const handleOpenVideo = (videoUrl: string, title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveVideo({ url: videoUrl, title });
  };

  // Filter & Search Logic
  const filteredProperties = useMemo(() => {
    return properties
      .filter((item) => {
        // Category check
        if (filters.category !== 'all' && item.category !== filters.category) {
          return false;
        }

        // Listing type check (Sale / Rent)
        if (filters.listingType !== 'all' && item.listingType !== filters.listingType) {
          return false;
        }

        // City check
        if (filters.city !== 'all' && item.location.city.toLowerCase() !== filters.city.toLowerCase()) {
          return false;
        }

        // Bedroom check
        if (filters.bedrooms !== 'all') {
          const reqBeds = Number(filters.bedrooms);
          if (!item.features.bedrooms || item.features.bedrooms < reqBeds) {
            return false;
          }
        }

        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchDesc = item.description.toLowerCase().includes(q);
          const matchCity = item.location.city.toLowerCase().includes(q);
          const matchArea = item.location.area.toLowerCase().includes(q);
          const matchAmenities = item.amenities.some((a) => a.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCity && !matchArea && !matchAmenities) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'area') return b.features.areaSqFt - a.features.areaSqFt;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [properties, filters]);

  // Category counts for quick metrics
  const categoryCounts = useMemo(() => {
    return {
      all: properties.length,
      residential: properties.filter((p) => p.category === 'residential').length,
      commercial: properties.filter((p) => p.category === 'commercial').length,
      highrise: properties.filter((p) => p.category === 'highrise').length,
    };
  }, [properties]);

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-[#1c241e] flex flex-col selection:bg-[#875d46] selection:text-white font-sans">
      
      {/* Hero Section With Integrated Search & Filters */}
      <HeroSection
        filters={filters}
        onFilterChange={handleFilterChange}
        activeCategory={activeCategoryTab}
        onSelectCategory={handleSelectTab}
        categoryCounts={categoryCounts}
        totalResults={filteredProperties.length}
      />

      {/* Main Container */}
      <main className="flex-1 bg-[#dfe6dd]">

        {/* Property Showcase & Exploration */}
        <section id="properties-section" className="max-w-7xl mx-auto px-4 sm:px-8 pb-20 pt-8 sm:pt-12">

          {/* Section Header & Active Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#875d46]" />
                <span className="text-xs uppercase font-extrabold tracking-wider text-[#875d46]">Verified Portfolio</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1c241e] tracking-tight">
                Featured Properties
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-white text-stone-700 border border-stone-200 shadow-2xs">
                Showing {filteredProperties.length} of {properties.length} listings
              </span>
              {(filters.category !== 'all' || filters.listingType !== 'all' || filters.searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#875d46] hover:bg-[#724e3a] text-white transition-colors cursor-pointer"
                >
                  Clear Filters ✕
                </button>
              )}
            </div>
          </div>

          {/* Property Cards Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={(prop) => setSelectedProperty(prop)}
                  onEdit={(prop, e) => handleOpenEdit(prop, e)}
                  onDelete={handleDeleteProperty}
                  onOpenVideo={(url, title, e) => handleOpenVideo(url, title, e)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-[28px] border border-[#e8e6df] p-8 shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#f6f2ea] text-[#875d46] border border-[#e8e0d1] mx-auto flex items-center justify-center mb-4">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-[#1c241e] mb-2">No Matching Properties Found</h3>
              <p className="text-stone-500 text-sm max-w-md mx-auto mb-6">
                We couldn&apos;t find any properties matching your current filters. Try resetting the filters or add a new listing.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 rounded-full bg-[#eeeae1] hover:bg-[#e4dfd4] text-stone-700 text-xs font-semibold transition-all"
                >
                  Clear All Filters
                </button>
                <button
                  onClick={handleOpenAdd}
                  className="px-5 py-2.5 rounded-full bg-[#1c241e] hover:bg-[#2b362e] text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>List New Property</span>
                </button>
              </div>
            </div>
          )}

        </section>

        {/* Contact & Consultation Section */}
        <ContactSection />

      </main>

      {/* Footer */}
      <footer className="border-t border-[#e8e6df] bg-[#f6f5f2] py-12 text-stone-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg border-2 border-[#1c241e] flex items-center justify-center bg-[#1c241e] text-white">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-[#1c241e] tracking-tight text-sm">AZAAN ESTATE</span>
          </div>
          <div className="flex items-center gap-6 font-medium flex-wrap">
            <button onClick={() => handleSelectTab('residential')} className="hover:text-[#1c241e] transition-colors">Residential</button>
            <button onClick={() => handleSelectTab('commercial')} className="hover:text-[#1c241e] transition-colors">Commercial</button>
            <button onClick={() => handleSelectTab('highrise')} className="hover:text-[#1c241e] transition-colors">Highrise</button>
            <a href="#contact" className="hover:text-[#1c241e] transition-colors">Contact</a>
            <Link href="/admin" className="text-[#875d46] hover:text-[#1c241e] font-bold flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
          <p className="text-stone-500">&copy; 2026 Azaan Estate. All rights reserved.</p>
        </div>
      </footer>

      {/* Interactive Modals */}
      <PropertyFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingProperty(null);
        }}
        onSave={handleSaveProperty}
        initialProperty={editingProperty}
      />

      <PropertyDetailsModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenVideo={(url, title) => handleOpenVideo(url, title)}
      />

      <VideoModal
        isOpen={!!activeVideo}
        videoUrl={activeVideo?.url || null}
        title={activeVideo?.title || ''}
        onClose={() => setActiveVideo(null)}
      />

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/923045351802"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp with Abubakr"
        className="fixed bottom-6 right-5 z-50 flex items-center gap-2.5 group"
      >
        {/* Tooltip */}
        <span className="hidden group-hover:flex items-center bg-[#1c241e] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
          Chat with Abubakr
        </span>
        {/* WhatsApp Icon Button */}
        <div className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20b957] shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-4 border-white">
          <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.004 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.333.63 4.63 1.826 6.638L2.667 29.333l6.861-1.796A13.263 13.263 0 0 0 16.004 29.333C23.37 29.333 29.333 23.362 29.333 16S23.37 2.667 16.004 2.667zm0 24.267c-2.145 0-4.244-.575-6.08-1.665l-.435-.258-4.073 1.067 1.084-3.955-.283-.455A10.886 10.886 0 0 1 5.067 16c0-6.03 4.907-10.933 10.937-10.933S26.933 9.97 26.933 16 22.034 26.934 16.004 26.934zm5.993-8.182c-.328-.165-1.942-.957-2.242-1.067-.3-.11-.518-.165-.736.165s-.845 1.067-1.036 1.287c-.19.22-.382.247-.71.082-.328-.165-1.385-.51-2.638-1.627-.975-.87-1.633-1.943-1.824-2.271-.19-.328-.02-.505.144-.668.147-.146.328-.382.491-.573.164-.19.218-.328.328-.546.11-.22.055-.41-.027-.573-.082-.165-.736-1.774-1.009-2.429-.265-.636-.535-.55-.736-.56-.19-.008-.41-.01-.627-.01s-.573.082-.873.41c-.3.328-1.145 1.12-1.145 2.73s1.172 3.165 1.335 3.383c.164.22 2.307 3.52 5.59 4.937.782.337 1.391.539 1.866.69.784.25 1.498.215 2.062.13.629-.094 1.942-.793 2.216-1.56.274-.764.274-1.42.19-1.558-.082-.137-.3-.22-.627-.383z"/>
          </svg>
        </div>
      </a>

    </div>
  );
}
