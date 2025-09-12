import mobileApiService from '../services/api';

// This service now delegates to the comprehensive mobileApiService
class AuthService {
  async login(credentials) {
    return mobileApiService.login(credentials);
  }

  async register(userData) {
    return mobileApiService.register(userData);
  }

  async validateToken(token) {
    return mobileApiService.getCurrentUser();
  }

  async refreshToken() {
    // This would be handled automatically by the API interceptors
    return mobileApiService.getCurrentUser();
  }

  async logout() {
    return mobileApiService.logout();
  }

  async forgotPassword(email) {
    return mobileApiService.forgotPassword(email);
  }

  async resetPassword(token, password) {
    return mobileApiService.resetPassword(token, password);
  }
}

export default new AuthService();