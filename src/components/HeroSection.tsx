'use client';

import React from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative w-full p-2.5 sm:p-4 md:p-6 bg-[#0d1210] flex flex-col box-border">

      {/* Card Container */}
      <div className="relative w-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden shadow-2xl flex flex-col justify-between border border-white/10 min-h-[480px] sm:min-h-[540px] md:min-h-[580px]">

        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=85"
            alt="Azaan Estate"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/85" />
        </div>

        {/* ── TOP NAVBAR ── */}
        <header className="relative z-20 w-full pt-4 sm:pt-6 px-4 sm:px-8 md:px-12 flex items-center justify-between gap-3">

          {/* Logo */}
          <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group">
            {/* Icon box */}
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 shrink-0">
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#c48a68] via-[#875d46] to-[#3d2314] shadow-[0_4px_20px_rgba(196,138,104,0.45)] group-hover:shadow-[0_4px_28px_rgba(196,138,104,0.65)] transition-shadow duration-300" />
              <div className="absolute inset-[1.5px] rounded-[11px] sm:rounded-[14px] bg-gradient-to-br from-[#1a0f08]/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 28 28" fill="none" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path d="M4 26V12.5L14 4L24 12.5V26H17.5V19H10.5V26H4Z" fill="white" fillOpacity="0.95"/>
                  <rect x="11.5" y="19" width="5" height="7" rx="1" fill="#875d46"/>
                  <rect x="6" y="15" width="3" height="3" rx="0.5" fill="#c48a68" fillOpacity="0.9"/>
                  <rect x="19" y="15" width="3" height="3" rx="0.5" fill="#c48a68" fillOpacity="0.9"/>
                  <circle cx="14" cy="2.5" r="1.5" fill="#c48a68"/>
                </svg>
              </div>
            </div>

            {/* Brand text */}
            <div className="flex flex-col leading-none">
              <div className="flex items-end gap-[3px]">
                <span className="font-black text-lg sm:text-2xl tracking-[0.03em] text-white">AZAAN</span>
                <span className="font-black text-lg sm:text-2xl tracking-[0.03em] text-transparent bg-clip-text bg-gradient-to-r from-[#c48a68] to-[#e8b08a]">ESTATE</span>
              </div>
              <div className="flex items-center gap-1 mt-[2px]">
                <span className="w-2.5 h-px bg-gradient-to-r from-transparent to-[#875d46]" />
                <span className="text-[7.5px] sm:text-[9px] tracking-[0.22em] text-[#c48a68]/80 uppercase font-bold">Premium Real Estate</span>
                <span className="w-2.5 h-px bg-gradient-to-l from-transparent to-[#875d46]" />
              </div>
            </div>
          </div>

          {/* Right: WhatsApp CTA */}
          <a
            href="https://wa.me/923045351802"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#25D366] hover:bg-[#20b957] text-white text-xs sm:text-sm font-bold transition-all shadow-lg hover:scale-105 active:scale-95 shrink-0"
          >
            <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.004 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.333.63 4.63 1.826 6.638L2.667 29.333l6.861-1.796A13.263 13.263 0 0 0 16.004 29.333C23.37 29.333 29.333 23.362 29.333 16S23.37 2.667 16.004 2.667zm0 24.267c-2.145 0-4.244-.575-6.08-1.665l-.435-.258-4.073 1.067 1.084-3.955-.283-.455A10.886 10.886 0 0 1 5.067 16c0-6.03 4.907-10.933 10.937-10.933S26.933 9.97 26.933 16 22.034 26.934 16.004 26.934zm5.993-8.182c-.328-.165-1.942-.957-2.242-1.067-.3-.11-.518-.165-.736.165s-.845 1.067-1.036 1.287c-.19.22-.382.247-.71.082-.328-.165-1.385-.51-2.638-1.627-.975-.87-1.633-1.943-1.824-2.271-.19-.328-.02-.505.144-.668.147-.146.328-.382.491-.573.164-.19.218-.328.328-.546.11-.22.055-.41-.027-.573-.082-.165-.736-1.774-1.009-2.429-.265-.636-.535-.55-.736-.56-.19-.008-.41-.01-.627-.01s-.573.082-.873.41c-.3.328-1.145 1.12-1.145 2.73s1.172 3.165 1.335 3.383c.164.22 2.307 3.52 5.59 4.937.782.337 1.391.539 1.866.69.784.25 1.498.215 2.062.13.629-.094 1.942-.793 2.216-1.56.274-.764.274-1.42.19-1.558-.082-.137-.3-.22-.627-.383z"/>
            </svg>
            <span className="inline">WhatsApp</span>
          </a>
        </header>

        {/* ── HERO CENTER CONTENT ── */}
        <div className="relative z-10 px-4 sm:px-8 md:px-14 py-6 sm:py-10 my-auto max-w-2xl text-left">

          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#875d46]/25 border border-[#875d46]/45 mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c48a68] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-[#c48a68]">
              Bahria Town Lahore
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] mb-3 sm:mb-4">
            Find a Place <br />
            to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c48a68] to-[#e8b08a]">Call Home</span>
          </h1>

          {/* Subtitle */}
          <p className="text-white/75 text-xs sm:text-base font-normal max-w-lg mb-6 sm:mb-8 leading-relaxed">
            Discover verified houses, plots & commercial properties in Bahria Town Lahore with transparent pricing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5">
            <button
              onClick={onExploreClick}
              className="group inline-flex items-center gap-2 sm:gap-3 pl-4 sm:pl-6 pr-2 py-2 sm:py-2.5 rounded-full bg-white hover:bg-[#f5f0eb] text-[#1c241e] text-xs sm:text-sm font-black transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Explore Properties</span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1c241e] group-hover:bg-[#875d46] flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold backdrop-blur-md border border-white/20 transition-all hover:-translate-y-0.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#c48a68]" />
              <span>Contact Advisor</span>
            </a>
          </div>

        </div>

        {/* ── BOTTOM STATS BAR ── */}
        <div className="relative z-10 px-4 sm:px-8 md:px-14 pb-4 sm:pb-6 flex items-center justify-between text-white/70 text-xs">
          <div className="flex items-center gap-4 sm:gap-6">
            <div>
              <span className="font-black text-white text-sm sm:text-base mr-1">50+</span>
              <span className="text-[11px] sm:text-xs text-white/60">Active Listings</span>
            </div>
            <div className="w-px h-3.5 bg-white/20" />
            <div>
              <span className="font-black text-white text-sm sm:text-base mr-1">100%</span>
              <span className="text-[11px] sm:text-xs text-white/60">Verified Deals</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
