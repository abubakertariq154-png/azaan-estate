'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Property, PropertyCategory, PropertyFilterState } from '@/types/property';
import { INITIAL_PROPERTIES } from '@/data/initialProperties';
import { HeroSection } from '@/components/HeroSection';
import { FilterBar } from '@/components/FilterBar';
import { PropertyCard } from '@/components/PropertyCard';
import { AddPropertyModal } from '@/components/AddPropertyModal';
import { PropertyDetailsModal } from '@/components/PropertyDetailsModal';
import { VideoModal } from '@/components/VideoModal';
import { ContactSection } from '@/components/ContactSection';
import { Building2, Sparkles, Plus, AlertCircle } from 'lucide-react';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'all' | PropertyCategory>('all');
  
  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

  // Add property handler
  const handleAddProperty = (newProperty: Property) => {
    setProperties((prev) => [newProperty, ...prev]);
  };

  // Delete property handler
  const handleDeleteProperty = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this property listing?')) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
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
      
      {/* 100vh Hero Section With Integrated Navbar */}
      <HeroSection
        activeCategory={activeCategoryTab}
        onSelectCategory={handleSelectTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1">

        {/* Property Showcase & Exploration */}
        <section id="properties-section" className="max-w-7xl mx-auto px-4 sm:px-8 pb-20 pt-8 sm:pt-12">
          
          {/* Section Heading & Category Tabs */}
          <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[#875d46] font-bold text-xs tracking-widest uppercase mb-1 block">
                Exclusive Portfolio
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1c241e] tracking-tight">
                {activeCategoryTab === 'all' && 'All Curated Properties'}
                {activeCategoryTab === 'residential' && 'Residential Mansions & Villas'}
                {activeCategoryTab === 'commercial' && 'Commercial Plazas & Corporate Hubs'}
                {activeCategoryTab === 'highrise' && 'Skyline Penthouses & Highrises'}
              </h2>
            </div>

            {/* Quick Segmented Category Switches with live counts */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => handleSelectTab('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeCategoryTab === 'all'
                    ? 'bg-[#1c241e] text-white border-[#1c241e] shadow-sm'
                    : 'bg-white text-stone-600 border-[#e5e1d7] hover:border-stone-400'
                }`}
              >
                All ({categoryCounts.all})
              </button>
              <button
                onClick={() => handleSelectTab('residential')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeCategoryTab === 'residential'
                    ? 'bg-[#1c241e] text-white border-[#1c241e] shadow-sm'
                    : 'bg-white text-stone-600 border-[#e5e1d7] hover:border-stone-400'
                }`}
              >
                Residential ({categoryCounts.residential})
              </button>
              <button
                onClick={() => handleSelectTab('commercial')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeCategoryTab === 'commercial'
                    ? 'bg-[#1c241e] text-white border-[#1c241e] shadow-sm'
                    : 'bg-white text-stone-600 border-[#e5e1d7] hover:border-stone-400'
                }`}
              >
                Commercial ({categoryCounts.commercial})
              </button>
              <button
                onClick={() => handleSelectTab('highrise')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  activeCategoryTab === 'highrise'
                    ? 'bg-[#1c241e] text-white border-[#1c241e] shadow-sm'
                    : 'bg-white text-stone-600 border-[#e5e1d7] hover:border-stone-400'
                }`}
              >
                Highrise ({categoryCounts.highrise})
              </button>
            </div>
          </div>

          {/* Interactive Search & Filter Controls */}
          <div className="mb-8">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={filteredProperties.length}
            />
          </div>

          {/* Property Cards Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={(prop) => setSelectedProperty(prop)}
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
                  onClick={() => setIsAddModalOpen(true)}
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
            <div className="w-7 h-7 rounded-lg border-2 border-[#1c241e] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-[#1c241e]" />
            </div>
            <span className="font-extrabold text-[#1c241e] tracking-tight text-sm">AZAAN ESTATE</span>
          </div>
          <div className="flex items-center gap-6 font-medium">
            <button onClick={() => handleSelectTab('residential')} className="hover:text-[#1c241e] transition-colors">Residential</button>
            <button onClick={() => handleSelectTab('commercial')} className="hover:text-[#1c241e] transition-colors">Commercial</button>
            <button onClick={() => handleSelectTab('highrise')} className="hover:text-[#1c241e] transition-colors">Highrise</button>
            <a href="#contact" className="hover:text-[#1c241e] transition-colors">Contact</a>
          </div>
          <p className="text-stone-500">&copy; 2026 Azaan Estate. All rights reserved.</p>
        </div>
      </footer>

      {/* Interactive Modals */}
      <AddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProperty={handleAddProperty}
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

    </div>
  );
}
