'use client';

import React from 'react';
import { Search, MapPin, Building, DollarSign, ArrowUpDown, X } from 'lucide-react';
import { PropertyFilterState } from '@/types/property';

interface FilterBarProps {
  filters: PropertyFilterState;
  onFilterChange: <K extends keyof PropertyFilterState>(key: K, value: PropertyFilterState[K]) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  return (
    <div className="w-full bg-white border border-[#e8e6df] rounded-[28px] p-5 md:p-6 shadow-xl shadow-stone-900/5">
      
      {/* Search Input Box */}
      <div className="relative mb-5">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
          <Search className="w-5 h-5 text-[#875d46]" />
        </div>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFilterChange('searchQuery', e.target.value)}
          placeholder="Search by title, location, villa, luxury, highrise, pool, city..."
          className="w-full pl-12 pr-10 py-3.5 bg-[#fbfaf8] border border-[#e8e5dc] rounded-2xl text-[#1c241e] placeholder-stone-400 text-sm focus:outline-none focus:border-[#875d46] focus:ring-2 focus:ring-[#875d46]/10 transition-all shadow-inner"
        />
        {filters.searchQuery && (
          <button
            onClick={() => onFilterChange('searchQuery', '')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-stone-400 hover:text-stone-700"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
        
        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-stone-500 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-[#875d46]" /> Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value as any)}
            className="w-full px-3 py-2.5 bg-[#fbfaf8] border border-[#e8e5dc] rounded-xl text-stone-800 text-sm focus:outline-none focus:border-[#875d46] cursor-pointer"
          >
            <option value="all">All Sectors</option>
            <option value="residential">Residential Homes & Villas</option>
            <option value="commercial">Commercial Plazas</option>
            <option value="highrise">Highrise Towers & Penthouses</option>
          </select>
        </div>

        {/* Deal Type */}
        <div className="space-y-1.5">
          <label className="text-stone-500 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[#875d46]" /> Deal Type
          </label>
          <select
            value={filters.listingType}
            onChange={(e) => onFilterChange('listingType', e.target.value as any)}
            className="w-full px-3 py-2.5 bg-[#fbfaf8] border border-[#e8e5dc] rounded-xl text-stone-800 text-sm focus:outline-none focus:border-[#875d46] cursor-pointer"
          >
            <option value="all">Any Status</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>
        </div>

        {/* City */}
        <div className="space-y-1.5">
          <label className="text-stone-500 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#875d46]" /> City
          </label>
          <select
            value={filters.city}
            onChange={(e) => onFilterChange('city', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#fbfaf8] border border-[#e8e5dc] rounded-xl text-stone-800 text-sm focus:outline-none focus:border-[#875d46] cursor-pointer"
          >
            <option value="all">All Locations</option>
            <option value="Islamabad">Islamabad</option>
            <option value="Lahore">Lahore</option>
            <option value="Karachi">Karachi</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="space-y-1.5">
          <label className="text-stone-500 font-semibold uppercase tracking-wider text-[11px]">
            Bedrooms
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => onFilterChange('bedrooms', e.target.value)}
            className="w-full px-3 py-2.5 bg-[#fbfaf8] border border-[#e8e5dc] rounded-xl text-stone-800 text-sm focus:outline-none focus:border-[#875d46] cursor-pointer"
          >
            <option value="all">Any Bed</option>
            <option value="2">2+ Bedrooms</option>
            <option value="3">3+ Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>

        {/* Sort */}
        <div className="space-y-1.5">
          <label className="text-stone-500 font-semibold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#875d46]" /> Sort Order
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value as any)}
            className="w-full px-3 py-2.5 bg-[#fbfaf8] border border-[#e8e5dc] rounded-xl text-stone-800 text-sm focus:outline-none focus:border-[#875d46] cursor-pointer"
          >
            <option value="newest">Recently Listed</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="area">Area: Largest First</option>
          </select>
        </div>

      </div>

      {/* Bottom Summary & Reset */}
      <div className="mt-4 pt-3.5 border-t border-[#f0ede6] flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span>Found <strong className="text-[#1c241e] text-sm font-bold">{totalResults}</strong> curated estates</span>
          {filters.category !== 'all' && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#f2eee7] text-[#875d46] border border-[#e4ded5] text-[11px] capitalize font-semibold">
              {filters.category}
            </span>
          )}
        </div>

        <button
          onClick={onResetFilters}
          className="text-stone-500 hover:text-[#875d46] transition-colors underline font-medium hover:no-underline"
        >
          Reset All Filters
        </button>
      </div>

    </div>
  );
};
