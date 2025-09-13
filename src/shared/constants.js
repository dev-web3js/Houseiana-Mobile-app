export const COLORS = {
  primary: '#FF6B35',        // Cosmic Orange - main brand color
  secondary: '#F7931E',      // Orange Secondary
  accent: '#FFB896',         // Cosmic Orange Light
  background: '#FFF8F5',     // Cosmic Orange Background
  surface: '#FFFFFF',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  text: '#2D1B12',          // Dark Brown - main text
  textSecondary: '#8B7355',  // Medium Brown
  textLight: '#A8956B',      // Light Brown
  border: '#E8DDD4',         // Light border matching theme
  overlay: 'rgba(45, 27, 18, 0.5)',
  // Luxury gradients
  gradientPrimary: ['#FF6B35', '#F7931E'],
  gradientLight: ['#FFB896', '#FFF8F5'],
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
  // Auth Flow
  LOGIN: 'Login',
  REGISTER: 'Register',
  RESET_PASSWORD: 'ResetPassword',
  VERIFY_EMAIL: 'VerifyEmail',
  
  // Core Pages
  HOME: 'Home',
  SEARCH: 'Search',
  PROPERTY_DETAIL: 'PropertyDetail',
  BOOKING: 'Booking',
  BOOKING_PAYMENT: 'BookingPayment',
  BOOKING_CONFIRMATION: 'BookingConfirmation',
  
  // User Dashboard
  DASHBOARD: 'Dashboard',
  DASHBOARD_WELCOME: 'DashboardWelcome',
  DASHBOARD_GUEST: 'DashboardGuest',
  PROFILE: 'Profile',
  ACCOUNT_SETTINGS: 'AccountSettings',
  PREFERENCES: 'Preferences',
  
  // Host Features
  BECOME_HOST: 'BecomeHost',
  BECOME_HOST_REGISTER: 'BecomeHostRegister',
  HOST_DASHBOARD: 'HostDashboard',
  HOST_DASHBOARD_WELCOME: 'HostDashboardWelcome',
  HOST_PROPERTIES: 'HostProperties',
  HOST_PROPERTIES_CREATE: 'HostPropertiesCreate',
  HOST_LISTINGS: 'HostListings',
  HOST_LISTINGS_NEW: 'HostListingsNew',
  HOST_BOOKINGS: 'HostBookings',
  HOST_EARNINGS: 'HostEarnings',
  HOST_PROFILE: 'HostProfile',
  
  // Booking & Travel
  BOOKINGS: 'Bookings',
  TRIPS: 'Trips',
  BOOKING_TERMS: 'BookingTerms',
  
  // Communication & Social
  MESSAGES: 'Messages',
  SAVED: 'Saved',
  WISHLISTS: 'Wishlists',
  FAVORITES: 'Favorites',
  
  // Administrative & Support
  HELP: 'Help',
  KYC_VERIFY: 'KYCVerify',
  ADMIN_KYC: 'AdminKYC',
  CO_HOST_ACCEPT: 'CoHostAccept',
  
  // Navigation
  MAIN_TABS: 'MainTabs',
  PROPERTIES: 'Properties',
  MAP: 'Map',
};

// Typography following luxury theme
export const TYPOGRAPHY = {
  heading: {
    fontFamily: 'PlayfairDisplay-Bold', // Luxury serif for headings
    fontWeight: 'bold',
  },
  body: {
    fontFamily: 'Inter-Regular', // Clean sans-serif for body
    fontWeight: 'normal',
  },
  luxury: {
    fontFamily: 'Montserrat-SemiBold', // Premium sans-serif for accents
    fontWeight: '600',
  },
  hero: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay-Bold',
    fontWeight: 'bold',
    color: '#2D1B12',
    lineHeight: 40,
  },
  h1: {
    fontSize: 24,
    fontFamily: 'PlayfairDisplay-Bold',
    fontWeight: 'bold',
    color: '#2D1B12',
    lineHeight: 32,
  },
  h2: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Bold',
    fontWeight: 'bold',
    color: '#2D1B12',
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
    color: '#2D1B12',
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    fontWeight: 'normal',
    color: '#2D1B12',
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    fontWeight: 'normal',
    color: '#8B7355',
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    fontWeight: 'normal',
    color: '#A8956B',
    lineHeight: 16,
  },
};