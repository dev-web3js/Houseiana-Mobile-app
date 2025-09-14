import mobileApiService from '../services/api';

// This service now delegates to the comprehensive mobileApiService
class PropertiesService {
  async getProperties(filters = {}) {
    return mobileApiService.searchProperties(filters);
  }

  async getPropertyById(id) {
    return mobileApiService.getProperty(id);
  }

  async createProperty(propertyData) {
    return mobileApiService.createProperty(propertyData);
  }

  async updateProperty(id, propertyData) {
    return mobileApiService.updateProperty(id, propertyData);
  }

  async deleteProperty(id) {
    return mobileApiService.deleteProperty(id);
  }

  async toggleFavorite(propertyId) {
    return mobileApiService.toggleFavorite(propertyId);
  }

  async getFavorites() {
    return mobileApiService.getFavorites();
  }

  async getMyProperties() {
    return mobileApiService.getMyProperties();
  }

  // Additional methods available through the mobile API service
  async uploadPropertyImages(imagesData) {
    return mobileApiService.uploadMultipleImages(
      imagesData,
      '/properties/images'
    );
  }

  async getPropertyReviews(propertyId) {
    return mobileApiService.getPropertyReviews(propertyId);
  }

  async createReview(propertyId, bookingId, reviewData) {
    return mobileApiService.createReview(propertyId, bookingId, reviewData);
  }
}

export default new PropertiesService();
