# Component API Documentation

This document provides detailed API documentation for all reusable components in the Houseiana Mobile App.

## Table of Contents

- [Button Component](#button-component)
- [PropertyCard Component](#propertycard-component)
- [LoadingSpinner Component](#loadingspinner-component)
- [PropertyMapView Component](#propertymapview-component)

---

## Button Component

**File**: `src/components/Button.js`

A versatile button component that supports multiple visual variants, sizes, and interactive states.

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `title` | `string` | - | ✅ | The text displayed on the button |
| `onPress` | `function` | - | ✅ | Function called when button is pressed |
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | ❌ | Visual style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | ❌ | Button size |
| `disabled` | `boolean` | `false` | ❌ | Whether the button is disabled |
| `loading` | `boolean` | `false` | ❌ | Whether to show loading state |
| `icon` | `string` | `null` | ❌ | Material icon name to display |
| `iconPosition` | `'left' \| 'right'` | `'left'` | ❌ | Position of the icon |
| `fullWidth` | `boolean` | `false` | ❌ | Whether button takes full container width |
| `style` | `ViewStyle` | `{}` | ❌ | Additional button styling |
| `textStyle` | `TextStyle` | `{}` | ❌ | Additional text styling |

### Variants

- **primary**: Solid blue background (default)
- **secondary**: Solid orange background  
- **outline**: Transparent with blue border
- **ghost**: Transparent with no border
- **danger**: Solid red background for destructive actions

### Sizes

- **small**: 32px height, small padding
- **medium**: 44px height, medium padding (default)
- **large**: 52px height, large padding

### Example Usage

```jsx
import { Button } from '../components';

// Basic usage
<Button title="Book Now" onPress={handleBooking} />

// With icon and full width
<Button
  title="Confirm Booking"
  variant="primary"
  size="large"
  icon="event"
  fullWidth
  onPress={handleConfirm}
/>

// Danger variant for destructive actions
<Button
  title="Delete"
  variant="danger"
  icon="delete"
  onPress={handleDelete}
/>

// Loading state
<Button
  title="Processing..."
  loading={true}
  disabled={true}
/>
```

---

## PropertyCard Component

**File**: `src/components/PropertyCard.js`

A comprehensive card component for displaying property information including images, details, pricing, and interactive elements.

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `property` | `PropertyObject` | - | ✅ | Property data object |
| `onPress` | `function` | - | ❌ | Function called when card is pressed |
| `onFavoritePress` | `function` | - | ❌ | Function called when favorite button is pressed |
| `isFavorite` | `boolean` | `false` | ❌ | Whether property is marked as favorite |
| `showFavoriteButton` | `boolean` | `true` | ❌ | Whether to show the favorite button |
| `style` | `ViewStyle` | `{}` | ❌ | Additional card styling |

### PropertyObject Structure

```typescript
interface PropertyObject {
  id: string;
  title: string;
  price: number;
  area: string;
  city: string;
  images?: string[];
  bedrooms?: number;
  bathrooms?: number;
  guests?: number;
  rating?: number;
  reviewCount?: number;
  latitude?: number;
  longitude?: number;
}
```

### Features

- Responsive image display with placeholder fallback
- Favorite button with heart icon animation
- Price badge with QAR currency formatting
- Location display with map pin icon
- Property features (beds, bathrooms, guest capacity)
- Star rating with review count
- Touch feedback and press animations

### Example Usage

```jsx
import { PropertyCard } from '../components';

const property = {
  id: '1',
  title: 'Luxury Villa in The Pearl',
  price: 850,
  area: 'The Pearl',
  city: 'Doha',
  images: ['https://example.com/villa.jpg'],
  bedrooms: 4,
  bathrooms: 3,
  guests: 8,
  rating: 4.9,
  reviewCount: 89,
};

<PropertyCard
  property={property}
  onPress={(property) => navigation.navigate('PropertyDetail', {property})}
  onFavoritePress={(property) => toggleFavorite(property.id)}
  isFavorite={favoriteIds.includes(property.id)}
/>
```

---

## LoadingSpinner Component

**File**: `src/components/LoadingSpinner.js`

A loading indicator component with customizable appearance and optional descriptive text.

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `size` | `'small' \| 'large'` | `'large'` | ❌ | Size of the activity indicator |
| `color` | `string` | `COLORS.primary` | ❌ | Color of the spinner and text |
| `text` | `string` | `null` | ❌ | Optional descriptive text |
| `overlay` | `boolean` | `false` | ❌ | Whether to show as full-screen overlay |
| `style` | `ViewStyle` | `{}` | ❌ | Additional styling |

### Features

- Native ActivityIndicator with consistent styling
- Optional descriptive text below spinner
- Overlay mode for full-screen loading states
- Customizable colors matching app theme
- Automatic text color matching

### Example Usage

```jsx
import { LoadingSpinner } from '../components';

// Basic loading spinner
<LoadingSpinner />

// With descriptive text
<LoadingSpinner
  text="Loading properties..."
  color="#2196F3"
/>

// Full-screen overlay
<LoadingSpinner
  overlay={true}
  text="Processing booking..."
  size="large"
/>

// Small inline spinner
<LoadingSpinner
  size="small"
  text="Searching..."
/>
```

---

## PropertyMapView Component

**File**: `src/components/MapView.js`

An interactive map component for displaying property locations using Google Maps with Qatar-specific optimizations.

### Props

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `properties` | `PropertyObject[]` | `[]` | ❌ | Array of properties to display |
| `selectedProperty` | `PropertyObject` | `null` | ❌ | Currently selected property |
| `showUserLocation` | `boolean` | `true` | ❌ | Whether to show user's location |
| `showPrices` | `boolean` | `true` | ❌ | Whether to show price on markers |
| `onPropertyPress` | `function` | `null` | ❌ | Function called when property marker is pressed |
| `onLocationPress` | `function` | `null` | ❌ | Function called when user location is pressed |
| `style` | `ViewStyle` | `{}` | ❌ | Additional map container styling |
| `initialRegion` | `RegionObject` | `null` | ❌ | Initial map region |
| `searchRadius` | `number` | `null` | ❌ | Search radius in kilometers |

### RegionObject Structure

```typescript
interface RegionObject {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
```

### Features

- Google Maps integration with React Native Maps
- Property markers with custom price badges
- User location marker with blue dot
- Selected property highlighting
- Search radius visualization
- Property callouts with details and directions
- Qatar-centered default region (Doha)
- Automatic region fitting for multiple properties
- My Location button with GPS integration

### Qatar-Specific Features

- Default region centered on Doha (25.2854°N, 51.5310°E)
- Pre-configured Qatar locations for fallback
- QAR currency formatting in price displays
- Optimized for Qatar's geographic bounds

### Example Usage

```jsx
import { PropertyMapView } from '../components';

// Basic map with properties
<PropertyMapView
  properties={propertiesArray}
  onPropertyPress={(property) => {
    navigation.navigate('PropertyDetail', {property});
  }}
/>

// Map with selected property and search radius
<PropertyMapView
  properties={propertiesArray}
  selectedProperty={selectedProperty}
  searchRadius={10}
  showUserLocation={true}
  onLocationPress={(location) => {
    console.log('User location:', location);
  }}
/>

// Custom initial region
<PropertyMapView
  properties={propertiesArray}
  initialRegion={{
    latitude: 25.3700,
    longitude: 51.5373,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }}
  showPrices={false}
/>
```

### Required Permissions

The component requires location permissions for user location features:

**iOS** (`Info.plist`):
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs access to location to show nearby properties.</string>
```

**Android** (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

---

## Common Patterns

### Error Handling

All components include proper error handling:

```jsx
// Property card with fallback image
<PropertyCard
  property={{...property, images: []}} // Will show placeholder
/>

// Map with empty properties array
<PropertyMapView
  properties={[]} // Will show default Qatar region
/>

// Button in error state
<Button
  title="Try Again"
  variant="danger"
  onPress={handleRetry}
/>
```

### Loading States

Components support loading states:

```jsx
// Loading button
<Button title="Booking..." loading={true} />

// Loading overlay
{isLoading && (
  <LoadingSpinner
    overlay={true}
    text="Processing your request..."
  />
)}
```

### Responsive Design

All components are responsive and work across different screen sizes:

```jsx
// Full-width buttons on mobile
<Button title="Continue" fullWidth />

// Responsive property cards
<PropertyCard style={{maxWidth: screenWidth > 600 ? 300 : '100%'}} />
```

---

## Styling Guidelines

### Theme Integration

All components use the app's theme constants:

```jsx
import { COLORS, SPACING, FONT_SIZES } from '../shared/constants';

// Custom styling that maintains theme consistency
<Button
  style={{
    backgroundColor: COLORS.secondary,
    marginVertical: SPACING.md,
  }}
  textStyle={{
    fontSize: FONT_SIZES.lg,
  }}
/>
```

### Customization

Components accept style props for customization:

```jsx
// Custom button with rounded corners
<Button
  title="Custom Button"
  style={{
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }}
/>

// Custom property card with different spacing
<PropertyCard
  property={property}
  style={{
    marginHorizontal: SPACING.lg,
    borderRadius: 15,
  }}
/>
```

---

## Accessibility

Components include accessibility features:

- Proper `accessibilityLabel` and `accessibilityHint`
- Screen reader support
- Touch target sizes meeting accessibility guidelines (44x44 minimum)
- High contrast support
- Keyboard navigation support where applicable

### Example Accessibility Usage

```jsx
<Button
  title="Book Now"
  accessibilityLabel="Book this property"
  accessibilityHint="Navigate to booking screen"
  onPress={handleBooking}
/>

<PropertyCard
  property={property}
  accessibilityLabel={`Property: ${property.title}, ${property.price} QAR per night`}
  accessibilityRole="button"
/>
```

---

## Performance Considerations

- Images in PropertyCard use lazy loading
- Maps use marker clustering for large property sets
- Loading states prevent multiple simultaneous actions
- Memoization used for expensive calculations
- Optimized re-renders with React.memo where appropriate

---

This documentation is maintained alongside the component implementations. For the most up-to-date examples and interactive documentation, refer to the Storybook interface.