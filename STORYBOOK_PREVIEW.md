# 📱 Houseiana Mobile App - Storybook Preview

## 🎯 What You'll See When Running Storybook

When you run `npm start` and launch the app with `SHOW_STORYBOOK = true`, here's exactly what you'll experience:

---

### 🏠 **Welcome Screen**
*First screen you see when opening Storybook*

```
┌─────────────────────────────────────┐
│  🏠  Houseiana Mobile               │ v1.0.0
│      Component Library              │
├─────────────────────────────────────┤
│                                     │
│  📖 Welcome to Storybook            │
│                                     │
│  Explore and interact with all UI   │
│  components used in the Houseiana   │
│  Mobile App. This living documen-   │
│  tation helps developers under-     │
│  stand, test, and implement...      │
│                                     │
│  ✅ Features:                       │
│  • Interactive component playground │
│  • Real-time prop editing           │
│  • Qatar market customization       │
│  • Mobile-optimized design          │
│  • Comprehensive documentation      │
│  • Accessibility features           │
│                                     │
│  📂 Component Categories:           │
│                                     │
│  🔹 Core Components                 │
│     Essential UI building blocks     │
│     • Button • LoadingSpinner       │
│     • PropertyCard                  │
│                                     │
│  🗺️  Map Components                 │
│     Interactive mapping features     │
│     • PropertyMapView • MapScreen   │
│                                     │
│  📅 Booking Screens                │
│     Complete booking workflow       │
│     • BookingScreen • Confirmation  │
│     • MyBookings                    │
│                                     │
│  🇶🇦 Qatar Market Focus:           │
│  • QAR currency formatting         │
│  • Local areas (Pearl, West Bay)   │
│  • Arabic language support prep    │
│  • Cultural design considerations   │
└─────────────────────────────────────┘
```

---

### 🧩 **Component Categories Sidebar**
*Navigation menu on the left side*

```
┌─ STORYBOOK ─┐
│             │
├─ 📖 Welcome │
│             │
├─ 🔧 Core    │
│ ├─ Button   │ ← Click here
│ ├─ Loading  │
│ └─ PropCard │
│             │
├─ 🗺️ Maps    │
│ ├─ MapView  │
│ └─ Screen   │
│             │
├─ 📱 Booking │
│ ├─ Booking  │
│ ├─ Confirm  │
│ └─ MyTrips  │
└─────────────┘
```

---

### 🎛️ **Button Component Stories**
*When you click on "Button" in the sidebar*

#### **Story List**
```
Components/Button
├─ 📄 Default
├─ 🔵 Primary  
├─ 🟠 Secondary
├─ ⚫ Outline
├─ 👻 Ghost
├─ 🔴 Danger
├─ 📏 Small
├─ 📏 Medium
├─ 📏 Large
├─ ❌ Disabled
├─ ⏳ Loading
├─ ◀️ Left Icon
├─ ▶️ Right Icon
├─ 📐 Full Width
├─ 📅 Booking Button
├─ ❌ Cancel Button
├─ 🔍 Filter Button
└─ 📤 Share Button
```

#### **Interactive Button Preview**
*Main content area showing the button*

```
┌─ Button Component ────────────────────┐
│                                       │
│           ┌─────────────┐             │
│           │  Book Now   │  ← Interactive Button
│           └─────────────┘             │
│                                       │
├─ Controls ────────────────────────────┤
│                                       │
│ Title: [Book Now        ] (text input)│
│                                       │
│ Variant: [Primary ▼] (dropdown)      │
│          Primary                      │
│          Secondary                    │
│          Outline                      │
│          Ghost                        │
│          Danger                       │
│                                       │
│ Size: [Medium ▼] (dropdown)          │
│       Small                           │
│       Medium                          │
│       Large                           │
│                                       │
│ ☐ Disabled  (checkbox)               │
│ ☐ Loading   (checkbox)               │
│ ☐ Full Width (checkbox)              │
│                                       │
│ Icon: [event        ] (text input)   │
│ Position: [Left ▼] (dropdown)        │
│                                       │
├─ Actions ─────────────────────────────┤
│ onPress: ✅ button-pressed            │
│                                       │
├─ Code Example ────────────────────────┤
│ ```jsx                                │
│ <Button                               │
│   title="Book Now"                    │
│   variant="primary"                   │
│   size="medium"                       │
│   onPress={handlePress}               │
│ />                                    │
│ ```                                   │
└───────────────────────────────────────┘
```

