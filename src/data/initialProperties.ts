import { Property } from '@/types/property';

export const INITIAL_PROPERTIES: Property[] = [

  // 1. 10 Marla HOUSE FOR SALE - Bahria Town Lahore
  {
    id: 'btl-1',
    title: '10 Marla Modern House — Bahria Town Lahore',
    description: 'بحریہ ٹاؤن لاہور میں خوبصورت 10 مرلہ ڈبل سٹوری گھر۔ جدید ڈیزائن، 4 بیڈ رومز، 4 باتھ رومز، ماربل فلورنگ، لان، ڈرائنگ روم، لائبریری۔ 24 گھنٹے بجلی، گیس، پانی اور سیکیورٹی۔',
    price: 38000000,
    category: 'residential',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Tauheed Block',
      address: 'Tauheed Block, Bahria Town, Lahore'
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      areaSqFt: 2250,
      floors: 2,
      parkingSpaces: 2
    },
    amenities: ['24/7 Electricity', 'Gas Available', 'Marble Flooring', 'Lawn & Garden', 'CCTV Security', 'Solar System', 'Servant Quarter'],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/i2TmYTnrWDo',
    featured: true,
    yearBuilt: 2023,
    agent: {
      name: 'Abubakr',
      phone: '03045351802',
      email: 'abubakr@azaanestate.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-10-01'
  },

  // 2. 5 Marla PLOT FOR SALE - Bahria Town Lahore
  {
    id: 'btl-2',
    title: '5 Marla Residential Plot — Bahria Town Lahore',
    description: 'بحریہ ٹاؤن لاہور میں 5 مرلہ رہائشی پلاٹ، بہترین لوکیشن، تمام سہولیات دستیاب، قریب مسجد، پارک اور مارکیٹ۔ فوری ٹرانسفر ممکن، سودا ہو جائے گا۔',
    price: 11500000,
    category: 'residential',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Rafi Block',
      address: 'Rafi Block, Sector C, Bahria Town, Lahore'
    },
    features: {
      areaSqFt: 1125,
      floors: 0,
      parkingSpaces: 0
    },
    amenities: ['Registered Plot', 'Near Mosque', 'Near Park', 'Gated Community', 'All Utilities', 'Immediate Transfer'],
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/HFw9HLBqYsI',
    featured: true,
    yearBuilt: 0,
    agent: {
      name: 'Abubakr',
      phone: '03045351802',
      email: 'abubakr@azaanestate.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-10-10'
  },

  // 3. APARTMENT FOR SALE - Bahria Town Lahore
  {
    id: 'btl-3',
    title: '2 Bed Luxury Apartment For Sale — Bahria Town Lahore',
    description: 'بحریہ ٹاؤن لاہور میں 2 بیڈ رومز کا لگژری اپارٹمنٹ، مکمل فرنشڈ، سوئمنگ پول، جم، 24 گھنٹے سیکیورٹی، مین بلیوارڈ ویو۔ سرمایہ کاری کے لیے بہترین موقع۔',
    price: 18500000,
    category: 'highrise',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Sector C',
      address: 'Midway Commercial, Sector C, Bahria Town, Lahore'
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1050,
      floors: 1,
      parkingSpaces: 1
    },
    amenities: ['Fully Furnished', 'Swimming Pool', 'Gym', '24/7 Security', 'Main Boulevard View', 'Generator Backup', 'Elevator'],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    yearBuilt: 2024,
    agent: {
      name: 'Abubakr',
      phone: '03045351802',
      email: 'abubakr@azaanestate.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-10-15'
  },

  // 4. HOUSE FOR RENT - Bahria Town Lahore
  {
    id: 'btl-4',
    title: '5 Marla House For Rent — Bahria Town Lahore',
    description: 'بحریہ ٹاؤن لاہور میں 5 مرلہ گھر کرائے پر دستیاب۔ 3 بیڈ رومز، 2 باتھ رومز، ڈرائنگ روم، لان۔ فیملی کے لیے بالکل موزوں۔ 24 گھنٹے بجلی اور سیکیورٹی۔',
    price: 75000,
    category: 'residential',
    listingType: 'rent',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Ali Block',
      address: 'Ali Block, Sector B, Bahria Town, Lahore'
    },
    features: {
      bedrooms: 3,
      bathrooms: 2,
      areaSqFt: 1125,
      floors: 1,
      parkingSpaces: 1
    },
    amenities: ['24/7 Electricity', 'Gas Connected', 'Lawn', 'Secure Gated Area', 'Near School', 'Near Mosque'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/wTkVVKJaT4o',
    featured: false,
    yearBuilt: 2021,
    agent: {
      name: 'Abubakr',
      phone: '03045351802',
      email: 'abubakr@azaanestate.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-11-01'
  },

  // 5. 1 KANAL HOUSE FOR SALE - Bahria Town Lahore
  {
    id: 'btl-5',
    title: '1 Kanal Luxury Villa — Bahria Town Lahore',
    description: 'بحریہ ٹاؤن لاہور میں ایک کنال کا شاندار گھر۔ 6 بیڈ رومز، 6 باتھ رومز، سوئمنگ پول، ہوم تھیٹر، سمارٹ ہوم سسٹم، خادموں کا کوارٹر۔ قیمت قابل بات۔',
    price: 95000000,
    category: 'residential',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Jasmine Block',
      address: 'Jasmine Block, Sector C, Bahria Town, Lahore'
    },
    features: {
      bedrooms: 6,
      bathrooms: 6,
      areaSqFt: 4500,
      floors: 2,
      parkingSpaces: 4
    },
    amenities: ['Swimming Pool', 'Home Theater', 'Smart Home', 'Solar System', 'Servant Quarter', 'Marble Flooring', '24/7 Security'],
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/i2TmYTnrWDo',
    featured: true,
    yearBuilt: 2024,
    agent: {
      name: 'Abubakr',
      phone: '03045351802',
      email: 'abubakr@azaanestate.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-09-15'
  },

  // 6. COMMERCIAL SHOP FOR RENT - Bahria Town Lahore
  {
    id: 'btl-6',
    title: 'Commercial Shop For Rent — Bahria Town Lahore',
    description: 'بحریہ ٹاؤن لاہور کے مین کمرشل ایریا میں دکان کرائے پر دستیاب۔ ہائی ٹریفک لوکیشن، براہ راست بلیوارڈ ویو، تمام سہولیات۔ کاروبار کے لیے بہترین مقام۔',
    price: 85000,
    category: 'commercial',
    listingType: 'rent',
    location: {
      city: 'Lahore',
      area: 'Bahria Town — Main Boulevard',
      address: 'Main Commercial Boulevard, Bahria Town, Lahore'
    },
    features: {
      areaSqFt: 450,
      floors: 1,
      parkingSpaces: 2
    },
    amenities: ['Main Boulevard Location', 'High Footfall', 'Generator Backup', 'CCTV', 'Direct Parking', 'Near Food Court'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/HFw9HLBqYsI',
    featured: false,
    yearBuilt: 2022,
    agent: {
      name: 'Abubakr',
      phone: '03045351802',
      email: 'abubakr@azaanestate.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-11-05'
  }

];
