import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyBookingsScreen from './MyBookingsScreen';

// Mock navigation object
const mockNavigation = {
  navigate: (screen, params) => {
    console.log('Navigate to:', screen, params);
  },
  goBack: () => {
    console.log('Navigate back');
  },
  setOptions: (options) => {
    console.log('Set navigation options:', options);
  },
};

const meta = {
  title: 'Screens/Booking/MyBookingsScreen',
  component: MyBookingsScreen,
  decorators: [
    (Story) => (
      <NavigationContainer>
        <Story />
      </NavigationContainer>
    ),
  ],
  args: {
    navigation: mockNavigation,
  },
};

export default meta;

// Default my bookings screen story
export const Default = {
  args: {
    navigation: mockNavigation,
  },
};

// Story showing different booking states
export const WithMockData = {
  args: {
    navigation: mockNavigation,
  },
  // This story would show the screen with sample booking data loaded
  // The actual data loading happens within the component
};

// Story for empty bookings state
export const EmptyState = {
  args: {
    navigation: mockNavigation,
  },
  // This represents the state when user has no bookings
};

// Story for loading state
export const LoadingState = {
  args: {
    navigation: mockNavigation,
  },
  // This represents the loading state when fetching bookings
};
