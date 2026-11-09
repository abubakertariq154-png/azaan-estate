import { Property } from '@/types/property';

export const INITIAL_PROPERTIES: Property[] = [
  // RESIDENTIAL PROPERTIES
  {
    id: 'res-1',
    title: 'Modern Minimalist Luxury Villa',
    description: 'An architectural masterpiece featuring open-concept spaces, private heated infinity pool, landscaped Zen gardens, smart home automation, and panoramic sunset views.',
    price: 1850000,
    category: 'residential',
    listingType: 'sale',
    location: {
      city: 'Islamabad',
      area: 'Sector F-7/2',
      address: 'Margalla Foothills Avenue, Islamabad'
    },
    features: {
      bedrooms: 5,
      bathrooms: 6,
      areaSqFt: 5400,
      floors: 2,
      parkingSpaces: 4
    },
    amenities: ['Private Infinity Pool', 'Smart Home System', 'Home Theater', 'Lush Lawn', 'Servant Quarters', 'Solar Backup'],
    imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    yearBuilt: 2024,
    agent: {
      name: 'Alexander Wright',
      phone: '+1 (555) 234-5678',
      email: 'alexander@luxuryspaces.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-02-15'
  },
  {
    id: 'res-2',
    title: 'Contemporary Lakefront Family Residence',
    description: 'Spacious waterfront living with custom floor-to-ceiling glass facades, private dock, designer Italian kitchen, and serene mountain backdrop.',
    price: 920000,
    category: 'residential',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'DHA Phase 6',
      address: 'Canal Ridge Blvd, Lahore'
    },
    features: {
      bedrooms: 4,
      bathrooms: 5,
      areaSqFt: 4100,
      floors: 2,
      parkingSpaces: 3
    },
    amenities: ['Lake View', 'Chef Kitchen', 'Wine Cellar', 'Private Gym', '24/7 Security'],
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    yearBuilt: 2023,
    agent: {
      name: 'Sophia Chen',
      phone: '+1 (555) 345-6789',
      email: 'sophia.c@luxuryspaces.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-03-01'
  },
  {
    id: 'res-3',
    title: 'Serene Botanical Haven Townhouse',
    description: 'A cozy yet expansive green living sanctuary nestled near parks with rooftop sun deck, modular interior layouts, and energy-efficient systems.',
    price: 4500,
    category: 'residential',
    listingType: 'rent',
    location: {
      city: 'Karachi',
      area: 'Clifton Block 4',
      address: 'Sea View Promenade, Karachi'
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      areaSqFt: 2600,
      floors: 3,
      parkingSpaces: 2
    },
    amenities: ['Rooftop Terrace', 'Balcony', 'Green Solar Powered', 'Pet Friendly'],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: false,
    yearBuilt: 2022,
    agent: {
      name: 'Zayn Malik',
      phone: '+92 300 1234567',
      email: 'zayn@luxuryspaces.com',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-03-10'
  },

  // COMMERCIAL PROPERTIES
  {
    id: 'com-1',
    title: 'Apex Business Center - Grade A Corporate Plaza',
    description: 'Iconic commercial hub with LEED gold certification, customizable office spaces, high-speed fiber-optic infrastructure, retail promenade on ground level, and multi-tier basement parking.',
    price: 4200000,
    category: 'commercial',
    listingType: 'sale',
    location: {
      city: 'Karachi',
      area: 'I.I. Chundrigar Road',
      address: 'Financial District Plaza, Karachi'
    },
    features: {
      areaSqFt: 22000,
      floors: 6,
      parkingSpaces: 45
    },
    amenities: ['LEED Gold Certified', 'Central HVAC', 'High-Speed Elevators', '24/7 Power Backup', 'Conference Auditorium', 'Fire Suppression System'],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    yearBuilt: 2024,
    agent: {
      name: 'Marcus Vance',
      phone: '+1 (555) 789-0123',
      email: 'marcus.v@luxuryspaces.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-01-20'
  },
  {
    id: 'com-2',
    title: 'Grand Boulevard Retail & Showroom Galleria',
    description: 'Prime frontage commercial showroom and flagship boutique outlet space with double-height glass display, massive pedestrian footfall, and turnkey interior finishes.',
    price: 18000,
    category: 'commercial',
    listingType: 'rent',
    location: {
      city: 'Lahore',
      area: 'Gulberg III - MM Alam Road',
      address: 'Fashion Avenue, Gulberg, Lahore'
    },
    features: {
      areaSqFt: 6800,
      floors: 2,
      parkingSpaces: 16
    },
    amenities: ['High-Footfall Location', 'Double Height Glazing', 'Valet Parking', 'Dedicated Loading Bay', 'Security Cameras'],
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: false,
    yearBuilt: 2023,
    agent: {
      name: 'Sophia Chen',
      phone: '+1 (555) 345-6789',
      email: 'sophia.c@luxuryspaces.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-02-28'
  },
  {
    id: 'com-3',
    title: 'TechHub Innovation Campus & Coworking Suites',
    description: 'State of the art technology park setup with soundproof meeting pods, event amphitheater, server room facilities, and high-efficiency zoning.',
    price: 3100000,
    category: 'commercial',
    listingType: 'sale',
    location: {
      city: 'Islamabad',
      area: 'Blue Area Business District',
      address: 'Jinnah Avenue Tech Tower, Islamabad'
    },
    features: {
      areaSqFt: 14500,
      floors: 4,
      parkingSpaces: 28
    },
    amenities: ['Dual Fiber Connectivity', 'Data Center Ready', 'Rooftop Cafe', 'EV Charging Stations', 'Biometric Access'],
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    yearBuilt: 2025,
    agent: {
      name: 'Alexander Wright',
      phone: '+1 (555) 234-5678',
      email: 'alexander@luxuryspaces.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-03-05'
  },

  // HIGHRISE PROPERTIES
  {
    id: 'high-1',
    title: 'The SkyCrown Penthouse - 48th Floor Sky Mansion',
    description: 'An unheralded ultra-luxury penthouse hovering above the city skyline. Features 360-degree glass perimeter, private cantilevered plunge pool, private elevator access, and bespoke Italian furnishings.',
    price: 3650000,
    category: 'highrise',
    listingType: 'sale',
    location: {
      city: 'Karachi',
      area: 'Clifton Marina Skyline',
      address: 'Tower One, Arabian Sea Promenade'
    },
    features: {
      bedrooms: 4,
      bathrooms: 5,
      areaSqFt: 6200,
      floors: 2,
      parkingSpaces: 4
    },
    amenities: ['Cantilevered Sky Pool', 'Private High-Speed Elevator', 'Sky Lounge & Helipad', '24/7 Concierge', 'Spa & Sauna', 'Boutique Gym'],
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    yearBuilt: 2025,
    agent: {
      name: 'Marcus Vance',
      phone: '+1 (555) 789-0123',
      email: 'marcus.v@luxuryspaces.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-01-10'
  },
  {
    id: 'high-2',
    title: 'Horizon Heights Luxury Sky Loft',
    description: 'Panoramic glass apartment on the 32nd floor offering sunset views of Margalla hills, premium smart-glass shades, Italian quartz countertops, and club membership access.',
    price: 3800,
    category: 'highrise',
    listingType: 'rent',
    location: {
      city: 'Islamabad',
      area: 'E-11 Centaurus Skyway',
      address: 'Centaurus Heights Level 32, Islamabad'
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      areaSqFt: 1850,
      floors: 1,
      parkingSpaces: 2
    },
    amenities: ['Infinity Sky Deck', 'Residents Gym', 'Valet & Concierge', 'Cinema Room', 'Heated Indoor Pool'],
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: false,
    yearBuilt: 2024,
    agent: {
      name: 'Alexander Wright',
      phone: '+1 (555) 234-5678',
      email: 'alexander@luxuryspaces.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-02-18'
  },
  {
    id: 'high-3',
    title: 'The Vertex Royal Tower Duplex Suite',
    description: 'Two-level highrise residence combining monumental volume with cozy modern finishes, floating staircase, automated climate controls, and private terrace.',
    price: 1450000,
    category: 'highrise',
    listingType: 'sale',
    location: {
      city: 'Lahore',
      area: 'Gulberg Greens Skyline',
      address: 'Tower Royale, Main Boulevard, Lahore'
    },
    features: {
      bedrooms: 3,
      bathrooms: 4,
      areaSqFt: 3400,
      floors: 2,
      parkingSpaces: 3
    },
    amenities: ['Sky Garden Terrace', 'Infinity Pool', 'Children Play Zone', 'Steam Room & Jacuzzi', 'Round the Clock Security'],
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    featured: true,
    yearBuilt: 2025,
    agent: {
      name: 'Sophia Chen',
      phone: '+1 (555) 345-6789',
      email: 'sophia.c@luxuryspaces.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80'
    },
    createdAt: '2026-03-12'
  }
];
