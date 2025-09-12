import apiClient from '../services/apiClient';

class PropertiesService {
  async getProperties(filters = {}) {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await apiClient.get(`/properties?${params}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getPropertyById(id) {
    try {
      const response = await apiClient.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async createProperty(propertyData) {
    try {
      const response = await apiClient.post('/properties', propertyData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateProperty(id, propertyData) {
    try {
      const response = await apiClient.patch(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteProperty(id) {
    try {
      const response = await apiClient.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async toggleFavorite(propertyId) {
    try {
      const response = await apiClient.post(`/properties/${propertyId}/favorite`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getFavorites() {
    try {
      const response = await apiClient.get('/properties/favorites/my-list');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getMyProperties() {
    try {
      const response = await apiClient.get('/properties/host/my-properties');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response) {
      return new Error(error.response.data.message || 'Properties operation failed');
    } else if (error.request) {
      return new Error('Network error. Please check your connection.');
    } else {
      return new Error('An unexpected error occurred');
    }
  }
}

export default new PropertiesService();