---

### 🏠 **PropertyCard Component Stories**
*Rich property display component*

#### **PropertyCard Preview**
```
┌─ PropertyCard Component ──────────────┐
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ [Property Image]          ♡     │  │ ← Interactive Card
│  │                                 │  │
│  │                   QAR 850/night │  │
│  └─────────────────────────────────┘  │
│  📍 The Pearl, Doha                   │
│                                       │
│  🏠 Luxury Villa in The Pearl         │
│                                       │
│  🛏️ 4 bed  🛁 3 bath  👥 8 guests    │
│                                       │
│  ⭐ 4.9 (89 reviews)                  │
│  └─────────────────────────────────┘  │
│                                       │
├─ Controls ────────────────────────────┤
│                                       │
│ ☐ Is Favorite (checkbox)             │
│ ☑ Show Favorite Button (checkbox)    │
│                                       │
│ Property Data: [Edit Object ▼]       │
│ - Title: Luxury Villa in The Pearl    │
│ - Price: 850                          │
│ - Area: The Pearl                     │
│ - City: Doha                          │
│ - Bedrooms: 4                         │
│ - Bathrooms: 3                        │
│ - Guests: 8                           │
│ - Rating: 4.9                         │
│                                       │
├─ Actions ─────────────────────────────┤
│ onPress: ✅ property-pressed          │
│ onFavoritePress: ✅ favorite-pressed  │
└───────────────────────────────────────┘
```

---

### 🗺️ **PropertyMapView Component**
*Interactive map with Qatar properties*

#### **Map Component Preview**
```
┌─ PropertyMapView Component ───────────┐
│                                       │
│  ┌─────────────────────────────────┐  │
│  │     🗺️ Interactive Map          │  │
│  │                                 │  │
│  │  📍 QAR850    📍 QAR650        │  │ ← Property Markers
│  │    Pearl        West Bay        │  │
│  │                                 │  │
│  │           🔵 Doha              │  │ ← User Location
│  │                                 │  │
│  │  📍 QAR1200                    │  │
│  │    Lusail                       │  │
│  │                                 │  │
│  │                          🎯     │  │ ← My Location Button
│  └─────────────────────────────────┘  │
│  📊 3 properties                      │
│                                       │
├─ Controls ────────────────────────────┤
│                                       │
│ ☑ Show User Location (checkbox)      │
│ ☑ Show Prices (checkbox)             │
│                                       │
│ Search Radius: [10] km (slider)      │
│ ■■■■■■■■■■□□□□□□□□□□ (10/50)          │
│                                       │
│ Properties: [3 items ▼]              │
│ - Luxury Villa (The Pearl)            │
│ - Modern Apartment (West Bay)         │
│ - Spacious Home (Lusail)              │
│                                       │
├─ Actions ─────────────────────────────┤
│ onPropertyPress: ✅ property-pressed  │
│ onLocationPress: ✅ location-pressed  │
└───────────────────────────────────────┘
```

---

### 📅 **BookingScreen Stories**
*Complete booking workflow*

#### **BookingScreen Preview**
```
┌─ BookingScreen Component ─────────────┐
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ 🏠 Luxury Villa in The Pearl    │  │
│  │ 📍 The Pearl, Doha              │  │
│  │ ⭐ 4.9 (89 reviews)             │  │
│  └─────────────────────────────────┘  │
│                                       │
│  📅 Check-in:  [Dec 20, 2024 ▼]      │
│  📅 Check-out: [Dec 25, 2024 ▼]      │
│                                       │
│  👥 Guests: [-] 4 [+]                 │
│                                       │
│  💰 Price Breakdown:                  │
│     QAR 850 x 5 nights = QAR 4,250   │
│     Cleaning fee = QAR 150            │
│     Service fee = QAR 300             │
│     Taxes = QAR 200                   │
│     ────────────────────────────────  │
│     Total: QAR 4,900                  │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │         Confirm Booking         │  │ ← Interactive Button
│  └─────────────────────────────────┘  │
│                                       │
├─ Controls ────────────────────────────┤
│                                       │
│ Property: [Villa ▼] (dropdown)       │
│          Luxury Villa                 │
│          Modern Apartment             │
│          Different Property           │
│                                       │
│ Preselected Dates: [Yes ▼]           │
│                     Yes               │
│                     No                │
│                                       │
├─ Navigation Actions ──────────────────┤
│ navigation.navigate: ✅ navigate      │
│ route.params: [Object]                │
└───────────────────────────────────────┘
```

