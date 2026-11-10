'use client';

import React from 'react';
import { Property } from '@/types/property';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Trash2, 
  Edit,
  Play, 
  ArrowUpRight 
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onOpenVideo: (videoUrl: string, title: string, e: React.MouseEvent) => void;
  onEdit?: (property: Property, e: React.MouseEvent) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewDetails,
  onDelete,
  onOpenVideo,
  onEdit,
}) => {
  const formatPrice = (price: number, listingType: string) => {
    const formatted = price >= 10000000
      ? `${(price / 10000000).toFixed(1)} Cr`
      : price >= 100000
      ? `${(price / 100000).toFixed(1)} Lac`
      : price.toLocaleString('en-PK');
    return listingType === 'rent' ? `PKR ${formatted}/month` : `PKR ${formatted}`;
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'residential':
        return { label: 'Residential', color: 'bg-[#eaf4ec] text-[#2d6a4f] border-[#c7e5cf]' };
      case 'commercial':
        return { label: 'Commercial', color: 'bg-[#eef5fc] text-[#1d5c96] border-[#cbe1f8]' };
      case 'highrise':
        return { label: 'Highrise', color: 'bg-[#fcf0f7] text-[#93336a] border-[#f6d0ea]' };
      default:
        return { label: category, color: 'bg-stone-100 text-stone-700 border-stone-200' };
    }
  };

  const badge = getCategoryBadge(property.category);

  return (
    <div 
      onClick={() => onViewDetails(property)}
      className="group relative bg-white border border-[#e8e6df] rounded-[28px] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-stone-900/10 hover:-translate-y-1.5 flex flex-col cursor-pointer"
    >
      {/* Property Image Banner */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
          }}
        />

        {/* Top Badges & Actions */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${badge.color}`}>
              {badge.label}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-[#1c241e]/80 text-white backdrop-blur-md">
              For {property.listingType}
            </span>
          </div>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {property.videoUrl && (
              <button
                type="button"
                onClick={(e) => onOpenVideo(property.videoUrl!, property.title, e)}
                title="Watch Video Tour"
                className="w-8 h-8 rounded-full bg-[#1c241e]/90 hover:bg-[#875d46] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              </button>
            )}
            {onEdit && (
              <button
                type="button"
                onClick={(e) => onEdit(property, e)}
                title="Edit Listing"
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 backdrop-blur-md border border-stone-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={(e) => onDelete(property.id, e)}
              title="Delete Listing"
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-rose-50 text-stone-500 hover:text-rose-600 backdrop-blur-md border border-stone-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Image Overlay - Price */}
        <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
          <div className="px-3 py-1 rounded-xl bg-[#1c241e]/85 backdrop-blur-md">
            <span className="text-xl font-extrabold tracking-tight text-white">
              {formatPrice(property.price, property.listingType)}
            </span>
          </div>
          {property.yearBuilt && (
            <span className="text-xs text-stone-700 font-medium bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-200 shadow-sm">
              Built {property.yearBuilt}
            </span>
          )}
        </div>
      </div>

      {/* Content Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#875d46] shrink-0" />
            <span className="truncate">{property.location.area}, {property.location.city}</span>
          </div>

          <h3 className="text-base font-bold text-[#1c241e] group-hover:text-[#875d46] transition-colors line-clamp-1 mb-2">
            {property.title}
          </h3>

          <p className="text-stone-500 text-xs line-clamp-2 mb-4 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="pt-3 border-t border-[#f0ede6]">
          <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-2xl bg-[#faf9f6] border border-[#eeebe3] text-xs text-stone-700 mb-4">
            {property.features.bedrooms !== undefined && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-[#875d46]" />
                <span className="font-bold text-[#1c241e]">{property.features.bedrooms}</span>
                <span className="text-stone-400 text-[10px]">Beds</span>
              </div>
            )}
            {property.features.bathrooms !== undefined && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-[#875d46]" />
                <span className="font-bold text-[#1c241e]">{property.features.bathrooms}</span>
                <span className="text-stone-400 text-[10px]">Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 truncate">
              <Maximize2 className="w-4 h-4 text-[#875d46]" />
              <span className="font-bold text-[#1c241e]">{property.features.areaSqFt.toLocaleString()}</span>
              <span className="text-stone-400 text-[10px]">SqFt</span>
            </div>
          </div>

          {/* Agent info + Arrow CTA */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center gap-2">
              <img
                src={property.agent.image}
                alt={property.agent.name}
                className="w-7 h-7 rounded-full object-cover border border-[#875d46]/30"
              />
              <span className="text-stone-700 font-medium truncate max-w-[110px]">{property.agent.name}</span>
            </div>

            <span className="flex items-center gap-1 text-[#1c241e] font-bold text-xs group-hover:text-[#875d46] transition-colors">
              Details
              <div className="w-5 h-5 rounded-full bg-[#eeebe3] group-hover:bg-[#875d46] group-hover:text-white flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
