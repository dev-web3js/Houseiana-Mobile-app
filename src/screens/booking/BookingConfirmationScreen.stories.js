import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BookingConfirmationScreen from './BookingConfirmationScreen';

// Mock booking data for stories
const mockBooking = {
  id: 'booking123',
  property: {
    id: '1',
    title: 'Luxury Villa in The Pearl',
    area: 'The Pearl',
    city: 'Doha',
    images: ['https://example.com/villa1.jpg'],
    host: {
      name: 'Ahmad Al-Rashid',
      phone: '+974 5555 1234',
    },
  },
  checkIn: '2024-12-20',
  checkOut: '2024-12-25',
  guests: 4,
  totalPrice: 4250,
  fees: {
    cleaning: 150,
    service: 300,
    taxes: 200,
  },
  status: 'confirmed',
  bookingReference: 'HSN-2024-001234',
  paymentMethod: 'Credit Card ending in 4567',
  guest: {
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+974 3333 5678',
  },
  createdAt: '2024-12-15T10:30:00Z',
};

// Mock navigation object
const mockNavigation = {
  navigate: (screen, params) => {
    console.log('Navigate to:', screen, params);
  },
  goBack: () => {
    console.log('Navigate back');
  },
  reset: (config) => {
    console.log('Reset navigation:', config);
  },
};

// Mock route object
const mockRoute = {
  params: {
    booking: mockBooking,
  },
};

const meta = {
  title: 'Screens/Booking/BookingConfirmationScreen',
  component: BookingConfirmationScreen,
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

// Default confirmation screen story
export const Default = {
  args: {
    navigation: mockNavigation,
    route: mockRoute,
  },
};

// Confirmation for a short stay
export const ShortStay = {
  args: {
    navigation: mockNavigation,
    route: {
      params: {
        booking: {
          ...mockBooking,
          id: 'booking124',
          checkIn: '2024-12-20',
          checkOut: '2024-12-22', // 2 nights
          totalPrice: 1700,
          fees: {
            cleaning: 150,
            service: 120,
            taxes: 80,
          },
          bookingReference: 'HSN-2024-001235',
        },
      },
    },
  },
};

// Confirmation for a long stay
export const LongStay = {
  args: {
    navigation: mockNavigation,
    route: {
      params: {
        booking: {
          ...mockBooking,
          id: 'booking125',
          checkIn: '2024-12-15',
          checkOut: '2024-12-30', // 15 nights
          totalPrice: 12750,
          fees: {
            cleaning: 200,
            service: 900,
            taxes: 600,
          },
          bookingReference: 'HSN-2024-001236',
        },
      },
    },
  },
};

// Confirmation for different property type
export const ApartmentBooking = {
  args: {
    navigation: mockNavigation,
    route: {
      params: {
        booking: {
          ...mockBooking,
          id: 'booking126',
          property: {
            ...mockBooking.property,
            id: '2',
            title: 'Modern Apartment in West Bay',
            area: 'West Bay',
          },
          totalPrice: 2250,
          fees: {
            cleaning: 100,
            service: 150,
            taxes: 100,
          },
          bookingReference: 'HSN-2024-001237',
        },
      },
    },
  },
};

// Confirmation with pending payment status
export const PendingPayment = {
  args: {
    navigation: mockNavigation,
    route: {
      params: {
        booking: {
          ...mockBooking,
          id: 'booking127',
          status: 'pending_payment',
          paymentMethod: 'Bank Transfer (Pending)',
          bookingReference: 'HSN-2024-001238',
        },
      },
    },
  },
};