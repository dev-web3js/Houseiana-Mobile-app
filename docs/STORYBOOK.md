# Storybook Documentation

## Overview

Storybook for the Houseiana Mobile App provides comprehensive, interactive documentation for all UI components. It serves as a living style guide that helps developers build consistent interfaces and understand component behavior across different states and configurations.

## 🚀 Quick Start

### Setup and Installation

Storybook is already configured for this project. To run it:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the React Native packager:**
   ```bash
   npm start
   ```

3. **Run on your device/simulator:**
   ```bash
   npm run ios
   # or
   npm run android
   ```

4. **Access Storybook:**
   - The app will load with Storybook interface
   - Navigate through components using the sidebar
   - Use interactive controls to modify component props

### Configuration Files

- **Main config**: `.rnstorybook/main.ts`
- **Stories location**: Components have `.stories.js` files alongside them
- **Metro config**: `metro.config.js` includes Storybook integration

## 📚 Documentation Structure

### Component Stories

Each component has comprehensive stories covering:

#### 1. **Button Component** (`src/components/Button.stories.js`)
- ✅ All variants (primary, secondary, outline, ghost, danger)
- ✅ All sizes (small, medium, large)
- ✅ All states (normal, disabled, loading)
- ✅ Icon positions and combinations
- ✅ Full-width and custom styling
- ✅ Real-world usage examples

**Interactive Controls:**
- `title`: Change button text
- `variant`: Switch between visual styles
- `size`: Adjust button size
- `disabled`: Toggle disabled state
- `loading`: Toggle loading state
- `icon`: Add Material icons
- `fullWidth`: Toggle full-width mode

#### 2. **PropertyCard Component** (`src/components/PropertyCard.stories.js`)
- ✅ Default property display
- ✅ Favorite/unfavorite states
- ✅ Long titles and content overflow
- ✅ Different property types (villa, apartment, etc.)
- ✅ Price range variations
- ✅ Missing data scenarios (no images, no reviews)

**Interactive Controls:**
- `isFavorite`: Toggle favorite state
- `showFavoriteButton`: Show/hide favorite button
- `property`: Modify property data
- Real property data examples from Qatar market

#### 3. **LoadingSpinner Component** (`src/components/LoadingSpinner.stories.js`)
- ✅ Different sizes and colors
- ✅ With and without descriptive text
- ✅ Overlay vs inline modes
- ✅ Different loading contexts

**Interactive Controls:**
- `size`: Change spinner size
- `color`: Customize color
- `text`: Add loading messages
- `overlay`: Toggle overlay mode

#### 4. **PropertyMapView Component** (`src/components/MapView.stories.js`)
- ✅ Multiple properties display
- ✅ Single property focus
- ✅ Selected property highlighting
- ✅ User location integration
- ✅ Search radius visualization
- ✅ Empty states

**Interactive Controls:**
- `showUserLocation`: Toggle user location
- `showPrices`: Toggle price markers
- `searchRadius`: Adjust search radius
- `properties`: Modify property array

#### 5. **Booking Screen Stories**

**BookingScreen** (`src/screens/booking/BookingScreen.stories.js`):
- ✅ Default booking flow
- ✅ Different property types
- ✅ Preselected vs empty dates
- ✅ Price range variations

**BookingConfirmationScreen** (`src/screens/booking/BookingConfirmationScreen.stories.js`):
- ✅ Successful booking confirmation
- ✅ Different stay durations
- ✅ Payment status variations
- ✅ Property type variations

**MyBookingsScreen** (`src/screens/booking/MyBookingsScreen.stories.js`):
- ✅ Default booking list
- ✅ Empty state
- ✅ Loading states
- ✅ Different booking statuses

### Welcome Story

The **Welcome** story (`.rnstorybook/stories/Welcome.stories.js`) provides:
- ✅ Storybook introduction and overview
- ✅ Component categories explanation
- ✅ Qatar market customizations
- ✅ Getting started guide
- ✅ Feature highlights

## 🎯 Component Categories

### Core Components
Essential UI building blocks used throughout the app:
- **Button**: Primary interaction element
- **LoadingSpinner**: Loading states and feedback
- **PropertyCard**: Property display cards

### Map Components
Interactive mapping and location features:
- **PropertyMapView**: Interactive property maps
- **MapScreen**: Full-screen map interface

### Booking Screens
Complete booking workflow screens:
- **BookingScreen**: Property booking interface
- **BookingConfirmationScreen**: Post-booking confirmation
- **MyBookingsScreen**: User booking management

## 🇶🇦 Qatar Market Customization

All components include Qatar-specific features:

### Currency and Localization
- QAR currency formatting with proper symbols
- Arabic numeral support preparation
- Right-to-left layout considerations

### Location Integration
- Default map centered on Doha (25.2854°N, 51.5310°E)
- Pre-configured Qatar locations:
  - The Pearl
  - West Bay
  - Lusail
  - Al Rayyan
  - Al Wakrah
  - Education City
  - Aspire Zone
  - Katara

### Cultural Design
- Appropriate imagery guidelines
- Cultural color preferences
- Local business hours and practices

## 🎨 Design System Integration

