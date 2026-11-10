'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, ArrowUpRight, Building2, Home, SlidersHorizontal } from 'lucide-react';
import { PropertyCategory } from '@/types/property';

interface NavbarProps {
  activeTab: 'all' | PropertyCategory;
  onSelectTab: (tab: 'all' | PropertyCategory) => void;
  onOpenAddModal: () => void;
  savedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenAddModal,
}) => {
  return (
    <header className="w-full bg-[#f6f5f2] pt-4 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo - NexaHome aesthetic */}
        <div 
          onClick={() => onSelectTab('all')} 
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl border-2 border-[#1c241e] flex items-center justify-center transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5 text-[#1c241e]">
              <path strokeLinecap="round" strokeLinejoin="round" d="m3 9.75 9-7.5 9 7.5v9.75a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 19.5V9.75Z" />
            </svg>
          </div>
          <div>
            <div className="font-extrabold text-xl tracking-tight text-[#1c241e] leading-none">
              AZAAN ESTATE
            </div>
            <div className="text-[9px] tracking-widest text-[#727a74] uppercase font-semibold mt-0.5">
              REAL ESTATE
            </div>
          </div>
        </div>

        {/* Floating Capsule Nav Menu */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-[#4a534c]">
          <button 
            onClick={() => onSelectTab('all')}
            className={`transition-colors hover:text-[#1c241e] ${activeTab === 'all' ? 'text-[#1c241e] font-bold' : ''}`}
          >
            All
          </button>
          <button 
            onClick={() => onSelectTab('residential')}
            className={`transition-colors hover:text-[#1c241e] ${activeTab === 'residential' ? 'text-[#1c241e] font-bold' : ''}`}
          >
            Residential
          </button>
          <button 
            onClick={() => onSelectTab('commercial')}
            className={`transition-colors hover:text-[#1c241e] ${activeTab === 'commercial' ? 'text-[#1c241e] font-bold' : ''}`}
          >
            Commercial
          </button>
          <button 
            onClick={() => onSelectTab('highrise')}
            className={`transition-colors hover:text-[#1c241e] ${activeTab === 'highrise' ? 'text-[#1c241e] font-bold' : ''}`}
          >
            Highrise
          </button>
          <a href="#properties-section" className="transition-colors hover:text-[#1c241e]">
            Properties
          </a>
          <a href="#contact" className="transition-colors hover:text-[#1c241e]">
            About Us
          </a>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-[#1c241e] text-xs font-bold transition-all shadow-2xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#875d46]" />
            <span>Admin Panel</span>
          </Link>

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#e8e6df] hover:bg-[#dedcd4] text-[#1c241e] text-xs font-semibold transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>List Property</span>
          </button>

          <a
            href="#contact"
            className="group flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-[#1c241e] hover:bg-[#2b362e] text-white text-xs font-medium transition-all shadow-sm"
          >
            <span>Contact Us</span>
            <div className="w-7 h-7 rounded-full bg-[#2e3931] group-hover:bg-[#3a473e] flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </div>
          </a>
        </div>

      </div>

      {/* Mobile Bar */}
      <div className="md:hidden flex items-center justify-center gap-2 pt-3 pb-1 border-t border-[#e2e0d8] mt-3 overflow-x-auto">
        {(['all', 'residential', 'commercial', 'highrise'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectTab(cat)}
            className={`px-3 py-1 rounded-full text-xs capitalize ${
              activeTab === cat
                ? 'bg-[#1c241e] text-white font-semibold'
                : 'bg-[#e9e7e1] text-[#4a534c]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
};
