export type PropertyCategory = 'residential' | 'commercial' | 'highrise';

export type PropertyListingType = 'sale' | 'rent';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  category: PropertyCategory;
  listingType: PropertyListingType;
  location: {
    city: string;
    area: string;
    address: string;
  };
  features: {
    bedrooms?: number;
    bathrooms?: number;
    areaSqFt: number;
    floors?: number;
    parkingSpaces?: number;
  };
  amenities: string[];
  imageUrl: string;
  videoUrl?: string; // YouTube embed URL, direct MP4, or video link
  featured?: boolean;
  yearBuilt?: number;
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  createdAt: string;
}

export interface PropertyFilterState {
  searchQuery: string;
  category: 'all' | PropertyCategory;
  listingType: 'all' | PropertyListingType;
  city: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'area';
}
