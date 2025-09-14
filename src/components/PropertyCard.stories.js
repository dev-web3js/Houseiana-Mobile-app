import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import PropertyCard from './PropertyCard';

// Mock property data for stories
const mockProperty = {
  id: '1',
  title: 'Luxury Villa in The Pearl',
  description: 'Beautiful luxury villa with stunning sea views',
  price: 850,
  area: 'The Pearl',
  city: 'Doha',
  latitude: 25.37,
  longitude: 51.5373,
  bedrooms: 4,
  bathrooms: 3,
  guests: 8,
  rating: 4.9,
  reviewCount: 89,
  images: [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558618047-b9d20b0fbc83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  ],
};

const meta = {
  title: 'Components/PropertyCard',
  component: PropertyCard,
  decorators: [
    (Story) => (
      <View style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    isFavorite: {
      control: 'boolean',
      description: 'Whether the property is marked as favorite',
      defaultValue: false,
    },
    showFavoriteButton: {
      control: 'boolean',
      description: 'Show or hide the favorite button',
      defaultValue: true,
    },
    onPress: {
      action: 'property-pressed',
      description: 'Called when the card is pressed',
    },
    onFavoritePress: {
      action: 'favorite-pressed',
      description: 'Called when the favorite button is pressed',
    },
  },
  args: {
    property: mockProperty,
    onPress: action('property-pressed'),
    onFavoritePress: action('favorite-pressed'),
  },
};

export default meta;

// Default property card story
export const Default = {
  args: {
    property: mockProperty,
    isFavorite: false,
    showFavoriteButton: true,
  },
};

// Property card marked as favorite
export const Favorite = {
  args: {
    property: mockProperty,
    isFavorite: true,
    showFavoriteButton: true,
  },
};

// Property card without favorite button
export const NoFavoriteButton = {
  args: {
    property: mockProperty,
    isFavorite: false,
    showFavoriteButton: false,
  },
};

// Property card with long title
export const LongTitle = {
  args: {
    property: {
      ...mockProperty,
      title:
        'Extremely Luxurious and Spacious Villa with Amazing Sea Views and Premium Amenities in The Pearl Qatar',
    },
    isFavorite: false,
  },
};

// Apartment property card
export const Apartment = {
  args: {
    property: {
      ...mockProperty,
      id: '2',
      title: 'Modern Apartment in West Bay',
      price: 450,
      area: 'West Bay',
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      rating: 4.6,
      reviewCount: 45,
    },
    isFavorite: false,
  },
};

// Property card with no image
export const NoImage = {
  args: {
    property: {
      ...mockProperty,
      images: [],
    },
    isFavorite: false,
  },
};

// Property card with minimal data
export const MinimalData = {
  args: {
    property: {
      id: '3',
      title: 'Simple Room',
      price: 200,
      area: 'Al Rayyan',
      city: 'Doha',
      images: [
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      ],
    },
    isFavorite: false,
  },
};

// High-end property card
export const HighEnd = {
  args: {
    property: {
      ...mockProperty,
      id: '4',
      title: 'Presidential Suite at Four Seasons',
      price: 2500,
      area: 'West Bay',
      bedrooms: 3,
      bathrooms: 4,
      guests: 6,
      rating: 5.0,
      reviewCount: 23,
    },
    isFavorite: true,
  },
};

// Property with no reviews
export const NoReviews = {
  args: {
    property: {
      ...mockProperty,
      rating: null,
      reviewCount: 0,
    },
    isFavorite: false,
  },
};
