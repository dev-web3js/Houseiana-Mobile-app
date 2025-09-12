import React from 'react';
import {View} from 'react-native';
import {action} from '@storybook/addon-actions';
import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <View style={{padding: 20, backgroundColor: '#f5f5f5'}}>
        <Story />
      </View>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Button text content',
      defaultValue: 'Button',
    },
    variant: {
      control: {type: 'select'},
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'Button visual style variant',
      defaultValue: 'primary',
    },
    size: {
      control: {type: 'select'},
      options: ['small', 'medium', 'large'],
      description: 'Button size',
      defaultValue: 'medium',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      defaultValue: false,
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button takes full width',
      defaultValue: false,
    },
    icon: {
      control: 'text',
      description: 'Material icon name to display',
    },
    iconPosition: {
      control: {type: 'select'},
      options: ['left', 'right'],
      description: 'Position of the icon',
      defaultValue: 'left',
    },
    onPress: {
      action: 'button-pressed',
      description: 'Called when button is pressed',
    },
  },
  args: {
    title: 'Button',
    onPress: action('button-pressed'),
  },
};

export default meta;

// Default button story
export const Default = {
  args: {
    title: 'Book Now',
  },
};

// Button variants
export const Primary = {
  args: {
    title: 'Book Now',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    title: 'Learn More',
    variant: 'secondary',
  },
};

export const Outline = {
  args: {
    title: 'View Details',
    variant: 'outline',
  },
};

export const Ghost = {
  args: {
    title: 'Skip',
    variant: 'ghost',
  },
};

export const Danger = {
  args: {
    title: 'Delete',
    variant: 'danger',
  },
};

// Button sizes
export const Small = {
  args: {
    title: 'Small Button',
    size: 'small',
  },
};

export const Medium = {
  args: {
    title: 'Medium Button',
    size: 'medium',
  },
};

export const Large = {
  args: {
    title: 'Large Button',
    size: 'large',
  },
};

// Button states
export const Disabled = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
};

export const Loading = {
  args: {
    title: 'Book Now',
    loading: true,
  },
};

// Button with icons
export const WithLeftIcon = {
  args: {
    title: 'Add to Favorites',
    icon: 'favorite',
    iconPosition: 'left',
  },
};

export const WithRightIcon = {
  args: {
    title: 'Continue',
    icon: 'arrow-forward',
    iconPosition: 'right',
  },
};

// Full width button
export const FullWidth = {
  args: {
    title: 'Continue to Payment',
    fullWidth: true,
  },
};

// Common use cases
export const BookingButton = {
  args: {
    title: 'Confirm Booking',
    variant: 'primary',
    size: 'large',
    icon: 'event',
    fullWidth: true,
  },
};

export const CancelButton = {
  args: {
    title: 'Cancel Booking',
    variant: 'danger',
    size: 'medium',
    icon: 'cancel',
  },
};

export const FilterButton = {
  args: {
    title: 'Apply Filters',
    variant: 'outline',
    size: 'medium',
    icon: 'filter-list',
  },
};

export const ShareButton = {
  args: {
    title: 'Share',
    variant: 'ghost',
    size: 'small',
    icon: 'share',
  },
};