import React from 'react';
import { View } from 'react-native';
import LoadingSpinner from './LoadingSpinner';
import { COLORS } from '../shared/constants';

const meta = {
  title: 'Components/LoadingSpinner',
  component: LoadingSpinner,
  decorators: [
    (Story) => (
      <View style={{ flex: 1, height: 200, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'large'],
      description: 'Size of the activity indicator',
      defaultValue: 'large',
    },
    color: {
      control: 'color',
      description: 'Color of the spinner and text',
      defaultValue: COLORS.primary,
    },
    text: {
      control: 'text',
      description: 'Optional loading text to display',
    },
    overlay: {
      control: 'boolean',
      description: 'Whether to show as an overlay',
      defaultValue: false,
    },
  },
  args: {
    size: 'large',
    color: COLORS.primary,
  },
};

export default meta;

// Default loading spinner
export const Default = {
  args: {
    size: 'large',
    color: COLORS.primary,
  },
};

// Small spinner
export const Small = {
  args: {
    size: 'small',
    color: COLORS.primary,
  },
};

// Spinner with text
export const WithText = {
  args: {
    size: 'large',
    color: COLORS.primary,
    text: 'Loading properties...',
  },
};

// Spinner with different color
export const SecondaryColor = {
  args: {
    size: 'large',
    color: COLORS.secondary,
    text: 'Please wait...',
  },
};

// Error state color
export const ErrorColor = {
  args: {
    size: 'large',
    color: COLORS.error,
    text: 'Retrying...',
  },
};

// Success state color
export const SuccessColor = {
  args: {
    size: 'large',
    color: COLORS.success,
    text: 'Almost done...',
  },
};

// Overlay spinner
export const Overlay = {
  args: {
    size: 'large',
    color: COLORS.primary,
    text: 'Processing booking...',
    overlay: true,
  },
};

// Loading different content
export const LoadingBookings = {
  args: {
    size: 'large',
    color: COLORS.primary,
    text: 'Loading your bookings...',
  },
};

export const LoadingSearch = {
  args: {
    size: 'small',
    color: COLORS.primary,
    text: 'Searching properties...',
  },
};
