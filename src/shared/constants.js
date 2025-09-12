export const COLORS = {
  primary: '#2196F3',
  secondary: '#FF9800',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  text: '#212121',
  textSecondary: '#757575',
  background: '#FFFFFF',
  surface: '#FAFAFA',
  border: '#E0E0E0',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const PROPERTY_TYPES = [
  {label: 'House', value: 'house'},
  {label: 'Apartment', value: 'apartment'},
  {label: 'Condo', value: 'condo'},
  {label: 'Villa', value: 'villa'},
  {label: 'Studio', value: 'studio'},
];

export const CATEGORIES = [
  {id: 'all', name: 'All homes', icon: '🏠'},
  {id: 'beachfront', name: 'Beachfront', icon: '🏖️'},
  {id: 'amazing-views', name: 'Amazing views', icon: '🌅'},
  {id: 'luxury', name: 'Luxe', icon: '💎'},
  {id: 'amazing-pools', name: 'Amazing pools', icon: '🏊'},
  {id: 'villas', name: 'Villas', icon: '🏰'},
  {id: 'apartments', name: 'Apartments', icon: '🏢'},
  {id: 'new', name: 'New', icon: '✨'},
  {id: 'trending', name: 'Trending', icon: '🔥'},
  {id: 'family-friendly', name: 'Family-friendly', icon: '👨‍👩‍👧‍👦'},
  {id: 'workspace', name: 'Remote work', icon: '💻'},
  {id: 'parking', name: 'Free parking', icon: '🚗'}
];

export const POPULAR_DESTINATIONS = [
  {
    city: 'The Pearl',
    country: 'Qatar',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&h=600&fit=crop',
    properties: '120+ properties',
    description: 'Island living with marina views'
  },
  {
    city: 'West Bay',
    country: 'Doha',
    image: 'https://images.unsplash.com/photo-1572252821143-035a024857ac?w=800&h=600&fit=crop',
    properties: '85+ properties',
    description: 'Business district & skyline views'
  },
  {
    city: 'Lusail',
    country: 'Qatar',
    image: 'https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=800&h=600&fit=crop',
    properties: '65+ properties',
    description: 'Modern planned city'
  },
  {
    city: 'Al Waab',
    country: 'Doha',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    properties: '50+ properties',
    description: 'Family-friendly neighborhood'
  },
  {
    city: 'Al Rayyan',
    country: 'Qatar',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    properties: '40+ properties',
    description: 'Traditional meets modern'
  },
  {
    city: 'Al Wakrah',
    country: 'Qatar',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    properties: '30+ properties',
    description: 'Coastal heritage town'
  }
];

export const SORT_OPTIONS = [
  {label: 'Price: Low to High', value: 'price_asc'},
  {label: 'Price: High to Low', value: 'price_desc'},
  {label: 'Newest First', value: 'createdAt_desc'},
  {label: 'Oldest First', value: 'createdAt_asc'},
  {label: 'Most Popular', value: 'views_desc'},
];

export const SCREEN_NAMES = {
  // Auth
  LOGIN: 'Login',
  REGISTER: 'Register',
  
  // Main
  HOME: 'Home',
  PROPERTIES: 'Properties',
  PROPERTY_DETAIL: 'PropertyDetail',
  FAVORITES: 'Favorites',
  PROFILE: 'Profile',
  
  // Main Tabs
  MAIN_TABS: 'MainTabs',
};