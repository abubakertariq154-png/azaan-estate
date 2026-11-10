'use client';

import React from 'react';
import { Property } from '@/types/property';
import { 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Car, 
  Layers, 
  Calendar, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Play, 
  Share2 
} from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property | null;
  onClose: () => void;
  onOpenVideo: (videoUrl: string, title: string) => void;
}

export const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({
  property,
  onClose,
  onOpenVideo,
}) => {
  if (!property) return null;

  const formatPrice = (price: number, listingType: string) => {
    return listingType === 'rent' ? `$${price.toLocaleString()}/mo` : `$${price.toLocaleString()}`;
  };

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out ${property.title} on Azaan Estate!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-black overflow-hidden my-6">
        
        {/* Close Button Floating */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/80 hover:bg-slate-800 text-white border border-slate-700/80 backdrop-blur-md flex items-center justify-center transition-all hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Gallery / Video Area */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full bg-slate-950 overflow-hidden">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

          {/* Badges on hero */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-lg">
              {property.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-950/80 text-white border border-slate-700 backdrop-blur-md">
              For {property.listingType}
            </span>
          </div>

          {/* Video Button */}
          {property.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => onOpenVideo(property.videoUrl!, property.title)}
                className="group/btn flex items-center gap-3 px-5 py-3 rounded-full bg-slate-950/85 hover:bg-amber-500 text-white hover:text-slate-950 border border-amber-500/50 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500 group-hover/btn:bg-slate-950 text-slate-950 group-hover/btn:text-amber-400 flex items-center justify-center transition-colors">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <span className="font-bold text-sm tracking-wide">Watch Guided Video Tour</span>
              </button>
            </div>
          )}

          {/* Bottom Title Bar on Hero */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-slate-300 text-xs mb-1">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>{property.location.address}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{property.title}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 font-medium block">Price</span>
              <span className="text-2xl sm:text-3xl font-black text-amber-400">
                {formatPrice(property.price, property.listingType)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-8">
          
          {/* Key Specs Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-400 uppercase font-semibold">Total Area</p>
                <p className="text-sm font-bold text-white">{property.features.areaSqFt.toLocaleString()} Sq Ft</p>
              </div>
            </div>

            {property.features.bedrooms !== undefined && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Bedrooms</p>
                  <p className="text-sm font-bold text-white">{property.features.bedrooms} Suites</p>
                </div>
              </div>
            )}

            {property.features.bathrooms !== undefined && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Bathrooms</p>
                  <p className="text-sm font-bold text-white">{property.features.bathrooms} Baths</p>
                </div>
              </div>
            )}

            {property.features.parkingSpaces !== undefined && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Parking</p>
                  <p className="text-sm font-bold text-white">{property.features.parkingSpaces} Vehicles</p>
                </div>
              </div>
            )}

            {property.features.floors !== undefined && property.features.bedrooms === undefined && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] text-slate-400 uppercase font-semibold">Floors</p>
                  <p className="text-sm font-bold text-white">{property.features.floors} Levels</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Architectural Overview</h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Premium Amenities */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">Amenities & Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {property.amenities.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/40 border border-slate-800 text-slate-200 text-xs"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Certified Representative / Agent Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={property.agent.image}
                alt={property.agent.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-amber-400"
              />
              <div>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Listing Agent</p>
                <h4 className="text-base font-bold text-white">{property.agent.name}</h4>
                <p className="text-xs text-slate-400">{property.agent.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${property.agent.phone}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{property.agent.phone}</span>
              </a>
              <button
                onClick={shareProperty}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title="Share property"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
