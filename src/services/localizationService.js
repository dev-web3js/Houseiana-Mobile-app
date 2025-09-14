import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGES, PLATFORM } from '../shared/constants';

class LocalizationService {
  constructor() {
    this.currentLanguage = 'en';
    this.currentRegion = 'North America';
    this.translations = {};
    this.isInitialized = false;
  }

  /**
   * Initialize localization service
   */
  async initialize() {
    try {
      const savedLanguage = await AsyncStorage.getItem('user_language');
      const savedRegion = await AsyncStorage.getItem('user_region');
      
      this.currentLanguage = savedLanguage || 'en';
      this.currentRegion = savedRegion || 'North America';
      
      await this.loadTranslations(this.currentLanguage);
      
      this.isInitialized = true;
      console.log(`🌐 Localization initialized: ${this.currentLanguage}`);
    } catch (error) {
      console.error('Failed to initialize localization:', error);
    }
  }

  /**
   * Load translations for a specific language
   */
  async loadTranslations(languageCode) {
    try {
      // In production, these would be loaded from API or local files
      const translations = this.getDefaultTranslations(languageCode);
      this.translations[languageCode] = translations;
    } catch (error) {
      console.error(`Failed to load translations for ${languageCode}:`, error);
    }
  }

  /**
   * Get default translations (placeholder - would load from actual translation files)
   */
  getDefaultTranslations(languageCode) {
    const translations = {
      en: {
        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.cancel': 'Cancel',
        'common.save': 'Save',
        'common.close': 'Close',
        'common.back': 'Back',
        'common.next': 'Next',
        'common.search': 'Search',
        
        // Platform
        'platform.name': 'Houseiana',
        'platform.tagline': 'World-class global Airbnb alternative',
        'platform.description': 'Starting with strong presence in the Middle East and expanding globally',
        
        // Navigation
        'nav.home': 'Home',
        'nav.search': 'Search',
        'nav.trips': 'Trips',
        'nav.messages': 'Messages',
        'nav.profile': 'Profile',
        
        // Auth
        'auth.login': 'Sign In',
        'auth.register': 'Sign Up',
        'auth.logout': 'Sign Out',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.forgotPassword': 'Forgot Password?',
        
        // Properties
        'properties.title': 'Properties',
        'properties.filters': 'Filters',
        'properties.sortBy': 'Sort by',
        'properties.priceRange': 'Price Range',
        'properties.guests': 'Guests',
        'properties.bedrooms': 'Bedrooms',
        'properties.bathrooms': 'Bathrooms',
        
        // Booking
        'booking.checkIn': 'Check-in',
        'booking.checkOut': 'Check-out',
        'booking.guests': 'Guests',
        'booking.total': 'Total',
        'booking.bookNow': 'Book Now',
        'booking.confirmation': 'Booking Confirmed',
        
        // Messages
        'messages.title': 'Messages',
        'messages.noMessages': 'No messages yet',
        'messages.typeMessage': 'Type a message...',
        
        // Currency
        'currency.usd': 'US Dollar',
        'currency.eur': 'Euro',
        'currency.gbp': 'British Pound',
        'currency.qar': 'Qatari Riyal',
      },
      
      ar: {
        // Common
        'common.loading': 'جاري التحميل...',
        'common.error': 'خطأ',
        'common.success': 'نجح',
        'common.cancel': 'إلغاء',
        'common.save': 'حفظ',
        'common.close': 'إغلاق',
        'common.back': 'رجوع',
        'common.next': 'التالي',
        'common.search': 'بحث',
        
        // Platform
        'platform.name': 'هوسيانا',
        'platform.tagline': 'بديل عالمي راقي لإير بي إن بي',
        'platform.description': 'نبدأ بحضور قوي في الشرق الأوسط ونتوسع عالمياً',
        
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.search': 'البحث',
        'nav.trips': 'الرحلات',
        'nav.messages': 'الرسائل',
        'nav.profile': 'الملف الشخصي',
        
        // Auth
        'auth.login': 'تسجيل الدخول',
        'auth.register': 'إنشاء حساب',
        'auth.logout': 'تسجيل الخروج',
        'auth.email': 'البريد الإلكتروني',
        'auth.password': 'كلمة المرور',
        'auth.forgotPassword': 'نسيت كلمة المرور؟',
        
        // Properties
        'properties.title': 'العقارات',
        'properties.filters': 'التصفية',
        'properties.sortBy': 'ترتيب حسب',
        'properties.priceRange': 'نطاق السعر',
        'properties.guests': 'الضيوف',
        'properties.bedrooms': 'غرف النوم',
        'properties.bathrooms': 'الحمامات',
      },
      
      fr: {
        // Common
        'common.loading': 'Chargement...',
        'common.error': 'Erreur',
        'common.success': 'Succès',
        'common.cancel': 'Annuler',
        'common.save': 'Sauvegarder',
        'common.close': 'Fermer',
        'common.back': 'Retour',
        'common.next': 'Suivant',
        'common.search': 'Rechercher',
        
        // Platform
        'platform.name': 'Houseiana',
        'platform.tagline': 'Alternative mondiale de classe mondiale à Airbnb',
        'platform.description': 'Commençant par une forte présence au Moyen-Orient et s\'étendant mondialement',
      },
    };

    return translations[languageCode] || translations['en'];
  }

