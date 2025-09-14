export const COLORS = {
  primary: '#FF6B35', // Cosmic Orange - main brand color
  secondary: '#F7931E', // Orange Secondary
  accent: '#FFB896', // Cosmic Orange Light
  background: '#FFF8F5', // Cosmic Orange Background
  surface: '#FFFFFF',
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  text: '#2D1B12', // Dark Brown - main text
  textSecondary: '#8B7355', // Medium Brown
  textLight: '#A8956B', // Light Brown
  border: '#E8DDD4', // Light border matching theme
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
  { label: 'House', value: 'house' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'Condo', value: 'condo' },
  { label: 'Villa', value: 'villa' },
  { label: 'Studio', value: 'studio' },
];

export const CATEGORIES = [
  { id: 'all', name: 'All homes', icon: '🏠' },
  { id: 'beachfront', name: 'Beachfront', icon: '🏖️' },
  { id: 'amazing-views', name: 'Amazing views', icon: '🌅' },
  { id: 'luxury', name: 'Luxe', icon: '💎' },
  { id: 'amazing-pools', name: 'Amazing pools', icon: '🏊' },
  { id: 'villas', name: 'Villas', icon: '🏰' },
  { id: 'apartments', name: 'Apartments', icon: '🏢' },
  { id: 'new', name: 'New', icon: '✨' },
  { id: 'trending', name: 'Trending', icon: '🔥' },
  { id: 'family-friendly', name: 'Family-friendly', icon: '👨‍👩‍👧‍👦' },
  { id: 'workspace', name: 'Remote work', icon: '💻' },
  { id: 'parking', name: 'Free parking', icon: '🚗' },
];

export const POPULAR_DESTINATIONS = [
  {
    city: 'New York',
    country: 'United States',
    image:
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    properties: '12,000+ properties',
    description: 'The city that never sleeps',
  },
  {
    city: 'Paris',
    country: 'France',
    image:
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    properties: '8,500+ properties',
    description: 'City of lights and romance',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    image:
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    properties: '9,200+ properties',
    description: 'Historic charm meets modern luxury',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    image:
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    properties: '6,800+ properties',
    description: 'Traditional culture meets innovation',
  },
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    properties: '4,200+ properties',
    description: 'Luxury desert oasis',
  },
  {
    city: 'Barcelona',
    country: 'Spain',
    image:
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop',
    properties: '5,100+ properties',
    description: 'Mediterranean coastal beauty',
  },
  {
    city: 'The Pearl',
    country: 'Qatar',
    image:
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&h=600&fit=crop',
    properties: '120+ properties',
    description: 'Island living with marina views',
  },
  {
    city: 'Sydney',
    country: 'Australia',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    properties: '3,800+ properties',
    description: 'Harbour city with iconic landmarks',
  },
];

export const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Newest First', value: 'createdAt_desc' },
  { label: 'Oldest First', value: 'createdAt_asc' },
  { label: 'Most Popular', value: 'views_desc' },
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
// Global Platform Configuration
export const PLATFORM = {
  name: 'Houseiana',
  description: 'World-class global Airbnb alternative',
  tagline: 'Starting with strong presence in the Middle East and expanding globally',
  vision: 'Serve users worldwide with premium luxury hospitality',
  defaultTimezone: 'UTC',
  defaultCurrency: 'USD',
  supportedRegions: ['North America', 'Europe', 'Middle East', 'Asia Pacific', 'Africa', 'South America'],
};

// Multi-Currency Support
export const CURRENCIES = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
    primary: true,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'en-EU',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    locale: 'en-GB',
  },
  QAR: {
    code: 'QAR',
    symbol: 'ر.ق',
    name: 'Qatari Riyal',
    locale: 'ar-QA',
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    locale: 'en-AU',
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    locale: 'en-CA',
  },
  AED: {
    code: 'AED',
    symbol: 'د.إ',
    name: 'UAE Dirham',
    locale: 'ar-AE',
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    locale: 'ja-JP',
  },
};

// Regional Settings
export const REGIONS = {
  'North America': {
    countries: ['US', 'CA', 'MX'],
    defaultCurrency: 'USD',
    defaultLanguage: 'en',
    taxStructure: 'regional_vat',
  },
  'Europe': {
    countries: ['GB', 'FR', 'DE', 'ES', 'IT', 'NL'],
    defaultCurrency: 'EUR',
    defaultLanguage: 'en',
    taxStructure: 'eu_vat',
  },
  'Middle East': {
    countries: ['QA', 'AE', 'SA', 'KW', 'BH', 'OM'],
    defaultCurrency: 'USD',
    defaultLanguage: 'en',
    taxStructure: 'gcc_vat',
  },
  'Asia Pacific': {
    countries: ['AU', 'JP', 'SG', 'HK', 'NZ'],
    defaultCurrency: 'USD',
    defaultLanguage: 'en',
    taxStructure: 'regional_vat',
  },
};

// Language Support
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    primary: true,
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    rtl: true,
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
  },
};

// Global Payment Methods
export const PAYMENT_METHODS = {
  cards: {
    visa: { name: 'Visa', icon: '💳', global: true },
    mastercard: { name: 'Mastercard', icon: '💳', global: true },
    amex: { name: 'American Express', icon: '💳', global: true },
  },
  digital_wallets: {
    paypal: { name: 'PayPal', icon: '📱', regions: ['North America', 'Europe', 'Asia Pacific'] },
    apple_pay: { name: 'Apple Pay', icon: '📱', regions: ['North America', 'Europe', 'Asia Pacific'] },
    google_pay: { name: 'Google Pay', icon: '📱', regions: ['North America', 'Europe', 'Asia Pacific'] },
  },
  bank_transfers: {
    sepa: { name: 'SEPA Transfer', icon: '🏦', regions: ['Europe'] },
    wire: { name: 'Wire Transfer', icon: '🏦', global: true },
    local_bank: { name: 'Local Bank Transfer', icon: '🏦', global: true },
  },
  regional: {
    alipay: { name: 'Alipay', icon: '📱', regions: ['Asia Pacific'] },
    wechat_pay: { name: 'WeChat Pay', icon: '📱', regions: ['Asia Pacific'] },
    paymi: { name: 'PayMe', icon: '📱', regions: ['Middle East'] },
  },
};

// Pricing Configuration
export const PRICING = {
  defaultCommissionRate: 0.12, // 12% platform fee
  regionalCommissionRates: {
    'Middle East': 0.10, // 10% for Middle East launch region
    'North America': 0.12,
    'Europe': 0.12,
    'Asia Pacific': 0.15,
  },
  minimumPayoutAmounts: {
    USD: 50,
    EUR: 45,
    GBP: 40,
    QAR: 180,
    AUD: 70,
    CAD: 65,
  },
  serviceFeeRanges: {
    budget: { min: 0.08, max: 0.12 },
    standard: { min: 0.10, max: 0.15 },
    luxury: { min: 0.12, max: 0.18 },
  },
};

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
