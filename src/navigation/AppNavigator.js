import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {useAuth} from '../auth/AuthContext';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';
import EnhancedHomeScreen from '../screens/home/EnhancedHomeScreen';
import PropertiesScreen from '../screens/properties/PropertiesScreen';
import AdvancedSearchScreen from '../screens/search/AdvancedSearchScreen';
import PropertyDetailScreen from '../screens/properties/PropertyDetailScreen';
import FavoritesScreen from '../screens/properties/FavoritesScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import HostDashboardScreen from '../screens/host/HostDashboardScreen';
import AddPropertyScreen from '../screens/host/AddPropertyScreen';
import MyPropertiesScreen from '../screens/host/MyPropertiesScreen';
import BookingsScreen from '../screens/host/BookingsScreen';

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
      <Stack.Screen
        name="PropertyDetail"
        component={PropertyDetailScreen}
        options={{title: 'Property Details'}}
      />
      <Stack.Screen
        name="HostDashboard"
        component={HostDashboardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddProperty"
        component={AddPropertyScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyProperties"
        component={MyPropertiesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{headerShown: false}}
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