### Colors
All components use consistent theming from `src/shared/constants.js`:
```javascript
COLORS = {
  primary: '#2196F3',      // Blue
  secondary: '#FF9800',    // Orange
  success: '#4CAF50',      // Green
  warning: '#FFC107',      // Amber
  error: '#F44336',        // Red
  background: '#FFFFFF',   // White
  surface: '#F5F5F5',     // Light Gray
  text: '#333333',        // Dark Gray
  textSecondary: '#666666' // Medium Gray
}
```

### Typography
Consistent font sizing scale:
- **xs**: 12px - Small labels, captions
- **sm**: 14px - Body text, descriptions
- **md**: 16px - Primary text, buttons
- **lg**: 18px - Section headers
- **xl**: 20px - Page titles
- **2xl**: 24px - Hero text

### Spacing
Standardized spacing values:
- **xs**: 4px - Minimal spacing
- **sm**: 8px - Small gaps
- **md**: 16px - Standard spacing
- **lg**: 24px - Section spacing
- **xl**: 32px - Large spacing

## 🔧 Development Workflow

### Adding New Components

1. **Create Component** (`src/components/ComponentName.js`):
   ```javascript
   import React from 'react';
   import { COLORS, SPACING, FONT_SIZES } from '../shared/constants';
   
   const ComponentName = ({ ...props }) => {
     // Component implementation
   };
   
   export default ComponentName;
   ```

2. **Create Story** (`src/components/ComponentName.stories.js`):
   ```javascript
   import React from 'react';
   import ComponentName from './ComponentName';
   
   const meta = {
     title: 'Components/ComponentName',
     component: ComponentName,
     argTypes: {
       // Define interactive controls
     },
   };
   
   export default meta;
   
   export const Default = {
     args: {
       // Default props
     },
   };
   ```

3. **Export Component** (`src/components/index.js`):
   ```javascript
   export { default as ComponentName } from './ComponentName';
   ```

4. **Document API** (Update `docs/COMPONENTS.md`):
   - Add component documentation
   - Include prop definitions
   - Provide usage examples

### Best Practices

#### Story Writing
- **Comprehensive Coverage**: Include all variants and states
- **Realistic Data**: Use Qatar-specific mock data
- **Interactive Controls**: Make props adjustable
- **Edge Cases**: Test with missing/invalid data
- **Documentation**: Include usage examples and descriptions

#### Component Development
- **Theme Consistency**: Use design system constants
- **Accessibility**: Include proper labels and hints
- **Performance**: Optimize for React Native
- **Error Handling**: Handle missing props gracefully
- **TypeScript Ready**: Prepare for future TypeScript migration

## 📱 Mobile-Specific Features

### Touch Interactions
- Proper touch target sizes (minimum 44x44 points)
- Touch feedback with `activeOpacity`
- Gesture handling for maps and carousels

### Performance Optimizations
- Image lazy loading and caching
- List virtualization for large datasets
- Memoization for expensive calculations
- Optimized re-renders

### Platform Differences
- iOS/Android specific styling
- Safe area handling
- Platform-specific icons and interactions

## 🧪 Testing with Storybook

### Visual Testing
Use stories for visual regression testing:
- Screenshot comparisons
- Cross-platform consistency
- Different screen sizes
- Theme variations

### Interaction Testing
Test component interactions:
- Button presses and callbacks
- Form input handling
- Navigation flows
- Loading states

### Accessibility Testing
Verify accessibility features:
- Screen reader compatibility
- Keyboard navigation
- Color contrast ratios
- Touch target sizes

## 📖 Documentation Files

### Primary Documentation
1. **README.md** - Project overview and setup
2. **STORYBOOK.md** - This file, Storybook guide
3. **COMPONENTS.md** - Detailed component API documentation

### Storybook Files
1. **.rnstorybook/README.md** - Storybook-specific README
2. **.rnstorybook/main.ts** - Storybook configuration
3. **.rnstorybook/stories/Welcome.stories.js** - Welcome page

### Component Stories
- `src/components/*.stories.js` - Component stories
- `src/screens/*/*.stories.js` - Screen component stories

## 🔍 Usage Examples

### Viewing Components
1. Open Storybook in the app
2. Navigate to component category
3. Select specific component
4. Use controls to modify props
5. Observe real-time changes

### Copying Implementation
```javascript
// Example from Button story
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

### Customizing Components
```javascript
// Custom styling example
<Button
  title="Custom Button"
  style={{
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
  }}
  textStyle={{
    fontSize: FONT_SIZES.lg,
  }}
/>
```

## 🔄 Maintenance

### Regular Updates
- Update stories when components change
- Add new stories for new components
- Keep documentation in sync
- Review and update mock data

### Quality Assurance
- Test stories on both iOS and Android
- Verify accessibility features
- Check performance with large datasets
- Validate Qatar-specific features

---

## 📞 Support

For questions about Storybook or component usage:

1. **Check Documentation**: Review component API docs
2. **Explore Stories**: Use interactive controls to understand behavior
3. **Reference Examples**: Copy proven implementation patterns
4. **Test Thoroughly**: Verify components work in your context

---

**Last Updated**: September 2024  
**Storybook Version**: 9.1.5  
**React Native Version**: 0.72.17