'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Property, PropertyCategory, PropertyListingType } from '@/types/property';
import {
  getStoredProperties,
  addProperty,
  updateProperty,
  deleteProperty,
  toggleFeatured,
  resetToDefaults,
  subscribeToProperties,
} from '@/lib/propertyStorage';
import { PropertyFormModal } from '@/components/PropertyFormModal';
import { PropertyDetailsModal } from '@/components/PropertyDetailsModal';
import { VideoModal } from '@/components/VideoModal';
import {
  Building2,
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  Edit,
  Trash2,
  Star,
  Eye,
  Play,
  RotateCcw,
  ArrowUpRight,
  Home,
  CheckCircle2,
  DollarSign,
  Layers,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  LayoutGrid,
  Table as TableIcon,
  AlertTriangle,
  X
} from 'lucide-react';

export default function AdminPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | PropertyCategory>('all');
  const [selectedListingType, setSelectedListingType] = useState<'all' | PropertyListingType>('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'price-desc' | 'price-asc' | 'area'>('newest');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Modals state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [websiteLink, setWebsiteLink] = useState('');
  const [adminLink, setAdminLink] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const copyLink = async (label: string, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      showToast(`${label} link copied.`);
    } catch {
      showToast(`Unable to copy ${label.toLowerCase()} link.`);
    }
  };

  // Load from storage and subscribe to changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWebsiteLink(`${window.location.origin}/`);
      setAdminLink(`${window.location.origin}/admin`);
    }

    setProperties(getStoredProperties());
    setIsLoaded(true);

    const unsubscribe = subscribeToProperties((updated) => {
      setProperties(updated);
    });

    return () => unsubscribe();
  }, []);

  // Handlers
  const handleOpenAdd = () => {
    setEditingProperty(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (property: Property) => {
    setEditingProperty(property);
    setIsFormModalOpen(true);
  };

  const handleSaveProperty = (propertyData: Property) => {
    if (editingProperty) {
      updateProperty(propertyData);
      showToast(`Property "${propertyData.title}" updated successfully.`);
    } else {
      addProperty(propertyData);
      showToast(`New property "${propertyData.title}" listed successfully.`);
    }
  };

  const confirmDelete = () => {
    if (!propertyToDelete) return;
    deleteProperty(propertyToDelete.id);
    showToast(`Property "${propertyToDelete.title}" removed.`);
    setPropertyToDelete(null);
  };

  const handleToggleFeatured = (id: string, currentStatus: boolean, title: string) => {
    toggleFeatured(id);
    showToast(
      currentStatus
        ? `Removed "${title}" from featured.`
        : `Marked "${title}" as featured!`
    );
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all properties to the default sample portfolio? Any custom listings will be overwritten.')) {
      resetToDefaults();
      showToast('All properties reset to default portfolio.');
    }
  };

  // Metrics calculation
  const metrics = useMemo(() => {
    const total = properties.length;
    const residential = properties.filter((p) => p.category === 'residential').length;
    const commercial = properties.filter((p) => p.category === 'commercial').length;
    const highrise = properties.filter((p) => p.category === 'highrise').length;
    const forSale = properties.filter((p) => p.listingType === 'sale').length;
    const forRent = properties.filter((p) => p.listingType === 'rent').length;
    const totalValuation = properties.reduce((acc, curr) => acc + (curr.listingType === 'sale' ? curr.price : curr.price * 12), 0);

    return { total, residential, commercial, highrise, forSale, forRent, totalValuation };
  }, [properties]);

  // Unique cities list
  const availableCities = useMemo(() => {
    const set = new Set(properties.map((p) => p.location.city));
    return Array.from(set).filter(Boolean);
  }, [properties]);

  // Filtered & sorted properties
  const filteredProperties = useMemo(() => {
    return properties
      .filter((item) => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
        if (selectedListingType !== 'all' && item.listingType !== selectedListingType) return false;
        if (selectedCity !== 'all' && item.location.city.toLowerCase() !== selectedCity.toLowerCase()) return false;

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title.toLowerCase().includes(q);
          const matchCity = item.location.city.toLowerCase().includes(q);
          const matchArea = item.location.area.toLowerCase().includes(q);
          const matchId = item.id.toLowerCase().includes(q);
          const matchAgent = item.agent.name.toLowerCase().includes(q);
          if (!matchTitle && !matchCity && !matchArea && !matchId && !matchAgent) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'area') return b.features.areaSqFt - a.features.areaSqFt;
        if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [properties, selectedCategory, selectedListingType, selectedCity, searchQuery, sortBy]);

  const formatPrice = (price: number, listingType: string) => {
    const formatted = price >= 10000000
      ? `${(price / 10000000).toFixed(1)} Cr`
      : price >= 100000
      ? `${(price / 100000).toFixed(1)} Lac`
      : price.toLocaleString('en-PK');
    return listingType === 'rent' ? `PKR ${formatted}/mo` : `PKR ${formatted}`;
  };

  const getCategoryBadgeClass = (category: PropertyCategory) => {
    switch (category) {
      case 'residential':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'commercial':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'highrise':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f5f2] text-[#1c241e] font-sans flex flex-col">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1c241e] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Admin Top Header Bar */}
      <header className="bg-white border-b border-[#e8e6df] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Portal title */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl border-2 border-[#1c241e] flex items-center justify-center transition-transform group-hover:scale-105 bg-[#1c241e] text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-lg tracking-tight text-[#1c241e] leading-none">
                  AZAAN ESTATE
                </div>
                <div className="text-[10px] tracking-wider text-[#875d46] uppercase font-bold mt-0.5">
                  ADMIN MANAGEMENT PORTAL
                </div>
              </div>
            </Link>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleResetData}
              title="Reset data back to default initial properties"
              className="px-3.5 py-2 rounded-full border border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden md:inline">Reset Defaults</span>
            </button>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-[#1c241e] bg-white hover:bg-stone-50 text-[#1c241e] text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Open Website</span>
              <ArrowUpRight className="w-3 h-3 text-stone-500" />
            </Link>

            <button
              onClick={handleOpenAdd}
              className="px-5 py-2 rounded-full bg-[#1c241e] hover:bg-[#2b362e] text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all hover:scale-[1.02] active:scale-95"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Add Property</span>
            </button>
          </div>

        </div>
      </header>

      {/* Client Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 w-full">
        <div className="bg-white border border-[#e8e6df] rounded-[24px] p-4 sm:p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#875d46] mb-1.5">Send to Client</p>
              <h2 className="text-xl font-black text-[#1c241e]">Website & Admin Links</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full lg:max-w-2xl">
              <div className="rounded-2xl border border-[#efe8df] bg-[#faf7f3] p-3">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">Website</span>
                  <a
                    href={websiteLink || '/'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#875d46] font-semibold text-xs hover:underline"
                  >
                    Open
                  </a>
                </div>
                <p className="text-xs text-stone-500 break-all mb-3">{websiteLink || 'Loading...'}</p>
                <button
                  onClick={() => copyLink('Website', websiteLink || window.location.origin + '/')}
                  className="px-3 py-1.5 rounded-full bg-[#1c241e] text-white text-[11px] font-semibold hover:bg-[#2b362e] transition-colors"
                >
                  Copy Link
                </button>
              </div>

              <div className="rounded-2xl border border-[#efe8df] bg-[#faf7f3] p-3">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">Admin</span>
                  <a
                    href={adminLink || '/admin'}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#875d46] font-semibold text-xs hover:underline"
                  >
                    Open
                  </a>
                </div>
                <p className="text-xs text-stone-500 break-all mb-3">{adminLink || 'Loading...'}</p>
                <button
                  onClick={() => copyLink('Admin', adminLink || window.location.origin + '/admin')}
                  className="px-3 py-1.5 rounded-full bg-[#1c241e] text-white text-[11px] font-semibold hover:bg-[#2b362e] transition-colors"
                >
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full space-y-6">
        
        {/* KPI Metrics Dashboard Overview */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          <div className="bg-white p-4 rounded-2xl border border-[#e8e6df] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Total Properties
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-[#1c241e]">{metrics.total}</span>
              <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e8e6df] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Residential
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-[#1c241e]">{metrics.residential}</span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                Villas
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e8e6df] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 block mb-1">
              Commercial
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-[#1c241e]">{metrics.commercial}</span>
              <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                Plazas
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e8e6df] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 block mb-1">
              Highrise Towers
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-[#1c241e]">{metrics.highrise}</span>
              <span className="text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                Penthouses
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e8e6df] shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#875d46] block mb-1">
              Sale / Rent
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-[#1c241e]">
                {metrics.forSale} <span className="text-xs font-normal text-stone-400">/</span> {metrics.forRent}
              </span>
              <span className="text-[11px] font-bold text-[#875d46] bg-[#f9f5f0] px-2 py-0.5 rounded-full border border-[#ede3d5]">
                Types
              </span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#e8e6df] shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Est. Portfolio
            </span>
            <div className="flex items-baseline justify-between">
              <span className="text-xl font-black text-[#1c241e] truncate">
                ${(metrics.totalValuation / 1000000).toFixed(1)}M
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Value
              </span>
            </div>
          </div>

        </section>

        {/* Search, Filter, Sort & View Controls */}
        <section className="bg-white p-5 rounded-[24px] border border-[#e8e6df] shadow-xs space-y-4">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search listings by title, city, area, agent, or property ID..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-[#faf9f7] text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#1c241e] focus:bg-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* View Mode & Count */}
            <div className="flex items-center gap-2 justify-between sm:justify-end">
              <span className="text-xs text-stone-500 font-medium">
                Showing <strong className="text-[#1c241e]">{filteredProperties.length}</strong> of {properties.length}
              </span>

              <div className="flex items-center bg-[#f0ede6] p-1 rounded-xl">
                <button
                  onClick={() => setViewMode('table')}
                  title="Table View"
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'table' ? 'bg-white text-[#1c241e] shadow-xs' : 'text-stone-600 hover:text-[#1c241e]'
                  }`}
                >
                  <TableIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  title="Card Grid View"
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'cards' ? 'bg-white text-[#1c241e] shadow-xs' : 'text-stone-600 hover:text-[#1c241e]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Secondary Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#f0ede6] text-xs">
            
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider mr-1">Category:</span>
              {(['all', 'residential', 'commercial', 'highrise'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full font-bold capitalize transition-all border ${
                    selectedCategory === cat
                      ? 'bg-[#1c241e] text-white border-[#1c241e]'
                      : 'bg-[#faf9f7] text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-stone-300 hidden md:block" />

            {/* Listing Type Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider mr-1">Type:</span>
              {(['all', 'sale', 'rent'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedListingType(type)}
                  className={`px-3 py-1.5 rounded-full font-bold capitalize transition-all border ${
                    selectedListingType === type
                      ? 'bg-[#875d46] text-white border-[#875d46]'
                      : 'bg-[#faf9f7] text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {type === 'all' ? 'All' : `For ${type}`}
                </button>
              ))}
            </div>

            {/* City Dropdown */}
            {availableCities.length > 0 && (
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-3 py-1.5 rounded-full border border-stone-200 bg-[#faf9f7] text-stone-700 font-semibold focus:outline-none focus:ring-1 focus:ring-[#1c241e]"
              >
                <option value="all">All Cities</option>
                {availableCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}

            {/* Sort Dropdown */}
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-stone-400 font-bold uppercase text-[10px] tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-full border border-stone-200 bg-[#faf9f7] text-stone-700 font-semibold focus:outline-none focus:ring-1 focus:ring-[#1c241e]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="area">Area: Largest</option>
              </select>
            </div>

          </div>

        </section>

        {/* Listings Display: Table Mode */}
        {viewMode === 'table' ? (
          <div className="bg-white rounded-[24px] border border-[#e8e6df] shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                
                <thead className="bg-[#fbfaf8] border-b border-[#eeebe3] text-stone-500 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3.5 px-4">Property</th>
                    <th className="py-3.5 px-3">Category</th>
                    <th className="py-3.5 px-3">Type</th>
                    <th className="py-3.5 px-3">Location</th>
                    <th className="py-3.5 px-3">Specs</th>
                    <th className="py-3.5 px-3">Price</th>
                    <th className="py-3.5 px-3">Agent</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#f2efe9]">
                  {filteredProperties.length > 0 ? (
                    filteredProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-[#faf9f6] transition-colors group">
                        
                        {/* Property title + thumbnail */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3 min-w-[240px]">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                              <img
                                src={prop.imageUrl}
                                alt={prop.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                                }}
                              />
                              {prop.videoUrl && (
                                <button
                                  onClick={() => setActiveVideo({ url: prop.videoUrl!, title: prop.title })}
                                  className="absolute inset-0 bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
                                  title="Play Video"
                                >
                                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                                </button>
                              )}
                            </div>
                            <div className="truncate">
                              <div className="flex items-center gap-1.5">
                                <span className="font-extrabold text-sm text-[#1c241e] group-hover:text-[#875d46] transition-colors truncate">
                                  {prop.title}
                                </span>
                                {prop.featured && (
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-amber-100 text-amber-800 border border-amber-200 shrink-0">
                                    ★ Featured
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-stone-400 block font-mono">
                                ID: {prop.id}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize border ${getCategoryBadgeClass(prop.category)}`}>
                            {prop.category}
                          </span>
                        </td>

                        {/* Listing Type */}
                        <td className="py-3.5 px-3">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide border ${
                            prop.listingType === 'sale'
                              ? 'bg-[#1c241e] text-white border-[#1c241e]'
                              : 'bg-[#875d46] text-white border-[#875d46]'
                          }`}>
                            For {prop.listingType}
                          </span>
                        </td>

                        {/* Location */}
                        <td className="py-3.5 px-3">
                          <div className="text-stone-800 font-semibold truncate max-w-[140px]">
                            {prop.location.area}
                          </div>
                          <div className="text-stone-400 text-[11px]">
                            {prop.location.city}
                          </div>
                        </td>

                        {/* Specs */}
                        <td className="py-3.5 px-3">
                          <div className="text-stone-700 font-medium whitespace-nowrap">
                            {prop.features.bedrooms ? `${prop.features.bedrooms} Beds • ` : ''}
                            {prop.features.bathrooms ? `${prop.features.bathrooms} Baths • ` : ''}
                            <strong>{prop.features.areaSqFt.toLocaleString()}</strong> SqFt
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-3">
                          <span className="font-black text-sm text-[#1c241e]">
                            {formatPrice(prop.price, prop.listingType)}
                          </span>
                        </td>

                        {/* Agent */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={prop.agent.image}
                              alt={prop.agent.name}
                              className="w-6 h-6 rounded-full object-cover border border-stone-200"
                            />
                            <span className="text-stone-700 font-medium truncate max-w-[90px]">
                              {prop.agent.name}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* Toggle Featured */}
                            <button
                              onClick={() => handleToggleFeatured(prop.id, !!prop.featured, prop.title)}
                              title={prop.featured ? 'Remove from featured' : 'Mark as featured'}
                              className={`p-1.5 rounded-lg border transition-colors ${
                                prop.featured
                                  ? 'bg-amber-50 text-amber-600 border-amber-300 hover:bg-amber-100'
                                  : 'bg-white text-stone-400 border-stone-200 hover:text-amber-500'
                              }`}
                            >
                              <Star className={`w-4 h-4 ${prop.featured ? 'fill-amber-500' : ''}`} />
                            </button>

                            {/* View Preview */}
                            <button
                              onClick={() => setViewingProperty(prop)}
                              title="Preview Listing"
                              className="p-1.5 rounded-lg bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => handleOpenEdit(prop)}
                              title="Edit Property"
                              className="p-1.5 rounded-lg bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-700 border border-stone-200 hover:border-emerald-300 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => setPropertyToDelete(prop)}
                              title="Delete Property"
                              className="p-1.5 rounded-lg bg-white hover:bg-rose-50 text-stone-400 hover:text-rose-600 border border-stone-200 hover:border-rose-300 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="py-16 text-center text-stone-500">
                        <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                        <h4 className="text-base font-bold text-stone-800">No properties found</h4>
                        <p className="text-xs text-stone-400 mt-1 max-w-sm mx-auto">
                          No listings matched your active filter or search criteria. Try adjusting your filters or click &quot;Add Property&quot; to list a new one.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        ) : (
          /* Listings Display: Cards Mode */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="bg-white border border-[#e8e6df] rounded-[24px] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  {/* Card Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <img
                      src={prop.imageUrl}
                      alt={prop.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Top overlay badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize border backdrop-blur-md ${getCategoryBadgeClass(prop.category)}`}>
                          {prop.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#1c241e]/85 text-white backdrop-blur-md">
                          For {prop.listingType}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleToggleFeatured(prop.id, !!prop.featured, prop.title)}
                          className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                            prop.featured ? 'bg-amber-400 text-stone-900 border-amber-300' : 'bg-black/50 text-white border-white/20'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${prop.featured ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>

                    {/* Bottom Price banner */}
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-[#1c241e]/90 text-white font-extrabold text-sm backdrop-blur-md">
                      {formatPrice(prop.price, prop.listingType)}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1 text-stone-400 text-[11px] mb-1 font-medium">
                        <MapPin className="w-3 h-3 text-[#875d46]" />
                        <span>{prop.location.area}, {prop.location.city}</span>
                      </div>
                      <h3 className="font-extrabold text-sm text-[#1c241e] line-clamp-1 mb-1">
                        {prop.title}
                      </h3>
                      <p className="text-stone-500 text-xs line-clamp-2 mb-3 leading-relaxed">
                        {prop.description}
                      </p>
                    </div>

                    {/* Specs & Actions footer */}
                    <div className="pt-3 border-t border-[#f0ede6]">
                      <div className="flex items-center justify-between text-xs text-stone-600 mb-3 font-semibold">
                        <span>{prop.features.bedrooms ? `${prop.features.bedrooms} Beds` : 'Commercial'}</span>
                        <span>•</span>
                        <span>{prop.features.areaSqFt.toLocaleString()} SqFt</span>
                        <span>•</span>
                        <span className="font-mono text-[10px] text-stone-400">{prop.id}</span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <button
                          onClick={() => setViewingProperty(prop)}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleOpenEdit(prop)}
                          className="flex-1 py-1.5 px-2 rounded-xl bg-[#1c241e] hover:bg-[#2c382f] text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => setPropertyToDelete(prop)}
                          className="p-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-stone-500 bg-white rounded-3xl border border-[#e8e6df] p-8">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <h4 className="text-base font-bold text-stone-800">No properties found</h4>
                <p className="text-xs text-stone-400 mt-1">Adjust search or filters to see listings.</p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* Delete Confirmation Modal */}
      {propertyToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-[28px] border border-[#e8e6df] p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-extrabold text-[#1c241e]">Delete Property Listing?</h3>
              <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                Are you sure you want to remove <strong>&quot;{propertyToDelete.title}&quot;</strong> (ID: {propertyToDelete.id})? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setPropertyToDelete(null)}
                className="flex-1 py-2.5 rounded-full border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Property Modal */}
      <PropertyFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveProperty}
        initialProperty={editingProperty}
      />

      {/* Preview Details Modal */}
      <PropertyDetailsModal
        property={viewingProperty}
        onClose={() => setViewingProperty(null)}
        onOpenVideo={(url, title) => setActiveVideo({ url, title })}
      />

      {/* Virtual Tour Video Modal */}
      <VideoModal
        isOpen={!!activeVideo}
        videoUrl={activeVideo?.url || null}
        title={activeVideo?.title || ''}
        onClose={() => setActiveVideo(null)}
      />

    </div>
  );
}

