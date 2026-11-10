import { Property } from '@/types/property';

export const INITIAL_PROPERTIES: Property[] = [

  // ═══════════════════════════════════════════════
  //  FOR SALE
  // ═══════════════════════════════════════════════

  // 1. HOUSE FOR SALE
  {
    id: 'btl-hs1',
    title: '10 Marla Modern Double Story House',
    description: 'Stunning double-storey house in Bahria Town Lahore — Tauheed Block. Features 4 bedrooms with attached baths, marble flooring throughout, spacious drawing & dining, modern kitchen, beautifully landscaped lawn, solar system & servant quarter. Ready possession.',
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
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://www.youtube.com/embed/i2TmYTnrWDo',
    featured: true,
    yearBuilt: 2023,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-10-01'
  },

  // 2. COMMERCIAL FOR SALE
  {
    id: 'btl-cs1',
    title: '4 Marla Commercial Plot — Main Boulevard',
    description: 'Prime commercial plot on the Main Boulevard of Bahria Town Lahore. High-traffic corner location surrounded by banks, restaurants, and showrooms. All NOCs cleared, ideal for a plaza, office, or investment. Immediate transfer available.',
    price: 28000000,
    category: 'commercial',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Main Boulevard',
      address: 'Main Commercial Boulevard, Sector C, Bahria Town, Lahore'
    },
    features: { areaSqFt: 900, floors: 0, parkingSpaces: 0 },
    amenities: ['Main Boulevard', 'Corner Plot', 'High Traffic Area', 'All NOCs Clear', 'Near Banks', 'Near Food Court'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://www.youtube.com/embed/HFw9HLBqYsI',
    featured: true,
    yearBuilt: 0,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-10-20'
  },

  // 3. HIGHRISE / APARTMENT FOR SALE
  {
    id: 'btl-as1',
    title: '2 Bed Luxury Apartment — Bahria Heights',
    description: 'Premium 2-bedroom apartment on the 8th floor of Bahria Heights, Bahria Town Lahore. Fully furnished with stunning city views, modern kitchen, attached bathrooms, 24/7 security, swimming pool & gym access. Perfect for investors and families.',
    price: 17500000,
    category: 'highrise',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Bahria Heights, Sector C',
      address: 'Bahria Heights, Midway Commercial, Sector C, Bahria Town, Lahore'
    },
    features: { bedrooms: 2, bathrooms: 2, areaSqFt: 1050, floors: 1, parkingSpaces: 1 },
    amenities: ['Fully Furnished', 'Swimming Pool', 'Gym', '24/7 Security', 'City View', 'Generator Backup', 'Elevator'],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    yearBuilt: 2024,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-10-10'
  },

  // ═══════════════════════════════════════════════
  //  FOR RENT
  // ═══════════════════════════════════════════════

  // 4. HOUSE FOR RENT
  {
    id: 'btl-hr1',
    title: '5 Marla House For Rent — Family Ready',
    description: 'Well-maintained 5 Marla house available for rent in Ali Block, Bahria Town Lahore. 3 bedrooms, 2 bathrooms, spacious drawing room and lawn. Ideal for families. 24/7 electricity, gas connected. Immediate availability.',
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
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://www.youtube.com/embed/wTkVVKJaT4o',
    featured: false,
    yearBuilt: 2021,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-11-01'
  },

  // 5. COMMERCIAL FOR RENT
  {
    id: 'btl-cr1',
    title: 'Commercial Shop For Rent — High Footfall',
    description: 'Ground-floor commercial shop on a high-footfall street in Sector C, Bahria Town Lahore. Excellent visibility, direct customer parking, generator backup and CCTV. Ideal for retail, pharmacy, salon, or any small business.',
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
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://www.youtube.com/embed/HFw9HLBqYsI',
    featured: false,
    yearBuilt: 2020,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-11-08'
  },

  // 6. HIGHRISE / APARTMENT FOR RENT
  {
    id: 'btl-ar1',
    title: '1 Bed Furnished Apartment For Rent — Bahria Orchard',
    description: 'Cozy and fully furnished 1-bedroom apartment for rent in Bahria Orchard, Bahria Town Lahore. Includes all appliances, 24/7 security, elevator access, and dedicated parking. Perfect for singles, couples or small families.',
    price: 40000,
    category: 'highrise',
    listingType: 'rent',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Bahria Orchard, Sector E',
      address: 'Bahria Orchard, Sector E, Bahria Town, Lahore'
    },
    features: { bedrooms: 1, bathrooms: 1, areaSqFt: 650, floors: 1, parkingSpaces: 1 },
    amenities: ['Fully Furnished', 'All Appliances', '24/7 Security', 'Elevator', 'Parking', 'Near Food Court'],
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: false,
    yearBuilt: 2022,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-11-05'
  },

  // ═══════════════════════════════════════════════
  //  PLOT FOR SALE
  // ═══════════════════════════════════════════════

  // 7. PLOT FOR SALE
  {
    id: 'btl-ps1',
    title: '5 Marla Residential Plot — Rafi Block',
    description: 'Ideally located 5 Marla residential plot in one of the most sought-after blocks of Bahria Town Lahore. All utilities (electricity, gas, water) are available, close to mosque, park and market. Immediate transfer possible — best investment opportunity.',
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
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://www.youtube.com/embed/HFw9HLBqYsI',
    featured: false,
    yearBuilt: 0,
    agent: { name: 'Abubakr', phone: '03045351802', email: 'abubakr@azaanestate.com', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80' },
    createdAt: '2026-10-15'
  },

];
