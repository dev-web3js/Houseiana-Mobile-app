# 🚀 How to Run Storybook - Houseiana Mobile App

## Quick Start Guide

### 1. **Set Storybook Mode**
Edit `index.js` in the project root:

```javascript
// Toggle between main app and Storybook
// Set to true to view Storybook, false for main app
const SHOW_STORYBOOK = true;  // ← Change this to true
```

### 2. **Start Metro Bundler**
```bash
npm start
```

### 3. **Launch on Device/Simulator**
```bash
# For iOS (requires Xcode)
npm run ios

# For Android (requires Android Studio)
npm run android

# For Expo (if using Expo)
expo start
```

### 4. **Explore Storybook**
- Navigate through component categories in the sidebar
- Select stories to see components in action
- Use interactive controls to modify props
- View code examples and documentation

---

## 📱 What You'll See

### **Storybook Interface**
```
┌─────────────────────────────────────────────┐
│ ☰ Storybook          Houseiana Mobile   📱 │
├─────────┬───────────────────────────────────┤
│ Welcome │  🏠  Houseiana Mobile             │
│         │      Component Library            │
│ 🔧 Core │                                   │
│ ├Button │  📖 Welcome to Storybook          │
│ ├Loader │                                   │
│ └Card   │  Explore and interact with all    │
│         │  UI components...                 │
│ 🗺️ Maps │                                   │
│ ├MapView│  ✅ Interactive playground        │
│ └Screen │  ✅ Real-time prop editing        │
│         │  ✅ Qatar market features         │
│ 📱 Book │                                   │
│ ├Book   │  🇶🇦 Qatar Customization:        │
│ ├Confirm│  • QAR currency formatting        │
│ └Trips  │  • Local areas integration        │
└─────────┴───────────────────────────────────┘
```

### **Component Stories Available**

#### 🔧 **Core Components**
- **Button**: 17+ interactive stories
  - All variants (primary, secondary, outline, ghost, danger)
  - All sizes (small, medium, large)  
  - States (normal, disabled, loading)
  - With icons (left/right positioning)
  - Real-world examples (booking, cancel, filter buttons)

- **PropertyCard**: 9+ property display stories
  - Qatar properties (The Pearl, West Bay, Lusail)
  - Favorite/unfavorite states
  - Different property types and price ranges
  - Edge cases (long titles, no images, no reviews)

- **LoadingSpinner**: 8+ loading states
  - Different sizes and colors
  - With/without descriptive text
  - Overlay vs inline modes
  - Context-specific loading messages

#### 🗺️ **Map Components** 
- **PropertyMapView**: 8+ interactive map stories
  - Multiple property markers with prices
  - User location integration
  - Selected property highlighting
  - Search radius visualization
  - Qatar-centered default region

#### 📱 **Booking Screens**
- **BookingScreen**: Complete booking workflow
- **BookingConfirmationScreen**: Post-booking details
- **MyBookingsScreen**: Booking management interface

---

## 🎛️ **Interactive Controls**

### **Real-time Prop Editing**
Each component story includes controls to modify:

```
Controls Panel:
┌─────────────────────────────────┐
│ Title: [Book Now        ]       │
│ Variant: [Primary ▼]           │
│ Size: [Medium ▼]               │
│ ☐ Disabled                     │
│ ☐ Loading                      │
│ ☐ Full Width                   │
│ Icon: [event        ]          │
│ Position: [Left ▼]             │
└─────────────────────────────────┘
```

### **Live Code Examples**
Each story shows implementation code:

```jsx
<Button
  title="Book Now"
  variant="primary"
  size="medium"
  icon="event"
  onPress={handlePress}
/>
```

---

## 🇶🇦 **Qatar Market Features in Storybook**

### **Currency & Localization**
- All prices display in QAR format
- Arabic numeral support preparation
- Right-to-left layout considerations

### **Local Properties & Locations**
Interactive maps show:
- **The Pearl**: Luxury villa at 25.3700°N, 51.5373°E
- **West Bay**: Modern apartment at 25.3208°N, 51.5127°E  
- **Lusail**: Spacious home at 25.4378°N, 51.4911°E
- **Al Rayyan**: Various property types
- **Doha Downtown**: Central locations

### **Cultural Design Elements**
- Qatar-appropriate imagery
- Local business hours integration
- Cultural color preferences
- Traditional and modern architecture styles

---

## 🔧 **Development Workflow**

### **Using Storybook for Development**
1. **Component Testing**: Test all component states and variants
2. **Prop Validation**: Ensure props work correctly with controls
3. **Visual Testing**: Check appearance across different configurations
4. **Code Reference**: Copy working examples for implementation
5. **Documentation**: Read comprehensive API docs for each component

### **Adding New Stories**
When you create new components:
1. Create `.stories.js` file alongside component
2. Include comprehensive prop controls
3. Add realistic Qatar market data
4. Test edge cases and error states
5. Document usage examples

---

## 📚 **Documentation Access**

While in Storybook, you can access:

### **Component API Documentation**
- Detailed prop definitions
- TypeScript-style interfaces
- Usage examples and best practices
- Accessibility guidelines
- Performance considerations

### **Design System Integration**
- Color palette with hex codes
- Typography scale (xs to 2xl)
- Spacing system (xs to xl)  
- Component styling guidelines

### **Qatar Market Guidelines**
- Currency formatting standards
- Location-specific features
- Cultural design considerations
- Arabic language preparation

---

## 🎯 **Benefits of Using Storybook**

### **For Developers**
- **Component Isolation**: Test components without app context
- **Prop Exploration**: Try different prop combinations safely
- **Documentation**: Always up-to-date component docs
- **Code Examples**: Copy-paste working implementations
- **Visual Testing**: See components across all states

### **For Designers**
- **Design System**: Consistent component library
- **Visual Review**: See components in different states
- **Interaction Testing**: Test touch and gesture interactions
- **Accessibility**: Check color contrast and touch targets

### **For QA/Testing**
- **State Coverage**: Test all component variations
- **Edge Cases**: Verify error and empty states
- **Cross-platform**: Test iOS and Android consistency
- **Accessibility**: Verify screen reader compatibility

---

## 🔍 **Troubleshooting**

### **Common Issues**

#### **Storybook Not Loading**
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Reinstall dependencies
rm -rf node_modules && npm install
```

#### **Stories Not Appearing**
```bash
# Regenerate story list
npm run storybook-generate
```

#### **Controls Not Working**
- Check story argTypes configuration
- Verify addon-ondevice-controls is installed
- Restart Metro bundler

### **Performance Issues**
- Large story lists may load slowly
- Complex components may affect scrolling
- Use loading states for heavy components

---

## 📞 **Support & Resources**

### **Documentation Files**
- `STORYBOOK_PREVIEW.md`: Visual preview of what you'll see
- `docs/STORYBOOK.md`: Comprehensive Storybook guide
- `docs/COMPONENTS.md`: Detailed component API docs
- `.rnstorybook/README.md`: Storybook-specific README

### **External Resources**
- [Storybook for React Native](https://storybook.js.org/docs/react-native)
- [React Native Documentation](https://reactnative.dev/)
- [Material Design Icons](https://materialdesignicons.com/)

---

## ✨ **Ready to Explore!**

Your Storybook contains **50+ interactive stories** across **10+ components** with comprehensive Qatar market customization. 

**Set `SHOW_STORYBOOK = true` and launch the app to start exploring!** 🚀📱

```bash
# Quick start sequence
npm start
# Set SHOW_STORYBOOK = true in index.js
npm run ios  # or android
```

The interactive component playground awaits! 🎉