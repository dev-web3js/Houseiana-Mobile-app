import { CURRENCIES, PLATFORM } from './constants';

export const formatPrice = (price, currency = 'USD', locale = null) => {
  if (!price && price !== 0) {
    return 'N/A';
  }

  // Get currency configuration
  const currencyConfig = CURRENCIES[currency] || CURRENCIES[PLATFORM.defaultCurrency];
  const formatLocale = locale || currencyConfig.locale || 'en-US';

  // Special handling for Middle Eastern currencies
  if (['QAR', 'AED', 'SAR'].includes(currency)) {
    return `${currencyConfig.symbol} ${price.toLocaleString(formatLocale)}`;
  }

  // Standard international formatting
  return new Intl.NumberFormat(formatLocale, {
    style: 'currency',
    currency: currency,
  }).format(price);
};

// Multi-currency price conversion (placeholder - would integrate with exchange rate API)
export const convertPrice = (price, fromCurrency, toCurrency, exchangeRates = {}) => {
  if (fromCurrency === toCurrency) {
    return price;
  }
  
  // Placeholder conversion logic - in production, would use real-time exchange rates
  const baseRate = exchangeRates[`${fromCurrency}_${toCurrency}`] || 1;
  return price * baseRate;
};

// Regional price formatting
export const formatRegionalPrice = (price, userRegion, userCurrency) => {
  const regions = {
    'North America': { currency: 'USD', format: 'standard' },
    'Europe': { currency: 'EUR', format: 'standard' },
    'Middle East': { currency: 'USD', format: 'regional' },
    'Asia Pacific': { currency: 'USD', format: 'standard' },
  };
  
  const regionConfig = regions[userRegion] || regions['North America'];
  const currency = userCurrency || regionConfig.currency;
  
  return formatPrice(price, currency);
};

export const formatDate = (dateString, locale = 'en-US', timezone = 'UTC') => {
  if (!dateString) {
    return 'N/A';
  }
  
  const date = new Date(dateString);
  
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: timezone,
  });
};

// Multi-timezone date formatting
export const formatDateForRegion = (dateString, userRegion, userTimezone) => {
  const regionalSettings = {
    'North America': { locale: 'en-US', timezone: userTimezone || 'America/New_York' },
    'Europe': { locale: 'en-GB', timezone: userTimezone || 'Europe/London' },
    'Middle East': { locale: 'en-US', timezone: userTimezone || 'Asia/Dubai' },
    'Asia Pacific': { locale: 'en-AU', timezone: userTimezone || 'Australia/Sydney' },
  };
  
  const settings = regionalSettings[userRegion] || regionalSettings['North America'];
  return formatDate(dateString, settings.locale, settings.timezone);
};

export const capitalizeFirst = (str) => {
  if (!str) {
    return '';
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

// Global utility functions
export const detectUserRegion = (countryCode) => {
  const regionMap = {
    'US': 'North America',
    'CA': 'North America',
    'MX': 'North America',
    'GB': 'Europe',
    'FR': 'Europe',
    'DE': 'Europe',
    'ES': 'Europe',
    'IT': 'Europe',
    'NL': 'Europe',
    'QA': 'Middle East',
    'AE': 'Middle East',
    'SA': 'Middle East',
    'KW': 'Middle East',
    'BH': 'Middle East',
    'OM': 'Middle East',
    'AU': 'Asia Pacific',
    'JP': 'Asia Pacific',
    'SG': 'Asia Pacific',
    'HK': 'Asia Pacific',
    'NZ': 'Asia Pacific',
  };
  
  return regionMap[countryCode] || 'North America';
};

export const getRegionalDefaults = (region) => {
  const defaults = {
    'North America': { currency: 'USD', language: 'en', timezone: 'America/New_York' },
    'Europe': { currency: 'EUR', language: 'en', timezone: 'Europe/London' },
    'Middle East': { currency: 'USD', language: 'en', timezone: 'Asia/Dubai' },
    'Asia Pacific': { currency: 'USD', language: 'en', timezone: 'Australia/Sydney' },
  };
  
  return defaults[region] || defaults['North America'];
};

// Global validation helpers
export const validateInternationalPhone = (phone, countryCode) => {
  // Basic international phone validation - would integrate with libphonenumber in production
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 7 && cleanPhone.length <= 15;
};

export const formatInternationalAddress = (address, countryCode) => {
  // Format address based on country conventions
  const formats = {
    'US': 'street, city, state zipcode',
    'GB': 'street, city, county, postcode',
    'QA': 'street, area, city',
    // Add more country formats as needed
  };
  
  return address; // Placeholder - would implement proper formatting
};