---

### 🎨 **Design System Integration**

#### **Color Palette Preview**
```
┌─ Colors ──────────────────────────────┐
│                                       │
│ 🔵 Primary   #2196F3  ████████████   │
│ 🟠 Secondary #FF9800  ████████████   │
│ 🟢 Success   #4CAF50  ████████████   │
│ 🟡 Warning   #FFC107  ████████████   │
│ 🔴 Error     #F44336  ████████████   │
│ ⚪ Background #FFFFFF ████████████   │
│ ⚫ Text      #333333  ████████████   │
└───────────────────────────────────────┘
```

#### **Typography Scale**
```
┌─ Typography ──────────────────────────┐
│                                       │
│ Hero Text (2xl - 24px)                │
│ Page Title (xl - 20px)               │
│ Section Header (lg - 18px)           │
│ Primary Text (md - 16px)             │
│ Body Text (sm - 14px)                │
│ Caption Text (xs - 12px)             │
└───────────────────────────────────────┘
```

---

## 🇶🇦 **Qatar Market Features You'll See**

### **Currency Formatting**
- All prices display as "QAR 850" format
- Proper Arabic numeral support ready
- Qatar Riyal symbol integration

### **Location Integration**
- Map centered on Doha by default
- Pre-loaded Qatar locations:
  - 📍 The Pearl (25.3700°N, 51.5373°E)
  - 📍 West Bay (25.3208°N, 51.5127°E)
  - 📍 Lusail (25.4378°N, 51.4911°E)
  - 📍 Al Rayyan (25.2919°N, 51.4265°E)

### **Cultural Design Elements**
- Property images showing Qatar architecture
- Local amenities and landmarks
- Business hours aligned with Qatar practices

---

## 📱 **Mobile Interactions You Can Test**

### **Touch Interactions**
- Tap buttons to see press feedback
- Long press on property cards
- Swipe through image galleries
- Pinch-to-zoom on maps

### **Component States**
- Loading states with spinners
- Error states with retry buttons
- Empty states with helpful messages
- Success states with confirmations

### **Real-time Controls**
- Adjust button sizes instantly
- Change colors and see updates
- Toggle features on/off
- Modify text content live

---

## 🔧 **How to Interact with Storybook**

### **Navigation**
1. **Sidebar**: Browse component categories
2. **Story List**: Select specific component stories
3. **Main View**: See component in action
4. **Controls Panel**: Modify props in real-time

### **Testing Features**
1. **Change Props**: Use controls to modify behavior
2. **View Actions**: See console logs for interactions
3. **Copy Code**: Get implementation examples
4. **Test States**: Switch between loading, error, success

### **Documentation Access**
1. **API Docs**: Component prop definitions
2. **Usage Examples**: Copy-paste code snippets
3. **Design Guidelines**: Color, spacing, typography
4. **Accessibility Info**: Screen reader support details

---

## 🚀 **To Actually Run Storybook**

Once you have a proper React Native setup with iOS/Android:

1. **Start Metro**: `npm start`
2. **Set Storybook Mode**: `SHOW_STORYBOOK = true` in `index.js`
3. **Launch App**: `npm run ios` or `npm run android`
4. **Explore**: Navigate through components and stories

The Storybook will load instead of the main app, giving you access to all the interactive component documentation shown above.

---

**This preview shows exactly what your comprehensive Storybook documentation looks like when running on a mobile device!** 📱✨

All components are interactive, with real-time prop editing, Qatar-specific data, and comprehensive examples covering every use case in the Houseiana Mobile App.