  /**
   * Get translated text
   */
  t(key, params = {}) {
    if (!this.isInitialized) {
      return key;
    }

    const translation = this.translations[this.currentLanguage]?.[key] || 
                       this.translations['en']?.[key] || 
                       key;

    // Simple parameter replacement
    let result = translation;
    Object.keys(params).forEach(param => {
      result = result.replace(`{{${param}}}`, params[param]);
    });

    return result;
  }

  /**
   * Change language
   */
  async setLanguage(languageCode) {
    if (!LANGUAGES[languageCode]) {
      console.warn(`Language ${languageCode} not supported`);
      return;
    }

    try {
      await this.loadTranslations(languageCode);
      this.currentLanguage = languageCode;
      await AsyncStorage.setItem('user_language', languageCode);
      
      console.log(`🌐 Language changed to: ${languageCode}`);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }

  /**
   * Set user region
   */
  async setRegion(region) {
    try {
      this.currentRegion = region;
      await AsyncStorage.setItem('user_region', region);
      
      console.log(`🌍 Region changed to: ${region}`);
    } catch (error) {
      console.error('Failed to change region:', error);
    }
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Get current region
   */
  getCurrentRegion() {
    return this.currentRegion;
  }

  /**
   * Check if language is RTL
   */
  isRTL() {
    const language = LANGUAGES[this.currentLanguage];
    return language?.rtl || false;
  }

  /**
   * Get available languages
   */
  getAvailableLanguages() {
    return Object.values(LANGUAGES);
  }

  /**
   * Format number according to current locale
   */
  formatNumber(number, options = {}) {
    const language = LANGUAGES[this.currentLanguage];
    const locale = language?.locale || 'en-US';
    
    return new Intl.NumberFormat(locale, options).format(number);
  }

  /**
   * Format date according to current locale
   */
  formatDate(date, options = {}) {
    const language = LANGUAGES[this.currentLanguage];
    const locale = language?.locale || 'en-US';
    
    return new Intl.DateTimeFormat(locale, options).format(new Date(date));
  }

  /**
   * Get localized currency info
   */
  getLocalizedCurrency(currencyCode) {
    const currencyNames = {
      en: {
        'USD': 'US Dollar',
        'EUR': 'Euro',
        'GBP': 'British Pound',
        'QAR': 'Qatari Riyal',
        'AUD': 'Australian Dollar',
        'CAD': 'Canadian Dollar',
      },
      ar: {
        'USD': 'الدولار الأمريكي',
        'EUR': 'اليورو',
        'GBP': 'الجنيه الإسترليني',
        'QAR': 'الريال القطري',
        'AUD': 'الدولار الأسترالي',
        'CAD': 'الدولار الكندي',
      },
      fr: {
        'USD': 'Dollar américain',
        'EUR': 'Euro',
        'GBP': 'Livre sterling',
        'QAR': 'Riyal qatarien',
      }
    };

    return currencyNames[this.currentLanguage]?.[currencyCode] || currencyCode;
  }

  /**
   * Get localized property types
   */
  getLocalizedPropertyTypes() {
    const types = {
      en: [
        { label: 'House', value: 'house' },
        { label: 'Apartment', value: 'apartment' },
        { label: 'Villa', value: 'villa' },
        { label: 'Studio', value: 'studio' },
      ],
      ar: [
        { label: 'منزل', value: 'house' },
        { label: 'شقة', value: 'apartment' },
        { label: 'فيلا', value: 'villa' },
        { label: 'استوديو', value: 'studio' },
      ],
      fr: [
        { label: 'Maison', value: 'house' },
        { label: 'Appartement', value: 'apartment' },
        { label: 'Villa', value: 'villa' },
        { label: 'Studio', value: 'studio' },
      ]
    };

    return types[this.currentLanguage] || types['en'];
  }
}

// Export singleton instance
export const localizationService = new LocalizationService();

// Helper hooks for React components
export const useTranslation = () => {
  return {
    t: localizationService.t.bind(localizationService),
    currentLanguage: localizationService.getCurrentLanguage(),
    currentRegion: localizationService.getCurrentRegion(),
    isRTL: localizationService.isRTL(),
    setLanguage: localizationService.setLanguage.bind(localizationService),
    setRegion: localizationService.setRegion.bind(localizationService),
    formatNumber: localizationService.formatNumber.bind(localizationService),
    formatDate: localizationService.formatDate.bind(localizationService),
    getLocalizedCurrency: localizationService.getLocalizedCurrency.bind(localizationService),
    getLocalizedPropertyTypes: localizationService.getLocalizedPropertyTypes.bind(localizationService),
  };
};

export default localizationService;