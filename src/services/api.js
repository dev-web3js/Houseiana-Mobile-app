import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

// Use localhost for iOS simulator, 10.0.2.2 for Android emulator
const API_BASE_URL = __DEV__ ? 
  (Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000') :
  'https://your-production-api.com';

class MobileAPIService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      async (config) => {
        try {
          const token = await AsyncStorage.getItem('houseiana_token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (error) {
          console.log('Error retrieving token:', error);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Clear invalid token
          await AsyncStorage.removeItem('houseiana_token');
          // You might want to redirect to login here
        }
        return Promise.reject(error);
      }
    );
  }

  // Helper method for error handling
  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.data?.error || 'An error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your internet connection.');
    } else {
      // Other error
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }

  // =============================================================================
  // AUTHENTICATION API
  // =============================================================================

  async login(credentials) {
    try {
      const response = await this.client.post('/auth/login', credentials);
      const { access_token, user } = response.data;
      
      if (access_token) {
        await AsyncStorage.setItem('houseiana_token', access_token);
        await AsyncStorage.setItem('houseiana_user', JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await this.client.post('/auth/register', userData);
      const { access_token, user } = response.data;
      
      if (access_token) {
        await AsyncStorage.setItem('houseiana_token', access_token);
        await AsyncStorage.setItem('houseiana_user', JSON.stringify(user));
      }
      
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async logout() {
    try {
      await AsyncStorage.multiRemove(['houseiana_token', 'houseiana_user']);
      return { success: true };
    } catch (error) {
      console.log('Logout error:', error);
      return { success: false };
    }
  }

  async getCurrentUser() {
    try {
      const response = await this.client.get('/auth/profile');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async forgotPassword(email) {
    try {
      const response = await this.client.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async resetPassword(token, password) {
    try {
      const response = await this.client.post('/auth/reset-password', { token, password });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // =============================================================================
  // PROPERTIES API
  // =============================================================================

  async searchProperties(filters = {}) {
    try {
      const params = new URLSearchParams();
      Object.keys(filters).forEach(key => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          if (Array.isArray(filters[key])) {
            filters[key].forEach(item => params.append(key, item));
          } else {
            params.append(key, filters[key]);
          }
        }
      });
      
      const response = await this.client.get(`/properties?${params.toString()}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getProperty(id) {
    try {
      const response = await this.client.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createProperty(propertyData) {
    try {
      const response = await this.client.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateProperty(id, propertyData) {
    try {
      const response = await this.client.patch(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteProperty(id) {
    try {
      const response = await this.client.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMyProperties() {
    try {
      const response = await this.client.get('/properties/host/my-properties');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Favorites
  async toggleFavorite(propertyId) {
    try {
      const response = await this.client.post(`/properties/${propertyId}/favorite`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getFavorites() {
    try {
      const response = await this.client.get('/properties/favorites/my-list');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // =============================================================================
  // BOOKINGS API
  // =============================================================================

  async createBooking(bookingData) {
    try {
      const response = await this.client.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getBookings() {
    try {
      const response = await this.client.get('/bookings');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getBooking(id) {
    try {
      const response = await this.client.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateBookingStatus(id, status) {
    try {
      const response = await this.client.patch(`/bookings/${id}/status`, { status });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async cancelBooking(id, reason) {
    try {
      const response = await this.client.patch(`/bookings/${id}/cancel`, { reason });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Host bookings
  async getHostBookings() {
    try {
      const response = await this.client.get('/bookings/host');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async confirmBooking(id) {
    try {
      const response = await this.client.patch(`/bookings/${id}/confirm`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // =============================================================================
  // USER PROFILE API
  // =============================================================================

  async updateProfile(profileData) {
    try {
      const response = await this.client.patch('/users/profile', profileData);
      const updatedUser = response.data;
      await AsyncStorage.setItem('houseiana_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      this.handleError(error);
    }
  }

  async uploadProfilePhoto(imageData) {
    try {
      const formData = new FormData();
      formData.append('photo', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.name || 'profile.jpg',
      });

      const response = await this.client.post('/users/profile/photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async changePassword(passwordData) {
    try {
      const response = await this.client.patch('/users/change-password', passwordData);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // =============================================================================
  // KYC VERIFICATION API
  // =============================================================================

  async startKYCVerification() {
    try {
      const response = await this.client.post('/kyc/start');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async uploadKYCDocument(documentType, imageData) {
    try {
      const formData = new FormData();
      formData.append('document', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.name || `${documentType}.jpg`,
      });
      formData.append('documentType', documentType);

      const response = await this.client.post('/kyc/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getKYCStatus() {
    try {
      const response = await this.client.get('/kyc/status');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // =============================================================================
  // MESSAGES API
  // =============================================================================

  async getConversations() {
    try {
      const response = await this.client.get('/messages/conversations');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getMessages(conversationId) {
    try {
      const response = await this.client.get(`/messages/conversations/${conversationId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async sendMessage(conversationId, message) {
    try {
      const response = await this.client.post(`/messages/conversations/${conversationId}`, {
        message,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async createConversation(recipientId, propertyId, message) {
    try {
      const response = await this.client.post('/messages/conversations', {
        recipientId,
        propertyId,
        message,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // =============================================================================
  // NOTIFICATIONS API
  // =============================================================================

  async getNotifications() {
    try {
      const response = await this.client.get('/notifications');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async markNotificationAsRead(id) {
    try {
      const response = await this.client.patch(`/notifications/${id}/read`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async registerPushToken(token, platform) {
    try {
      const response = await this.client.post('/notifications/register-token', {
        token,
        platform, // 'ios' or 'android'
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // =============================================================================
  // REVIEWS API
  // =============================================================================

  async createReview(propertyId, bookingId, reviewData) {
    try {
      const response = await this.client.post('/reviews', {
        propertyId,
        bookingId,
        ...reviewData,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getPropertyReviews(propertyId) {
    try {
      const response = await this.client.get(`/reviews/property/${propertyId}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserReviews() {
    try {
      const response = await this.client.get('/reviews/user');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // =============================================================================
  // SEARCH SUGGESTIONS API
  // =============================================================================

  async getLocationSuggestions(query) {
    try {
      const response = await this.client.get(`/search/locations?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async getRecentSearches() {
    try {
      const searches = await AsyncStorage.getItem('recent_searches');
      return searches ? JSON.parse(searches) : [];
    } catch (error) {
      console.log('Error getting recent searches:', error);
      return [];
    }
  }

  async saveRecentSearch(searchData) {
    try {
      const recentSearches = await this.getRecentSearches();
      const updatedSearches = [searchData, ...recentSearches.slice(0, 9)]; // Keep last 10
      await AsyncStorage.setItem('recent_searches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.log('Error saving recent search:', error);
    }
  }

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  async uploadImage(imageData, endpoint = '/upload/image') {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: imageData.uri,
        type: imageData.type,
        name: imageData.name || 'image.jpg',
      });

      const response = await this.client.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async uploadMultipleImages(imagesData, endpoint = '/upload/images') {
    try {
      const formData = new FormData();
      imagesData.forEach((imageData, index) => {
        formData.append('images', {
          uri: imageData.uri,
          type: imageData.type,
          name: imageData.name || `image_${index}.jpg`,
        });
      });

      const response = await this.client.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Health check
  async healthCheck() {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Get app configuration
  async getAppConfig() {
    try {
      const response = await this.client.get('/config/app');
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
}

// Create singleton instance
const mobileApiService = new MobileAPIService();

export default mobileApiService;