'use client';

import React, { useState } from 'react';
import { Property, PropertyCategory, PropertyListingType } from '@/types/property';
import { X, Plus, Image as ImageIcon, Video, Home, Building, Building2, MapPin, DollarSign, Sparkles } from 'lucide-react';

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProperty: (property: Property) => void;
}

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
  onAddProperty,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PropertyCategory>('residential');
  const [listingType, setListingType] = useState<PropertyListingType>('sale');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('Islamabad');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [bedrooms, setBedrooms] = useState('4');
  const [bathrooms, setBathrooms] = useState('4');
  const [areaSqFt, setAreaSqFt] = useState('3500');
  const [floors, setFloors] = useState('2');
  const [parkingSpaces, setParkingSpaces] = useState('2');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [amenitiesInput, setAmenitiesInput] = useState('Swimming Pool, Rooftop Garden, Smart Security, Solar Power');
  const [agentName, setAgentName] = useState('Sophia Chen');
  const [agentPhone, setAgentPhone] = useState('+1 (555) 789-0123');

  if (!isOpen) return null;

  // Preset image generator for convenience
  const applyPresetImage = (type: PropertyCategory) => {
    if (type === 'residential') {
      setImageUrl('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80');
      setVideoUrl('https://www.youtube.com/embed/ScMzIvxBSi4');
    } else if (type === 'commercial') {
      setImageUrl('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80');
      setVideoUrl('https://www.youtube.com/embed/ScMzIvxBSi4');
    } else {
      setImageUrl('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80');
      setVideoUrl('https://www.youtube.com/embed/ScMzIvxBSi4');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !area) {
      alert('Please fill out required fields (Title, Price, Area).');
      return;
    }

    const amenities = amenitiesInput
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const defaultImage = imageUrl || (
      category === 'residential'
        ? 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
        : category === 'commercial'
        ? 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
        : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    );

    const newProperty: Property = {
      id: `prop-${Date.now()}`,
      title,
      description: description || 'Magnificent property in a prime prime location featuring superior finishes, ample natural light, and executive amenities.',
      price: Number(price) || 500000,
      category,
      listingType,
      location: {
        city,
        area,
        address: address || `${area}, ${city}`,
      },
      features: {
        bedrooms: category === 'commercial' ? undefined : Number(bedrooms) || 3,
        bathrooms: category === 'commercial' ? undefined : Number(bathrooms) || 3,
        areaSqFt: Number(areaSqFt) || 2500,
        floors: Number(floors) || 1,
        parkingSpaces: Number(parkingSpaces) || 2,
      },
      amenities: amenities.length > 0 ? amenities : ['Central Air', 'Security System', 'Balcony'],
      imageUrl: defaultImage,
      videoUrl: videoUrl.trim() || undefined,
      featured: true,
      yearBuilt: new Date().getFullYear(),
      agent: {
        name: agentName || 'Prime Agent',
        phone: agentPhone || '+1 (555) 000-1122',
        email: 'concierge@auraestates.com',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      },
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddProperty(newProperty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl shadow-black overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">List New Property</h2>
              <p className="text-xs text-slate-400">Add Residential, Commercial, or Highrise listing with images & video</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto space-y-6 text-sm">
          
          {/* Category & Listing Type Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Property Category *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['residential', 'commercial', 'highrise'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCategory(cat);
                      if (!imageUrl) applyPresetImage(cat);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                      category === cat
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Listing Type *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['sale', 'rent'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setListingType(type)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                      listingType === type
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    For {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Title & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Property Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Skyline Signature Penthouse or Royal Corporate Center"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-750 border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Price (USD) *
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder={listingType === 'rent' ? 'e.g. 4500' : 'e.g. 1250000'}
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                City *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Islamabad">Islamabad</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Dubai">Dubai</option>
                <option value="New York">New York</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Area / District *
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. DHA Phase 6 or Clifton"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Specific Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 14 Marina Avenue"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Property Dimensions & Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/50 p-4 rounded-2xl border border-slate-800">
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                Area (Sq Ft) *
              </label>
              <input
                type="number"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>

            {category !== 'commercial' ? (
              <>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                  Floors
                </label>
                <input
                  type="number"
                  value={floors}
                  onChange={(e) => setFloors(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">
                Parking Slots
              </label>
              <input
                type="number"
                value={parkingSpaces}
                onChange={(e) => setParkingSpaces(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
              />
            </div>
          </div>

          {/* Media Links: Image & Video */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-amber-400" /> Image URL (HD Photo)
                </label>
                <button
                  type="button"
                  onClick={() => applyPresetImage(category)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Auto-fill Sample HD Photo
                </button>
              </div>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Video className="w-4 h-4 text-amber-400" /> Video URL / YouTube Embed
              </label>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/ScMzIvxBSi4 or MP4 link"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Tip: Enter a YouTube embed or video link to enable the interactive video tour button.
              </p>
            </div>
          </div>

          {/* Description & Amenities */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key highlights, interior architecture, views, and surroundings..."
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Amenities (Comma separated)
              </label>
              <input
                type="text"
                value={amenitiesInput}
                onChange={(e) => setAmenitiesInput(e.target.value)}
                placeholder="Infinity Pool, High-Speed Elevators, Smart Security, Central AC, Solar Backup"
                className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-lg shadow-amber-500/25 transition-all"
            >
              Publish Property
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
