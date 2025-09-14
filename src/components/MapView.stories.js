import React from 'react';
import { View } from 'react-native';
import PropertyMapView from './MapView';

// Mock property data for stories
const mockProperties = [
  {
    id: '1',
    title: 'Luxury Villa in The Pearl',
    latitude: 25.37,
    longitude: 51.5373,
    price: 850,
    area: 'The Pearl',
    city: 'Doha',
    images: ['https://example.com/image1.jpg'],
  },
  {
    id: '2',
    title: 'Modern Apartment in West Bay',
    latitude: 25.3208,
    longitude: 51.5127,
    price: 650,
    area: 'West Bay',
    city: 'Doha',
    images: ['https://example.com/image2.jpg'],
  },
  {
    id: '3',
    title: 'Spacious Home in Lusail',
    latitude: 25.4378,
    longitude: 51.4911,
    price: 1200,
    area: 'Lusail',
    city: 'Lusail',
    images: ['https://example.com/image3.jpg'],
  },
];

const meta = {
  title: 'Components/PropertyMapView',
  component: PropertyMapView,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, height: 400 }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    showUserLocation: {
      control: 'boolean',
      description: 'Show user location on map',
      defaultValue: true,
    },
    showPrices: {
      control: 'boolean',
      description: 'Display property prices on markers',
      defaultValue: true,
    },
    searchRadius: {
      control: { type: 'number', min: 1, max: 50, step: 1 },
      description: 'Search radius in kilometers',
    },
  },
  args: {
    properties: mockProperties,
    showUserLocation: true,
    showPrices: true,
  },
};

export default meta;

// Default story with multiple properties
export const Default = {
  args: {
    properties: mockProperties,
    selectedProperty: null,
  },
};

// Story with a selected property
export const WithSelectedProperty = {
  args: {
    properties: mockProperties,
    selectedProperty: mockProperties[0],
  },
};

// Story with single property
export const SingleProperty = {
  args: {
    properties: [mockProperties[0]],
    selectedProperty: null,
  },
};

// Story without user location
export const NoUserLocation = {
  args: {
    properties: mockProperties,
    showUserLocation: false,
    selectedProperty: null,
  },
};

// Story without price display
export const NoPrices = {
  args: {
    properties: mockProperties,
    showPrices: false,
    selectedProperty: null,
  },
};

// Story with search radius
export const WithSearchRadius = {
  args: {
    properties: mockProperties,
    searchRadius: 10,
    selectedProperty: null,
  },
};

// Story with custom initial region
export const CustomRegion = {
  args: {
    properties: mockProperties,
    initialRegion: {
      latitude: 25.2854,
      longitude: 51.531,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    },
    selectedProperty: null,
  },
};

// Empty map story
export const EmptyMap = {
  args: {
    properties: [],
    selectedProperty: null,
  },
};
