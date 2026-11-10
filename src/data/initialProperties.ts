import { Property } from '@/types/property';

export const INITIAL_PROPERTIES: Property[] = [

  // ── FOR SALE ──────────────────────────────────────────────

  // 1. House For Sale
  {
    id: 'btl-s1',
    title: '10 Marla Modern Double Story House',
    description: 'Beautiful double-story house in Bahria Town Lahore. Features 4 bedrooms, 4 bathrooms, marble flooring, spacious drawing room, lush green lawn, servant quarter and solar backup. Ready for immediate possession.',
    price: 38500000,
    category: 'residential',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Tauheed Block',
      address: 'Tauheed Block, Sector C, Bahria Town, Lahore'
    },
    features: { bedrooms: 4, bathrooms: 4, areaSqFt: 2250, floors: 2, parkingSpaces: 2 },
    amenities: ['24/7 Electricity', 'Gas Available', 'Marble Flooring', 'Lawn & Garden', '24/7 Security', 'Solar System', 'Servant Quarter'],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/i2TmYTnrWDo',
    featured: true,
    yearBuilt: 2023,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-10-01'
  },

  // 2. Apartment For Sale
  {
    id: 'btl-s2',
    title: '2 Bed Luxury Apartment For Sale',
    description: 'Premium apartment on 8th floor with stunning views in Bahria Town Lahore. Fully furnished, modern kitchen, attached bathrooms, 24/7 security, swimming pool & gym access. Perfect for investors and families.',
    price: 17500000,
    category: 'highrise',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Sector C',
      address: 'Midway Commercial, Sector C, Bahria Town, Lahore'
    },
    features: { bedrooms: 2, bathrooms: 2, areaSqFt: 1050, floors: 1, parkingSpaces: 1 },
    amenities: ['Fully Furnished', 'Swimming Pool', 'Gym', '24/7 Security', 'City View', 'Generator Backup', 'Elevator'],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    yearBuilt: 2024,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-10-10'
  },

  // 3. Plot For Sale
  {
    id: 'btl-s3',
    title: '5 Marla Residential Plot — Prime Location',
    description: 'Ideally located 5 Marla residential plot in one of the most developed blocks of Bahria Town Lahore. All utilities available, near mosque, park & market. Immediate transfer possible. Best investment opportunity.',
    price: 11000000,
    category: 'residential',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Rafi Block',
      address: 'Rafi Block, Sector C, Bahria Town, Lahore'
    },
    features: { areaSqFt: 1125, floors: 0, parkingSpaces: 0 },
    amenities: ['Registered Plot', 'Near Mosque', 'Near Park', 'Gated Community', 'All Utilities', 'Immediate Transfer'],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/HFw9HLBqYsI',
    featured: false,
    yearBuilt: 0,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-10-15'
  },

  // 4. Commercial Plot For Sale
  {
    id: 'btl-s4',
    title: '4 Marla Commercial Plot — Main Boulevard',
    description: 'Prime commercial plot on Main Boulevard of Bahria Town Lahore. High traffic location, surrounded by banks, restaurants and showrooms. Best opportunity for business or investment. All NOCs cleared.',
    price: 28000000,
    category: 'commercial',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Main Boulevard',
      address: 'Main Commercial Boulevard, Bahria Town, Lahore'
    },
    features: { areaSqFt: 900, floors: 0, parkingSpaces: 0 },
    amenities: ['Main Boulevard', 'High Traffic Area', 'All NOCs Clear', 'Corner Plot', 'Near Banks', 'Near Food Court'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/HFw9HLBqYsI',
    featured: true,
    yearBuilt: 0,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-10-20'
  },

  // ── FOR RENT ──────────────────────────────────────────────

  // 5. House For Rent
  {
    id: 'btl-r1',
    title: '5 Marla House For Rent — Family Ready',
    description: 'Well-maintained 5 Marla house available for rent in Bahria Town Lahore. 3 bedrooms, 2 bathrooms, drawing room, lawn. Ideal for families. 24/7 electricity, gas connected. Available immediately.',
    price: 72000,
    category: 'residential',
    listingType: 'rent',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Ali Block',
      address: 'Ali Block, Sector B, Bahria Town, Lahore'
    },
    features: { bedrooms: 3, bathrooms: 2, areaSqFt: 1125, floors: 1, parkingSpaces: 1 },
    amenities: ['24/7 Electricity', 'Gas Connected', 'Lawn', 'Secure Gated Area', 'Near School', 'Near Mosque'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/wTkVVKJaT4o',
    featured: false,
    yearBuilt: 2021,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-11-01'
  },

  // 6. Apartment For Rent
  {
    id: 'btl-r2',
    title: '1 Bed Furnished Apartment For Rent',
    description: 'Cozy and fully furnished 1-bedroom apartment for rent in Bahria Town Lahore. Perfect for singles, couples or small families. Includes all appliances, 24/7 security, elevator access and parking.',
    price: 40000,
    category: 'highrise',
    listingType: 'rent',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Sector E',
      address: 'Sector E Commercial, Bahria Town, Lahore'
    },
    features: { bedrooms: 1, bathrooms: 1, areaSqFt: 650, floors: 1, parkingSpaces: 1 },
    amenities: ['Fully Furnished', 'All Appliances', '24/7 Security', 'Elevator', 'Parking', 'Near Food Court'],
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: false,
    yearBuilt: 2022,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-11-05'
  },

  // 7. Commercial Shop For Rent
  {
    id: 'btl-r3',
    title: 'Commercial Shop For Rent — High Footfall Area',
    description: 'Ground floor commercial shop available for rent on a highly trafficked street in Bahria Town Lahore. Excellent visibility, direct parking, generator backup. Suitable for retail, pharmacy, salon, or any business.',
    price: 80000,
    category: 'commercial',
    listingType: 'rent',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Sector C Commercial',
      address: 'Sector C Commercial Area, Bahria Town, Lahore'
    },
    features: { areaSqFt: 400, floors: 1, parkingSpaces: 2 },
    amenities: ['Ground Floor', 'High Footfall', 'Generator Backup', 'CCTV', 'Direct Parking', 'Near Restaurants'],
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/HFw9HLBqYsI',
    featured: false,
    yearBuilt: 2020,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-11-08'
  },

];
