'use client';

import React from 'react';
import { ArrowUpRight, Building2, TrendingUp, Award, Phone } from 'lucide-react';
import { PropertyCategory } from '@/types/property';

interface HeroSectionProps {
  activeCategory: 'all' | PropertyCategory;
  onSelectCategory: (category: 'all' | PropertyCategory) => void;
  onOpenAddModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="relative w-full h-screen min-h-[520px] max-h-[900px] p-2 sm:p-4 md:p-6 bg-[#0d1210] flex flex-col box-border overflow-hidden">

      {/* Card Container */}
      <div className="relative w-full h-full rounded-[20px] sm:rounded-[32px] md:rounded-[44px] overflow-hidden shadow-2xl flex flex-col justify-between border border-white/10">

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=85"
            alt="Azaan Estate"
            className="w-full h-full object-cover object-center"
          />
          {/* Strong dark overlay for mobile readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
        </div>

        {/* NAVBAR */}
        <header className="relative z-20 w-full pt-4 sm:pt-6 px-4 sm:px-8 md:px-12 flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => onSelectCategory('all')}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
          >
            {/* Icon box — stylised building with crescent */}
            <div className="relative w-10 h-10 sm:w-13 sm:h-13 shrink-0">
              {/* Outer glow ring */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#c48a68] via-[#875d46] to-[#3d2314] shadow-[0_4px_20px_rgba(196,138,104,0.45)] group-hover:shadow-[0_4px_28px_rgba(196,138,104,0.65)] transition-shadow duration-300" />
              {/* Inner shine */}
              <div className="absolute inset-[1.5px] rounded-[14px] bg-gradient-to-br from-[#1a0f08]/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
                  {/* Building base */}
                  <path d="M4 26V12.5L14 4L24 12.5V26H17.5V19H10.5V26H4Z" fill="white" fillOpacity="0.95"/>
                  {/* Door */}
                  <rect x="11.5" y="19" width="5" height="7" rx="1" fill="#875d46"/>
                  {/* Windows */}
                  <rect x="6" y="15" width="3" height="3" rx="0.5" fill="#c48a68" fillOpacity="0.9"/>
                  <rect x="19" y="15" width="3" height="3" rx="0.5" fill="#c48a68" fillOpacity="0.9"/>
                  {/* Roof star/crescent accent */}
                  <circle cx="14" cy="2.5" r="1.5" fill="#c48a68"/>
                </svg>
              </div>
            </div>

            {/* Brand text */}
            <div className="flex flex-col leading-none">
              <div className="flex items-end gap-[3px]">
                <span className="font-black text-[17px] sm:text-[22px] md:text-[26px] tracking-[0.04em] text-white drop-shadow-sm">AZAAN</span>
                <span className="font-black text-[17px] sm:text-[22px] md:text-[26px] tracking-[0.04em] text-transparent bg-clip-text bg-gradient-to-r from-[#c48a68] to-[#e8b08a] drop-shadow-sm">ESTATE</span>
              </div>
              <div className="flex items-center gap-1 mt-[3px]">
                <span className="w-3 h-px bg-gradient-to-r from-transparent to-[#875d46]" />
                <span className="text-[7.5px] sm:text-[9px] tracking-[0.25em] text-[#c48a68]/75 uppercase font-bold">Premium Real Estate</span>
                <span className="w-3 h-px bg-gradient-to-l from-transparent to-[#875d46]" />
              </div>
            </div>
          </div>

          {/* Center Nav — desktop only */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-white/80 bg-white/10 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/20">
            <button onClick={() => onSelectCategory('all')} className={`hover:text-white transition-colors ${activeCategory === 'all' ? 'text-white font-extrabold' : ''}`}>All</button>
            <button onClick={() => onSelectCategory('residential')} className={`hover:text-white transition-colors ${activeCategory === 'residential' ? 'text-white font-extrabold' : ''}`}>Residential</button>
            <button onClick={() => onSelectCategory('commercial')} className={`hover:text-white transition-colors ${activeCategory === 'commercial' ? 'text-white font-extrabold' : ''}`}>Commercial</button>
            <button onClick={() => onSelectCategory('highrise')} className={`hover:text-white transition-colors ${activeCategory === 'highrise' ? 'text-white font-extrabold' : ''}`}>Highrise</button>
            <a href="#properties-section" className="hover:text-white transition-colors">Properties</a>
          </nav>

          {/* Right: WhatsApp CTA */}
          <a
            href="https://wa.me/923045351802"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#25D366] hover:bg-[#20b957] text-white text-xs sm:text-sm font-bold transition-all shadow-lg"
          >
            <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.004 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.333.63 4.63 1.826 6.638L2.667 29.333l6.861-1.796A13.263 13.263 0 0 0 16.004 29.333C23.37 29.333 29.333 23.362 29.333 16S23.37 2.667 16.004 2.667zm0 24.267c-2.145 0-4.244-.575-6.08-1.665l-.435-.258-4.073 1.067 1.084-3.955-.283-.455A10.886 10.886 0 0 1 5.067 16c0-6.03 4.907-10.933 10.937-10.933S26.933 9.97 26.933 16 22.034 26.934 16.004 26.934zm5.993-8.182c-.328-.165-1.942-.957-2.242-1.067-.3-.11-.518-.165-.736.165s-.845 1.067-1.036 1.287c-.19.22-.382.247-.71.082-.328-.165-1.385-.51-2.638-1.627-.975-.87-1.633-1.943-1.824-2.271-.19-.328-.02-.505.144-.668.147-.146.328-.382.491-.573.164-.19.218-.328.328-.546.11-.22.055-.41-.027-.573-.082-.165-.736-1.774-1.009-2.429-.265-.636-.535-.55-.736-.56-.19-.008-.41-.01-.627-.01s-.573.082-.873.41c-.3.328-1.145 1.12-1.145 2.73s1.172 3.165 1.335 3.383c.164.22 2.307 3.52 5.59 4.937.782.337 1.391.539 1.866.69.784.25 1.498.215 2.062.13.629-.094 1.942-.793 2.216-1.56.274-.764.274-1.42.19-1.558-.082-.137-.3-.22-.627-.383z"/>
            </svg>
            <span className="hidden xs:inline sm:inline">WhatsApp</span>
          </a>
        </header>

        {/* HERO CONTENT */}
        <div className="relative z-10 px-4 sm:px-8 md:px-14 py-2 sm:py-4 max-w-xl sm:max-w-2xl my-auto">

          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#875d46]/20 border border-[#875d46]/40 mb-2 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c48a68] animate-pulse" />
            <span className="text-[9px] sm:text-xs font-bold tracking-widest uppercase text-[#c48a68]">Bahria Town Lahore</span>
          </div>

          {/* Title */}
          <h1 className="text-[1.4rem] sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] mb-2 sm:mb-4">
            Find a Place <br />
            to <span className="text-[#c48a68]">Call Home</span>
          </h1>

          {/* Desc */}
          <p className="text-white/70 text-[11px] sm:text-base font-normal max-w-sm sm:max-w-md mb-4 sm:mb-7 leading-relaxed">
            Discover premium houses, plots & apartments in Bahria Town Lahore — verified listings, real prices.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="#properties-section"
              className="group inline-flex items-center gap-2 sm:gap-3 pl-4 sm:pl-6 pr-2 py-1.5 sm:py-2.5 rounded-full bg-white hover:bg-[#f5f0eb] text-[#1c241e] text-xs sm:text-sm font-bold transition-all shadow-xl hover:-translate-y-0.5"
            >
              <span>Explore Properties</span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1c241e] group-hover:bg-[#875d46] flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/25 transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c48a68]" />
              <span>Contact Advisor</span>
            </a>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="relative z-10 px-4 sm:px-8 md:px-14 pb-3 sm:pb-6 flex flex-wrap items-center justify-between gap-2">

          {/* Category + Type Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { key: 'residential', label: 'Residential', Icon: Building2, color: 'text-emerald-400' },
              { key: 'commercial', label: 'Commercial', Icon: TrendingUp, color: 'text-blue-400' },
              { key: 'highrise', label: 'Highrise', Icon: Award, color: 'text-purple-400' },
            ].map(({ key, label, Icon, color }) => (
              <button
                key={key}
                onClick={() => onSelectCategory(key as PropertyCategory)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-md border transition-all whitespace-nowrap ${
                  activeCategory === key
                    ? 'bg-white text-[#1c241e] border-white shadow-md'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
              >
                <Icon className={`w-3 h-3 ${activeCategory === key ? 'text-[#875d46]' : color}`} />
                <span>{label}</span>
              </button>
            ))}

            {/* Divider */}
            <span className="w-px h-4 bg-white/20 mx-0.5" />

            {/* For Sale / For Rent */}
            <a href="#properties-section" onClick={() => onSelectCategory('all')}
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-[#875d46]/80 hover:bg-[#875d46] text-white border border-[#875d46] transition-all whitespace-nowrap">
              🏷️ For Sale
            </a>
            <a href="#properties-section" onClick={() => onSelectCategory('all')}
              className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all whitespace-nowrap">
              🔑 For Rent
            </a>
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-4 md:gap-6 text-white drop-shadow-md">
            <div className="text-center">
              <span className="text-sm md:text-base font-black block leading-tight">50+</span>
              <span className="text-white/60 text-[10px]">Active Listings</span>
            </div>
            <div className="h-5 w-px bg-white/20" />
            <div className="text-center">
              <span className="text-sm md:text-base font-black block leading-tight">100%</span>
              <span className="text-white/60 text-[10px]">Verified Deals</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
