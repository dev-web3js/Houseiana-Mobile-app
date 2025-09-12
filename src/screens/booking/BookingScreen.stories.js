import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BookingScreen from './BookingScreen';

// Mock property data for stories
const mockProperty = {
  id: '1',
  title: 'Luxury Villa in The Pearl',
  description: 'Beautiful luxury villa with stunning sea views in The Pearl-Qatar',
  price: 850,
  area: 'The Pearl',
  city: 'Doha',
  latitude: 25.3700,
  longitude: 51.5373,
  bedrooms: 4,
  bathrooms: 3,
  guests: 8,
  amenities: ['WiFi', 'Pool', 'Parking', 'Kitchen', 'AC'],
  images: [
    'https://example.com/villa1.jpg',
    'https://example.com/villa2.jpg',
  ],
  host: {
    id: 'host1',
    name: 'Ahmad Al-Rashid',
    avatar: 'https://example.com/host.jpg',
    rating: 4.8,
    reviewCount: 127,
  },
  rating: 4.9,
  reviewCount: 89,
  policies: {
    checkIn: '15:00',
    checkOut: '11:00',
    cancellation: 'Free cancellation until 24 hours before check-in',
  },
};

// Mock navigation object
const mockNavigation = {
  navigate: (screen, params) => {
    console.log('Navigate to:', screen, params);
  },
  goBack: () => {
    console.log('Navigate back');
  },
};

// Mock route object
const mockRoute = {
  params: {
    property: mockProperty,
    preselectedDates: {
      checkIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      checkOut: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    },
  },
};

const meta = {
  title: 'Screens/Booking/BookingScreen',
  component: BookingScreen,
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
  args: {
    navigation: mockNavigation,
    route: mockRoute,
  },
};

export default meta;

// Default booking screen story
export const Default = {
  args: {
    navigation: mockNavigation,
    route: mockRoute,
  },
};

// Booking screen without preselected dates
export const NoPreselectedDates = {
  args: {
    navigation: mockNavigation,
    route: {
      params: {
        property: mockProperty,
      },
    },
  },
};

// Booking screen with different property
export const DifferentProperty = {
  args: {
    navigation: mockNavigation,
    route: {
      params: {
        property: {
          ...mockProperty,
          id: '2',
          title: 'Modern Apartment in West Bay',
          price: 450,
          area: 'West Bay',
          bedrooms: 2,
          bathrooms: 2,
          guests: 4,
        },
      },
    },
  },
};

// Booking screen for expensive property
export const ExpensiveProperty = {
  args: {
    navigation: mockNavigation,
    route: {
      params: {
        property: {
          ...mockProperty,
          id: '3',
          title: 'Presidential Suite in Four Seasons',
          price: 2500,
          area: 'West Bay',
          bedrooms: 3,
          bathrooms: 4,
          guests: 6,
        },
      },
    },
  },
};