import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useAuth } from '../auth/AuthContext';
import { COLORS } from '../shared/constants';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import VerifyEmailScreen from '../screens/auth/VerifyEmailScreen';

// Home Screens
import HomeScreen from '../screens/home/HomeScreen';
import EnhancedHomeScreen from '../screens/home/EnhancedHomeScreen';

// Property Screens
import PropertiesScreen from '../screens/properties/PropertiesScreen';
import AdvancedSearchScreen from '../screens/search/AdvancedSearchScreen';
import PropertyDetailScreen from '../screens/properties/PropertyDetailScreen';
import FavoritesScreen from '../screens/properties/FavoritesScreen';

// Booking Screens
import BookingScreen from '../screens/booking/BookingScreen';
import BookingConfirmationScreen from '../screens/booking/BookingConfirmationScreen';
import MyBookingsScreen from '../screens/booking/MyBookingsScreen';

// Profile Screens
import ProfileScreen from '../screens/profile/ProfileScreen';
import AccountSettingsScreen from '../screens/profile/AccountSettingsScreen';

// Host Screens
import BecomeHostScreen from '../screens/host/BecomeHostScreen';
import HostDashboardScreen from '../screens/host/HostDashboardScreen';
import AddPropertyScreen from '../screens/host/AddPropertyScreen';
import MyPropertiesScreen from '../screens/host/MyPropertiesScreen';
import BookingsScreen from '../screens/host/BookingsScreen';
import HostEarningsScreen from '../screens/host/HostEarningsScreen';

// Communication Screens
import MessagesScreen from '../screens/messages/MessagesScreen';

// Saved & Wishlists
import WishlistsScreen from '../screens/saved/WishlistsScreen';

// Support Screens
import HelpScreen from '../screens/support/HelpScreen';

// KYC & Payment Screens
import KYCVerificationScreen from '../screens/kyc/KYCVerificationScreen';
import PaymentMethodsScreen from '../screens/payment/PaymentMethodsScreen';

// Map Screen
import MapScreen from '../screens/properties/MapScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Trips') {
            iconName = 'event-note';
          } else if (route.name === 'Messages') {
            iconName = 'message';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.border,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={EnhancedHomeScreen} />
      <Tab.Screen name="Search" component={AdvancedSearchScreen} />
      <Tab.Screen name="Trips" component={MyBookingsScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
          borderBottomColor: COLORS.border,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ headerShown: false }}
      />

      {/* Property Related Screens */}
      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetailScreen}
        options={{ title: 'Property Details', headerShown: false }}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ title: 'Saved Properties' }}
      />
      <Stack.Screen
        name="Wishlists"
        component={WishlistsScreen}
        options={{ title: 'Wishlists', headerShown: false }}
      />

      {/* Booking Related Screens */}
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{ title: 'Book Property', headerShown: false }}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{
          title: 'Booking Confirmed',
          headerLeft: null,
          headerShown: false,
        }}
      />

      {/* Map Screen */}
      <Stack.Screen
        name="PropertyMap"
        component={MapScreen}
        options={{ title: 'Map View', headerShown: false }}
      />

      {/* Profile & Settings */}
      <Stack.Screen
        name="AccountSettings"
        component={AccountSettingsScreen}
        options={{ title: 'Account Settings', headerShown: false }}
      />

      {/* Host Flow */}
      <Stack.Screen
        name="BecomeHost"
        component={BecomeHostScreen}
        options={{ title: 'Become a Host', headerShown: false }}
      />
      <Stack.Screen
        name="HostDashboard"
        component={HostDashboardScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddProperty"
        component={AddPropertyScreen}
        options={{ title: 'Add Property' }}
      />
      <Stack.Screen
        name="MyProperties"
        component={MyPropertiesScreen}
        options={{ title: 'My Properties' }}
      />
      <Stack.Screen
        name="HostBookings"
        component={BookingsScreen}
        options={{ title: 'Manage Bookings' }}
      />
      <Stack.Screen
        name="HostEarnings"
        component={HostEarningsScreen}
        options={{ title: 'Earnings', headerShown: false }}
      />

      {/* Support & Help */}
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={{ title: 'Help Center', headerShown: false }}
      />

      {/* KYC & Verification */}
      <Stack.Screen
        name="KYCVerify"
        component={KYCVerificationScreen}
        options={{ title: 'Identity Verification', headerShown: false }}
      />

      {/* Payment Methods */}
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{ title: 'Payment Methods', headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;
