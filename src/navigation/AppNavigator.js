import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useAuth} from '../auth/AuthContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

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

// Profile Screen
import ProfileScreen from '../screens/profile/ProfileScreen';

// Host Screens
import HostDashboardScreen from '../screens/host/HostDashboardScreen';
import AddPropertyScreen from '../screens/host/AddPropertyScreen';
import MyPropertiesScreen from '../screens/host/MyPropertiesScreen';
import BookingsScreen from '../screens/host/BookingsScreen';

// Map Screen
import MapScreen from '../screens/properties/MapScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Properties') {
            iconName = 'search';
          } else if (route.name === 'MyBookings') {
            iconName = 'event-note';
          } else if (route.name === 'Favorites') {
            iconName = 'favorite';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={EnhancedHomeScreen} />
      <Tab.Screen name="Properties" component={AdvancedSearchScreen} />
      <Tab.Screen name="MyBookings" component={MyBookingsScreen} options={{title: 'My Trips'}} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
      
      {/* Property Related Screens */}
      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetailScreen}
        options={{title: 'Property Details'}}
      />
      
      {/* Booking Related Screens */}
      <Stack.Screen
        name="Booking"
        component={BookingScreen}
        options={{title: 'Book Property'}}
      />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmationScreen}
        options={{title: 'Booking Confirmed', headerLeft: null}}
      />
      
      {/* Map Screen */}
      <Stack.Screen
        name="PropertyMap"
        component={MapScreen}
        options={{title: 'Map View'}}
      />
      
      {/* Host Dashboard Screens */}
      <Stack.Screen
        name="HostDashboard"
        component={HostDashboardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddProperty"
        component={AddPropertyScreen}
        options={{title: 'Add Property'}}
      />
      <Stack.Screen
        name="MyProperties"
        component={MyPropertiesScreen}
        options={{title: 'My Properties'}}
      />
      <Stack.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{title: 'Manage Bookings'}}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const {isAuthenticated, loading} = useAuth();

  if (loading) {
    return null;
  }

  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
};

export default AppNavigator;