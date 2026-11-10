'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, ArrowUpRight, Building2, TrendingUp, Award, Phone } from 'lucide-react';
import { PropertyCategory } from '@/types/property';

interface HeroSectionProps {
  activeCategory: 'all' | PropertyCategory;
  onSelectCategory: (category: 'all' | PropertyCategory) => void;
  onOpenAddModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenAddModal,
}) => {
  return (
    <section className="relative w-full h-screen min-h-[640px] max-h-[1080px] p-2.5 sm:p-4 md:p-6 bg-[#f6f5f2] flex flex-col box-border overflow-hidden">
      
      {/* 100VH Card Container with Rounded Borders matching the design */}
      <div className="relative w-full h-full rounded-[28px] sm:rounded-[38px] md:rounded-[46px] overflow-hidden shadow-2xl flex flex-col justify-between border border-[#e8e6df]">
        
        {/* Full Bleed Background Villa & Pool Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=85"
            alt="Azaan Estate Luxury Villa with Infinity Pool"
            className="w-full h-full object-cover object-center scale-[1.01]"
          />
          {/* Subtle natural gradients for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8f5]/95 via-[#fbf8f5]/60 to-transparent sm:w-[62%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        </div>

        {/* INTEGRATED NAVBAR INSIDE THE 100VH HERO */}
        <header className="relative z-20 w-full pt-4 sm:pt-6 px-5 sm:px-10 md:px-12 flex items-center justify-between">
          
          {/* Logo & Brand Name: AZAAN ESTATE */}
          <div 
            onClick={() => onSelectCategory('all')} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border-2 border-[#875d46] flex items-center justify-center transition-transform group-hover:scale-105 bg-[#1c241e] shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 sm:w-6 sm:h-6 text-[#d4a574]">
                <path strokeLinecap="round" strokeLinejoin="round" d="m3 9.75 9-7.5 9 7.5v9.75a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 19.5V9.75Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 22.5V12h6v10.5" />
              </svg>
            </div>
            <div>
              <div className="font-black text-lg sm:text-xl md:text-2xl tracking-tight text-[#1c241e] leading-none drop-shadow-sm">
                AZAAN<span className="text-[#875d46]"> ESTATE</span>
              </div>
              <div className="text-[9px] tracking-widest text-[#875d46] uppercase font-bold mt-0.5 flex items-center gap-1">
                <span className="w-3 h-px bg-[#875d46] inline-block"></span>
                REAL ESTATE
                <span className="w-3 h-px bg-[#875d46] inline-block"></span>
              </div>
            </div>
          </div>

          {/* Center Capsule Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-semibold text-[#3c463f] bg-white/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/60 shadow-sm">
            <button 
              onClick={() => onSelectCategory('all')}
              className={`transition-colors hover:text-[#1c241e] ${activeCategory === 'all' ? 'text-[#1c241e] font-extrabold underline underline-offset-4 decoration-[#875d46]' : ''}`}
            >
              All
            </button>
            <button 
              onClick={() => onSelectCategory('residential')}
              className={`transition-colors hover:text-[#1c241e] ${activeCategory === 'residential' ? 'text-[#1c241e] font-extrabold underline underline-offset-4 decoration-[#875d46]' : ''}`}
            >
              Residential
            </button>
            <button 
              onClick={() => onSelectCategory('commercial')}
              className={`transition-colors hover:text-[#1c241e] ${activeCategory === 'commercial' ? 'text-[#1c241e] font-extrabold underline underline-offset-4 decoration-[#875d46]' : ''}`}
            >
              Commercial
            </button>
            <button 
              onClick={() => onSelectCategory('highrise')}
              className={`transition-colors hover:text-[#1c241e] ${activeCategory === 'highrise' ? 'text-[#1c241e] font-extrabold underline underline-offset-4 decoration-[#875d46]' : ''}`}
            >
              Highrise Towers
            </button>
            <a href="#properties-section" className="transition-colors hover:text-[#1c241e]">
              Properties
            </a>
            <a href="#contact" className="transition-colors hover:text-[#1c241e]">
              About Us
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#contact"
              className="group flex items-center gap-2 pl-3.5 sm:pl-4 pr-1.5 py-1.5 rounded-full bg-[#1c241e] hover:bg-[#2e3a31] text-white text-xs font-medium transition-all shadow-md"
            >
              <span>Contact Us</span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#354339] group-hover:bg-[#46574c] flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </a>
          </div>

        </header>

        {/* HERO CENTRAL CONTENT */}
        <div className="relative z-10 px-5 sm:px-10 md:px-14 py-4 sm:py-6 max-w-2xl my-auto">
          
          {/* Subtitle tag */}
          <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs font-extrabold tracking-widest uppercase text-[#5a4638]">
              MORE THAN PROPERTIES
            </span>
            <div className="w-12 h-[2px] bg-[#875d46]/60" />
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1c241e] leading-[1.08] mb-3 sm:mb-5">
            Find a Place <br />
            to <span className="text-[#875d46]">Call Home</span>
          </h1>

          {/* Description */}
          <p className="text-[#3c463f] text-xs sm:text-base font-normal max-w-md mb-6 sm:mb-8 leading-relaxed">
            Discover modern homes, premium locations and a lifestyle you deserve with curated architectural precision.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#properties-section"
              className="group inline-flex items-center gap-3 pl-5 sm:pl-6 pr-2 py-2 sm:py-2.5 rounded-full bg-[#1c241e] hover:bg-[#2e3a31] text-white text-xs sm:text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Explore Properties</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#354339] group-hover:bg-[#46574c] flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              </div>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/85 hover:bg-white text-[#1c241e] text-xs sm:text-sm font-semibold backdrop-blur-md border border-[#e2decb] shadow-md transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#875d46]" />
              <span>Contact Advisor</span>
            </a>
          </div>

        </div>

        {/* BOTTOM PILL BAR: Quick Category Switchers & Stats */}
        <div className="relative z-10 px-5 sm:px-10 md:px-14 pb-4 sm:pb-7 flex flex-wrap items-center justify-between gap-3">
          
          {/* Category Quick Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => onSelectCategory('residential')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold backdrop-blur-md border transition-all ${
                activeCategory === 'residential'
                  ? 'bg-[#1c241e] text-white border-white/30 shadow-md'
                  : 'bg-white/75 hover:bg-white text-[#1c241e] border-white/50'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-[#875d46]" />
              <span>Residential</span>
            </button>

            <button
              onClick={() => onSelectCategory('commercial')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold backdrop-blur-md border transition-all ${
                activeCategory === 'commercial'
                  ? 'bg-[#1c241e] text-white border-white/30 shadow-md'
                  : 'bg-white/75 hover:bg-white text-[#1c241e] border-white/50'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#1d5c96]" />
              <span>Commercial</span>
            </button>

            <button
              onClick={() => onSelectCategory('highrise')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold backdrop-blur-md border transition-all ${
                activeCategory === 'highrise'
                  ? 'bg-[#1c241e] text-white border-white/30 shadow-md'
                  : 'bg-white/75 hover:bg-white text-[#1c241e] border-white/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#93336a]" />
              <span>Highrise Towers</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="hidden sm:flex items-center gap-5 text-white drop-shadow-md text-xs font-semibold">
            <div>
              <span className="text-white text-sm md:text-base font-extrabold block leading-tight">250+</span>
              <span className="text-stone-200 text-[10px]">Prime Listings</span>
            </div>
            <div className="h-6 w-px bg-white/30" />
            <div>
              <span className="text-white text-sm md:text-base font-extrabold block leading-tight">100%</span>
              <span className="text-stone-200 text-[10px]">Verified Title Deeds</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
