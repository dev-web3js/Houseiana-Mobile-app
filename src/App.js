import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './auth/AuthContext';

// Import global services
import { localizationService } from './services/localizationService';
import { complianceService } from './services/complianceService';
import { analyticsService } from './services/analyticsService';

const App = () => {
  useEffect(() => {
    // Initialize global services on app start
    initializeGlobalServices();
  }, []);

  const initializeGlobalServices = async () => {
    try {
      console.log('🌐 Initializing Houseiana Global Platform...');
      
      // Initialize localization service
      await localizationService.initialize();
      
      // Initialize compliance service
      await complianceService.initialize();
      
      // Initialize analytics service
      await analyticsService.initialize();
      
      // Track app launch
      await analyticsService.trackAppLifecycle('app_opened', {
        platform: 'global',
        version: '1.0.0',
      });
      
      console.log('✅ Global services initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize global services:', error);
    }
  };

  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
