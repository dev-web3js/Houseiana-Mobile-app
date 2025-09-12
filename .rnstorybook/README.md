# Houseiana Mobile App - Storybook Documentation

## Overview

This Storybook contains comprehensive documentation and interactive examples for all UI components used in the Houseiana Mobile App. It serves as a living style guide and component library for developers working on the project.

## Getting Started

### Running Storybook

1. Make sure you have all dependencies installed:
   ```bash
   npm install
   ```

2. Start the React Native Metro bundler:
   ```bash
   npm start
   ```

3. Run the app on iOS or Android:
   ```bash
   npm run ios
   # or
   npm run android
   ```

4. The Storybook interface will be available within the app. You can toggle between the main app and Storybook using the configuration.

### Generating Story Lists

To automatically generate the story list file, run:
```bash
npm run storybook-generate
```

## Component Library

### Core Components

#### 1. Button Component
**Location**: `src/components/Button.js`

A flexible, customizable button component that supports multiple variants, sizes, and states.

**Features**:
- Multiple variants: primary, secondary, outline, ghost, danger
- Three sizes: small, medium, large  
- States: normal, disabled, loading
- Icon support with left/right positioning
- Full width option
- Custom styling support

**Usage**:
```jsx
import { Button } from '../components';

<Button
  title="Book Now"
  variant="primary"
  size="large"
  icon="event"
  onPress={handleBooking}
  fullWidth
/>
```

#### 2. PropertyCard Component
**Location**: `src/components/PropertyCard.js`

A comprehensive property display card showing property images, details, pricing, and features.

**Features**:
- Property image with placeholder fallback
- Favorite button with heart icon
- Price badge overlay
- Location display with icon
- Property features (beds, baths, guests)
- Rating and review count
- Responsive layout

**Usage**:
```jsx
import { PropertyCard } from '../components';

<PropertyCard
  property={propertyObject}
  onPress={handlePropertyPress}
  onFavoritePress={handleFavorite}
  isFavorite={false}
  showFavoriteButton={true}
/>
```

#### 3. LoadingSpinner Component  
**Location**: `src/components/LoadingSpinner.js`

A loading indicator component with customizable appearance and optional text.

**Features**:
- Multiple sizes (small, large)
- Custom colors
- Optional loading text
- Overlay mode for full-screen loading
- Custom styling support

**Usage**:
```jsx
import { LoadingSpinner } from '../components';

<LoadingSpinner
  size="large"
  color="#2196F3"
  text="Loading properties..."
  overlay={true}
/>
```

#### 4. PropertyMapView Component
**Location**: `src/components/MapView.js`

An interactive map component for displaying property locations with Google Maps integration.

**Features**:
- Property markers with price display
- User location tracking
- Selected property highlighting
- Search radius visualization
- Property callouts with details
- Qatar-specific default region
- Navigation to property details

**Usage**:
```jsx
import { PropertyMapView } from '../components';

<PropertyMapView
  properties={propertiesArray}
  selectedProperty={selectedProperty}
  showUserLocation={true}
  showPrices={true}
  onPropertyPress={handlePropertyPress}
  searchRadius={10}
/>
```

### Screen Components

#### 1. BookingScreen
**Location**: `src/screens/booking/BookingScreen.js`

Complete booking interface with date selection, guest management, and price calculation.

**Features**:
- Calendar date picker integration
- Dynamic price calculation
- Guest count adjustment
- Booking validation
- Host information display
- Property amenities and policies
- Responsive design

#### 2. BookingConfirmationScreen
**Location**: `src/screens/booking/BookingConfirmationScreen.js`

Post-booking confirmation screen with booking details and next steps.

**Features**:
- Booking reference display
- Property and host information
- Check-in/check-out details
- Payment information
- Contact information
- Navigation to home screen

#### 3. MyBookingsScreen
**Location**: `src/screens/booking/MyBookingsScreen.js`

User's booking management interface showing past, current, and upcoming bookings.

**Features**:
- Booking status filtering
- Booking cards with property details
- Status indicators
- Action buttons (cancel, modify, contact host)
- Empty state handling
- Pull-to-refresh functionality

## Design System

### Colors
The app uses a consistent color scheme defined in `src/shared/constants.js`:

- **Primary**: #2196F3 (Blue)
- **Secondary**: #FF9800 (Orange)
- **Success**: #4CAF50 (Green)
- **Warning**: #FFC107 (Amber)
- **Error**: #F44336 (Red)
- **Background**: #FFFFFF (White)
- **Surface**: #F5F5F5 (Light Gray)
- **Text**: #333333 (Dark Gray)
- **Text Secondary**: #666666 (Medium Gray)

### Typography
Font sizes follow a consistent scale:

- **xs**: 12px
- **sm**: 14px  
- **md**: 16px
- **lg**: 18px
- **xl**: 20px
- **2xl**: 24px

### Spacing
Consistent spacing values:

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px

## Qatar Market Customization

The components are customized for the Qatar market:

- **Currency**: QAR formatting with proper Arabic numerals support
- **Locations**: Pre-configured Qatar locations (The Pearl, West Bay, Lusail, etc.)
- **Map Defaults**: Centered on Doha with appropriate zoom levels
- **Language**: Right-to-left text support preparation
- **Cultural**: Appropriate imagery and content guidelines

## Development Guidelines

### Adding New Components

1. Create the component in `src/components/`
2. Create a corresponding `.stories.js` file
3. Export the component in `src/components/index.js`
4. Document props and usage examples
5. Include interactive controls in stories

### Story Structure

Each story file should include:
- Default story showing basic usage
- Variant stories for different props
- State stories (loading, error, empty)
- Interactive controls for props
- Real-world usage examples

### Best Practices

- Use consistent naming conventions
- Include comprehensive prop documentation
- Provide realistic mock data
- Test different screen sizes
- Consider accessibility
- Follow React Native performance guidelines

## Testing

Stories serve as visual testing for components:
- Verify component rendering across different states
- Test prop variations interactively
- Validate responsive behavior
- Check accessibility compliance
- Ensure consistent styling

## Contributing

When adding new components or modifying existing ones:

1. Update or create corresponding stories
2. Document all props and usage patterns
3. Include edge case scenarios
4. Test on both iOS and Android
5. Update this documentation
6. Follow the established design system

## Resources

- [React Native Documentation](https://reactnative.dev/)
- [Storybook for React Native](https://storybook.js.org/docs/react-native)
- [Material Design Icons](https://materialdesignicons.com/)
- [React Navigation](https://reactnavigation.org/)

---

This documentation is automatically updated with each component addition or modification. For questions or contributions, please refer to the project's main README.md file.