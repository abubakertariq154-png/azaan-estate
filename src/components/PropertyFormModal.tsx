'use client';

import React, { useState, useEffect } from 'react';
import { Property, PropertyCategory, PropertyListingType } from '@/types/property';
import { 
  X, 
  Save, 
  Plus, 
  Image as ImageIcon, 
  Video, 
  Home, 
  Building, 
  Building2, 
  MapPin, 
  DollarSign, 
  Sparkles,
  User,
  Check,
  AlertCircle
} from 'lucide-react';

interface PropertyFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (property: Property) => void;
  initialProperty?: Property | null;
}

const PRESET_IMAGES = [
  {
    label: 'Luxury Villa',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    category: 'residential' as PropertyCategory
  },
  {
    label: 'Modern Family Home',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    category: 'residential' as PropertyCategory
  },
  {
    label: 'Corporate Plaza',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    category: 'commercial' as PropertyCategory
  },
  {
    label: 'Skyline Penthouse',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    category: 'highrise' as PropertyCategory
  },
  {
    label: 'Waterfront Mansion',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    category: 'residential' as PropertyCategory
  }
];

export const PropertyFormModal: React.FC<PropertyFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProperty,
}) => {
  const isEditing = Boolean(initialProperty);

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
  const [amenitiesInput, setAmenitiesInput] = useState('Swimming Pool, Rooftop Garden, Smart Security, Solar Backup');
  const [featured, setFeatured] = useState(true);
  const [yearBuilt, setYearBuilt] = useState('2024');

  // Agent fields
  const [agentName, setAgentName] = useState('Sophia Chen');
  const [agentPhone, setAgentPhone] = useState('+92 300 1234567');
  const [agentEmail, setAgentEmail] = useState('concierge@azaanestate.com');
  const [agentImage, setAgentImage] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialProperty) {
      setTitle(initialProperty.title || '');
      setDescription(initialProperty.description || '');
      setCategory(initialProperty.category || 'residential');
      setListingType(initialProperty.listingType || 'sale');
      setPrice(String(initialProperty.price || ''));
      setCity(initialProperty.location.city || 'Islamabad');
      setArea(initialProperty.location.area || '');
      setAddress(initialProperty.location.address || '');
      setBedrooms(String(initialProperty.features.bedrooms ?? 4));
      setBathrooms(String(initialProperty.features.bathrooms ?? 4));
      setAreaSqFt(String(initialProperty.features.areaSqFt || 3500));
      setFloors(String(initialProperty.features.floors ?? 2));
      setParkingSpaces(String(initialProperty.features.parkingSpaces ?? 2));
      setImageUrl(initialProperty.imageUrl || '');
      setVideoUrl(initialProperty.videoUrl || '');
      setAmenitiesInput(initialProperty.amenities?.join(', ') || '');
      setFeatured(initialProperty.featured ?? true);
      setYearBuilt(String(initialProperty.yearBuilt || 2024));
      setAgentName(initialProperty.agent?.name || 'Sophia Chen');
      setAgentPhone(initialProperty.agent?.phone || '+92 300 1234567');
      setAgentEmail(initialProperty.agent?.email || 'concierge@azaanestate.com');
      setAgentImage(initialProperty.agent?.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80');
      setErrors({});
    } else {
      // Reset to defaults for new listing
      setTitle('');
      setDescription('');
      setCategory('residential');
      setListingType('sale');
      setPrice('750000');
      setCity('Islamabad');
      setArea('Sector F-7');
      setAddress('');
      setBedrooms('4');
      setBathrooms('4');
      setAreaSqFt('3500');
      setFloors('2');
      setParkingSpaces('2');
      setImageUrl('https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80');
      setVideoUrl('https://www.youtube.com/embed/ScMzIvxBSi4');
      setAmenitiesInput('Swimming Pool, Rooftop Garden, Smart Security, Solar Backup');
      setFeatured(true);
      setYearBuilt(String(new Date().getFullYear()));
      setAgentName('Sophia Chen');
      setAgentPhone('+92 300 1234567');
      setAgentEmail('concierge@azaanestate.com');
      setAgentImage('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80');
      setErrors({});
    }
  }, [initialProperty, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!price || Number(price) <= 0) newErrors.price = 'Valid price is required';
    if (!area.trim()) newErrors.area = 'Area/Neighborhood is required';
    if (!imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    if (!areaSqFt || Number(areaSqFt) <= 0) newErrors.areaSqFt = 'Valid Sq Ft area is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const parsedAmenities = amenitiesInput
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const propertyData: Property = {
      id: initialProperty?.id || `prop-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Exceptional property offering elite architecture, premium fittings, high-yield investment potential, and prime location access.',
      price: Number(price),
      category,
      listingType,
      location: {
        city,
        area: area.trim(),
        address: address.trim() || `${area.trim()}, ${city}`,
      },
      features: {
        bedrooms: category === 'commercial' ? undefined : Number(bedrooms) || 0,
        bathrooms: category === 'commercial' ? undefined : Number(bathrooms) || 0,
        areaSqFt: Number(areaSqFt) || 2500,
        floors: Number(floors) || 1,
        parkingSpaces: Number(parkingSpaces) || 1,
      },
      amenities: parsedAmenities.length > 0 ? parsedAmenities : ['Security System', 'Modern Elevator', 'Backup Generator'],
      imageUrl: imageUrl.trim(),
      videoUrl: videoUrl.trim() || undefined,
      featured,
      yearBuilt: Number(yearBuilt) || new Date().getFullYear(),
      agent: {
        name: agentName.trim() || 'Azaan Estate Agent',
        phone: agentPhone.trim() || '+92 300 1234567',
        email: agentEmail.trim() || 'concierge@azaanestate.com',
        image: agentImage.trim() || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      },
      createdAt: initialProperty?.createdAt || new Date().toISOString().split('T')[0],
    };

    onSave(propertyData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#ffffff] border border-[#e8e6df] rounded-[28px] shadow-2xl overflow-hidden my-6 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#eeebe3] bg-[#fbfaf8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1c241e] text-white flex items-center justify-center shadow-sm">
              {isEditing ? <Save className="w-5 h-5 text-white" /> : <Plus className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#1c241e] tracking-tight">
                {isEditing ? 'Edit Property Listing' : 'Add New Property Listing'}
              </h2>
              <p className="text-xs text-stone-500">
                {isEditing ? `Updating ID: ${initialProperty?.id}` : 'Fill in property details, media, specs and agent info'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f0ede6] hover:bg-[#e4dfd4] text-stone-700 flex items-center justify-center transition-all hover:scale-105"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-[#1c241e]">
          
          {/* Main Category & Listing Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#f8f7f4] border border-[#e9e6dd]">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Property Category
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['residential', 'commercial', 'highrise'] as PropertyCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                      category === cat
                        ? 'bg-[#1c241e] text-white border-[#1c241e] shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
                Listing Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['sale', 'rent'] as PropertyListingType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setListingType(type)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition-all border ${
                      listingType === type
                        ? 'bg-[#875d46] text-white border-[#875d46] shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    For {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#875d46] flex items-center gap-1.5">
              <span>Basic Information</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Property Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Modern Minimalist Luxury Villa"
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.title ? 'border-rose-500 bg-rose-50/40' : 'border-stone-300'
                } bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]`}
              />
              {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Price ($ USD or PKR equivalent) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-stone-400 font-bold">$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="1200000"
                    className={`w-full pl-8 pr-4 py-2.5 rounded-xl border ${
                      errors.price ? 'border-rose-500 bg-rose-50/40' : 'border-stone-300'
                    } bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]`}
                  />
                </div>
                {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Year Built
                </label>
                <input
                  type="number"
                  value={yearBuilt}
                  onChange={(e) => setYearBuilt(e.target.value)}
                  placeholder="2024"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Property Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key highlights, luxury interior finishes, architecture, scenic views, and security features..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4 pt-2 border-t border-[#f0ede6]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#875d46]">
              Location & Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  City <span className="text-rose-500">*</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
                >
                  <option value="Islamabad">Islamabad</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Peshawar">Peshawar</option>
                  <option value="Dubai">Dubai</option>
                  <option value="London">London</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Area / Sector / Neighborhood <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Sector F-7/2, DHA Phase 6, Clifton"
                  className={`w-full px-4 py-2.5 rounded-xl border ${
                    errors.area ? 'border-rose-500 bg-rose-50/40' : 'border-stone-300'
                  } bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]`}
                />
                {errors.area && <p className="text-xs text-rose-500 mt-1">{errors.area}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Full Street Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Margalla Foothills Avenue, Sector F-7/2, Islamabad"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
              />
            </div>
          </div>

          {/* Specifications */}
          <div className="space-y-4 pt-2 border-t border-[#f0ede6]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#875d46]">
              Dimensions & Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Area (Sq Ft) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(e.target.value)}
                  placeholder="3500"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  disabled={category === 'commercial'}
                  placeholder={category === 'commercial' ? 'N/A' : '4'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e] disabled:bg-stone-100 disabled:text-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  disabled={category === 'commercial'}
                  placeholder={category === 'commercial' ? 'N/A' : '4'}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e] disabled:bg-stone-100 disabled:text-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Floors
                </label>
                <input
                  type="number"
                  value={floors}
                  onChange={(e) => setFloors(e.target.value)}
                  placeholder="2"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Parking
                </label>
                <input
                  type="number"
                  value={parkingSpaces}
                  onChange={(e) => setParkingSpaces(e.target.value)}
                  placeholder="2"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Amenities & Features (Comma separated)
              </label>
              <input
                type="text"
                value={amenitiesInput}
                onChange={(e) => setAmenitiesInput(e.target.value)}
                placeholder="Infinity Pool, Smart Home Automation, Private Gym, Servant Quarters, Solar Backup"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
              />
            </div>
          </div>

          {/* Media & Images */}
          <div className="space-y-4 pt-2 border-t border-[#f0ede6]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#875d46]">
              Images & Virtual Video Tour
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Main Image URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={`w-full px-4 py-2.5 rounded-xl border ${
                  errors.imageUrl ? 'border-rose-500 bg-rose-50/40' : 'border-stone-300'
                } bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]`}
              />
              {errors.imageUrl && <p className="text-xs text-rose-500 mt-1">{errors.imageUrl}</p>}

              {/* Quick Preset Buttons */}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-stone-500 font-medium">Quick presets:</span>
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      setCategory(preset.category);
                    }}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-[#eeeae1] hover:bg-[#dedcd4] text-stone-700 font-medium transition-colors"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Image Preview */}
              {imageUrl && (
                <div className="mt-3 relative w-full h-36 rounded-2xl overflow-hidden border border-stone-200 bg-stone-100">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
                    }}
                  />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-semibold">
                    Image Preview
                  </span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Virtual Video Tour URL (YouTube Embed or direct video link)
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/ScMzIvxBSi4"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
              />
              <p className="text-[11px] text-stone-500 mt-1">
                Supports YouTube embed links, e.g. <code className="bg-stone-100 px-1 py-0.5 rounded">https://www.youtube.com/embed/ScMzIvxBSi4</code>
              </p>
            </div>
          </div>

          {/* Agent Information */}
          <div className="space-y-4 pt-2 border-t border-[#f0ede6]">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#875d46]">
              Assigned Real Estate Agent
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Agent Name</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="Sophia Chen"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Agent Phone</label>
                <input
                  type="text"
                  value={agentPhone}
                  onChange={(e) => setAgentPhone(e.target.value)}
                  placeholder="+92 300 1234567"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Agent Email</label>
                <input
                  type="email"
                  value={agentEmail}
                  onChange={(e) => setAgentEmail(e.target.value)}
                  placeholder="agent@azaanestate.com"
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#1c241e]"
                />
              </div>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="pt-2 border-t border-[#f0ede6] flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-[#1c241e] block">Featured Listing</span>
              <span className="text-xs text-stone-500">Showcase this listing on the homepage featured section</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#875d46]"></div>
            </label>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#eeebe3] bg-[#fbfaf8]">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-full bg-[#1c241e] hover:bg-[#2b372e] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{isEditing ? 'Save Changes' : 'Create Listing'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

