# 🎨 Houseiana Mobile - Complete Figma Design Guide

## 📧 Figma Account: dev.web3@outlook.com

This guide will help you create the complete Houseiana Mobile App design in Figma with all screens, components, and Qatar market customizations.

---

## 🎯 **Figma Project Structure**

### **Main Figma File: "Houseiana Mobile - Qatar Property App"**

```
📁 Houseiana Mobile App - Figma Structure
├─ 🎨 Design System
│  ├─ Colors (Qatar-inspired palette)
│  ├─ Typography (Arabic + English ready)
│  ├─ Icons (Property, Qatar, UI icons)
│  ├─ Components (50+ reusable elements)
│  └─ Spacing & Layout Grid
│
├─ 📱 Mobile Screens (iPhone 14 Pro - 393x852)
│  ├─ 🏠 Home & Search Screens
│  ├─ 📋 Property Details & Booking
│  ├─ 🗺️ Maps & Location Screens
│  ├─ 👤 Profile & Settings
│  ├─ 📅 My Trips & Bookings
│  └─ 🔐 Authentication Screens
│
├─ 🧩 Component Library
│  ├─ Buttons (All 17+ variants)
│  ├─ Cards (Property, booking, info)
│  ├─ Forms (Input fields, pickers)
│  ├─ Navigation (Bottom tabs, headers)
│  └─ Qatar-specific components
│
├─ 🇶🇦 Qatar Market Assets
│  ├─ Qatar flag and cultural elements
│  ├─ QAR currency symbols
│  ├─ Local area illustrations
│  └─ Arabic typography samples
│
└─ 🔄 User Flows & Prototypes
   ├─ Booking journey (start to finish)
   ├─ Property search flow
   ├─ Host onboarding flow
   └─ Navigation prototypes
```

---

## 🎨 **Design System Specifications**

### **Color Palette (Qatar-Inspired)**

```
🔵 Primary Colors:
├─ Qatar Blue: #2196F3
│  └─ Usage: Primary buttons, links, active states
├─ Qatar Navy: #1565C0  
│  └─ Usage: Dark variants, text on light backgrounds
└─ Qatar Light Blue: #E3F2FD
   └─ Usage: Backgrounds, hover states, highlights

🟠 Secondary Colors:
├─ Qatar Orange: #FF9800
│  └─ Usage: CTAs, highlights, success indicators
├─ Qatar Amber: #FFC107
│  └─ Usage: Warnings, pending states, ratings
└─ Qatar Light Orange: #FFF3E0
   └─ Usage: Subtle backgrounds, cards

🌈 Supporting Colors:
├─ Success Green: #4CAF50
├─ Error Red: #F44336  
├─ Warning Yellow: #FF9800
├─ Info Blue: #2196F3
└─ Qatar Gold: #FFD700 (Premium features)

⚫ Neutral Colors:
├─ Text Primary: #333333
├─ Text Secondary: #666666
├─ Text Disabled: #999999
├─ Border: #E0E0E0
├─ Background: #FFFFFF
├─ Surface: #F5F5F5
└─ Divider: #EEEEEE
```

### **Typography System**

```
📝 Font Family: SF Pro Display (iOS) / Roboto (Android)
📝 Arabic Font: Cairo / Tajawal (Arabic language support)

📏 Type Scale:
├─ Hero: 32px/Bold - App titles, welcome text
├─ H1: 28px/Bold - Page headers
├─ H2: 24px/SemiBold - Section titles  
├─ H3: 20px/SemiBold - Card headers
├─ H4: 18px/Medium - Subsection titles
├─ Body Large: 16px/Regular - Primary content
├─ Body: 14px/Regular - Secondary content
├─ Caption: 12px/Regular - Metadata, labels
└─ Button: 16px/SemiBold - Button text

🇶🇦 Arabic Typography:
├─ Reading direction: Right to Left (RTL)
├─ Font weight adjustments for Arabic
├─ Line height: 1.5x for Arabic text
└─ Character spacing: 0.02em
```

### **Spacing System**

```
📐 Spacing Scale (8pt Grid System):
├─ 4px (0.5x) - Micro spacing, borders
├─ 8px (1x) - Small spacing, icon gaps
├─ 16px (2x) - Standard spacing, card padding
├─ 24px (3x) - Medium spacing, section gaps
├─ 32px (4x) - Large spacing, screen margins
├─ 48px (6x) - XL spacing, major sections
└─ 64px (8x) - XXL spacing, page sections

📱 Mobile Layout:
├─ Screen margins: 16px
├─ Card padding: 16px
├─ Button padding: 12px vertical, 24px horizontal
├─ Input padding: 12px
└─ Bottom tab height: 60px
```

### **Component Dimensions**

```
🔘 Buttons:
├─ Small: 32px height, 8px padding
├─ Medium: 44px height, 12px padding  
├─ Large: 52px height, 16px padding
└─ Full Width: 100% width, responsive

🏠 Property Cards:
├─ Width: Screen width - 32px margins
├─ Height: Auto (min 200px)
├─ Image height: 160px
├─ Content padding: 16px
└─ Border radius: 12px

🗺️ Map Components:
├─ Full screen height: Screen height - nav
├─ Property markers: 24x24px minimum
├─ User location: 20x20px blue dot
└─ Controls: 44x44px touch targets

📱 Navigation:
├─ Header height: 64px (with status bar)
├─ Bottom tabs: 60px height
├─ Tab icons: 24x24px
└─ Back button: 44x44px touch area
```

---

## 📱 **Mobile Screen Designs**

### **1. Home Screen (Main Entry Point)**

```
Frame: iPhone 14 Pro (393×852px)

Layout Structure:
┌─ Header (64px) ────────────────────┐
│ 🏠 Houseiana        🔔  📍  👤    │ ← Logo, notifications, location, profile
├─ Search Bar (52px) ───────────────┤  
│ 🔍 Search properties in Qatar...   │ ← Prominent search with Qatar context
├─ Quick Filters (40px) ────────────┤
│ [The Pearl] [West Bay] [Lusail]    │ ← Qatar location quick filters
├─ Featured Properties ─────────────┤
│                                   │
│ ┌─ Property Card (200px) ────────┐ │
│ │ [Property Image 160px]         │ │ ← High-quality property photos
│ │ ♡ Favorite Button              │ │
│ │ QAR 850/night Price Badge      │ │
│ │                                │ │
│ │ 📍 The Pearl-Qatar, Doha       │ │ ← Qatar location prominent
│ │ 🏠 Luxury Villa with Pool      │ │
│ │ 🛏️ 4 bed • 🛁 3 bath • 👥 8    │ │ ← Key property details
│ │ ⭐ 4.9 (89 reviews)            │ │
│ └────────────────────────────────┘ │
│                                   │
│ [More properties...]              │
├─ Map Preview (120px) ─────────────┤
│ 🗺️ Nearby Properties              │ ← Quick map view
│ [Interactive Qatar Map]           │
├─ Recent Searches ─────────────────┤
│ • The Pearl luxury villas         │ ← Search history
│ • West Bay apartments             │
└─ Bottom Navigation (60px) ────────┘
│ [🏠][🔍][📅][♡][👤]               │ ← Main navigation
└───────────────────────────────────┘

Design Elements:
- Clean white background
- Qatar blue accent color (#2196F3)
- Property cards with subtle shadows
- QAR currency prominently displayed
- Touch-friendly 44px minimum targets
```

### **2. Property Search Screen**

```
Frame: iPhone 14 Pro (393×852px)

Layout:
┌─ Header with Search ───────────────┐
│ ← [🔍 Villa in West Bay] 🎯 ⚙️     │ ← Back, search, GPS, filters
├─ Active Filters ──────────────────┤
│ 🏷️ West Bay × | QAR 0-1000 × | 🛏️4+ │ ← Removable filter chips
├─ Results Count ───────────────────┤
│ 📊 24 properties found            │
├─ Sort & View Toggle ──────────────┤
│ 📈 Price ▼ | 🏠 List View | 🗺️ Map │ ← Sort options and view toggle
├─ Property List ───────────────────┤
│                                   │
│ ┌─ Property List Item ──────────┐  │
│ │ [Img] 🏠 Property Details     │  │
│ │ 160px │ Luxury Villa          │  │
│ │ photo │ The Pearl-Qatar       │  │
│ │       │ QAR 850/night     ♡  │  │ ← Price and favorite
│ │       │ ⭐ 4.9 • 4🛏️ • Pool   │  │
│ └───────────────────────────────┘  │
│                                   │
│ [More results...]                 │
├─ Load More ───────────────────────┤
│ ┌─────────────────────────────────┐ │
│ │      Load 10 More Results       │ │
│ └─────────────────────────────────┘ │
└─ Bottom Navigation ───────────────┘

Interactive Elements:
- Pull-to-refresh functionality
- Infinite scroll loading
- Quick filter chips (removable)
- Heart animation for favorites
- Smooth list-to-grid transitions
```

### **3. Property Detail Screen**

```
Frame: iPhone 14 Pro (393×852px)

Scrollable Layout:
┌─ Image Gallery (280px) ────────────┐
│ [Large Property Image Carousel]    │ ← Full-width image slider
│ ← Back | Share 📤 | Favorite ♡     │ ← Overlay controls
│ ● ● ○ ○ ○ Image indicators         │
├─ Property Header ─────────────────┤
│ 🏠 Luxury Villa in The Pearl       │ ← Property title
│ 📍 The Pearl-Qatar, Doha           │
│ ⭐ 4.9 (89 reviews) • Superhost    │
├─ Pricing ─────────────────────────┤
│ 💰 QAR 850 per night              │ ← Prominent QAR pricing
│ 📅 Available Dec 20-25            │
├─ Host Information ────────────────┤
│ ┌─ Host Card ──────────────────┐   │
│ │ 👨‍💼 Ahmad Al-Rashid          │   │ ← Arabic host name
│ │ ⭐ 4.8 host rating • 5 years  │   │
│ │ [📱 Message] [📞 Call]        │   │ ← Contact buttons
│ └───────────────────────────────┘   │
├─ Property Features ───────────────┤
│ 🏠 Property Features:              │
│ • 🛏️ 4 bedrooms                   │
│ • 🛁 3 bathrooms                  │
│ • 👥 8 guests maximum             │
│ • 🏊 Swimming pool                │
│ • 🅿️ Free parking                │
│ • 📶 WiFi included               │
│ • ❄️ Air conditioning            │
├─ Location & Map (200px) ──────────┤
│ 🗺️ Location & Nearby              │
│ [Interactive Map with Qatar focus] │
│ • 🏪 Villaggio Mall (5 min)       │ ← Qatar landmarks
│ • 🍽️ Restaurants (2 min walk)     │
├─ Reviews ─────────────────────────┤
│ ⭐ 4.9 • 89 reviews               │
│ [Review cards with ratings...]    │
├─ Booking Section ─────────────────┤
│ ┌─ Booking Card ────────────────┐  │
│ │ 📅 Check-in | Check-out       │  │
│ │ [Dec 20] | [Dec 25]           │  │
│ │ 👥 Guests: 4                  │  │
│ │ ┌───────────────────────────┐ │  │
│ │ │    Reserve - QAR 4,250    │ │  │ ← Booking CTA
│ │ └───────────────────────────┘ │  │
│ └───────────────────────────────┘  │
└─ End of Content ──────────────────┘

Interactions:
- Image gallery swipe
- Expandable description text
- Map interaction
- Booking flow initiation
- Host contact actions
```

### **4. Booking Flow Screen**

```
Frame: iPhone 14 Pro (393×852px)

Modal/Full Screen:
┌─ Header ───────────────────────────┐
│ ← Book Property          ✕ Close   │
├─ Property Summary ─────────────────┤
│ 🏠 Luxury Villa in The Pearl       │
│ QAR 850 per night                  │
├─ Date Selection ───────────────────┤
│ 📅 Check-in                        │
│ ┌─────────────────────────────────┐ │
│ │ Wed, Dec 20, 2024    ⏰ 3:00 PM │ │ ← Date picker integration
│ └─────────────────────────────────┘ │
│                                   │
│ 📅 Check-out                       │
│ ┌─────────────────────────────────┐ │
│ │ Mon, Dec 25, 2024   ⏰ 11:00 AM │ │
│ └─────────────────────────────────┘ │
├─ Guest Selection ──────────────────┤
│ 👥 Guests                          │
│ ┌─────────────────────────────────┐ │
│ │ Adults     [➖] 2 [➕]          │ │ ← Interactive counters
│ │ Children   [➖] 2 [➕]          │ │
│ │ Infants    [➖] 0 [➕]          │ │
│ └─────────────────────────────────┘ │
├─ Price Breakdown ──────────────────┤
│ 💰 Price Details:                  │
│ ┌─────────────────────────────────┐ │
│ │ QAR 850 × 5 nights = QAR 4,250 │ │ ← Transparent pricing
│ │ Cleaning fee        = QAR 150   │ │
│ │ Service fee         = QAR 300   │ │
│ │ Taxes & fees        = QAR 200   │ │
│ │ ─────────────────────────────── │ │
│ │ Total              = QAR 4,900  │ │ ← Final QAR total
│ └─────────────────────────────────┘ │
├─ Policies ─────────────────────────┤
│ 📋 Booking Policies:               │
│ • Free cancellation until Dec 19  │
│ • Check-in: 3:00 PM - 11:00 PM    │
│ • Check-out: 11:00 AM              │
├─ Booking Button ───────────────────┤
│ ┌─────────────────────────────────┐ │
│ │     Confirm Booking QAR 4,900   │ │ ← Primary CTA
│ └─────────────────────────────────┘ │
└───────────────────────────────────┘

Design Notes:
- Qatar Riyal (QAR) prominently displayed
- Clear price breakdown for transparency
- Touch-friendly date pickers
- Guest counter with +/- buttons
- Policies clearly stated
- Large, accessible booking button
```

### **5. Booking Confirmation Screen**

```
Frame: iPhone 14 Pro (393×852px)

Success State:
┌─ Header ───────────────────────────┐
│          Booking Confirmed!        │ ← Success state header
├─ Success Icon ────────────────────┤
│              ✅                    │ ← Large success checkmark
│         Great choice!              │
├─ Booking Details ──────────────────┤
│ 📋 Booking Reference               │
│ HSN-2024-001234                    │ ← Qatar booking reference
│                                   │
│ 🏠 Luxury Villa in The Pearl       │
│ 📅 Dec 20-25, 2024 (5 nights)     │
│ 👥 4 guests                        │
│ 💰 Total: QAR 4,900               │
├─ Next Steps ───────────────────────┤
│ 📱 What's Next:                    │
│ • Host will contact you within 24h │
│ • Check your email for details     │
│ • Add trip to your calendar        │ ← Clear next steps
├─ Host Contact ────────────────────┤
│ 👨‍💼 Your Host: Ahmad Al-Rashid      │ ← Arabic host name
│ 📞 Phone: +974 5555 1234          │ ← Qatar phone format
│ ┌─────────────────────────────────┐ │
│ │ [📱 Message Host] [📞 Call]     │ │ ← Contact actions
│ └─────────────────────────────────┘ │
├─ Action Buttons ───────────────────┤
│ ┌─────────────────────────────────┐ │
│ │         Back to Home            │ │ ← Navigation options
│ └─────────────────────────────────┘ │
│ ┌─────────────────────────────────┐ │
│ │        View My Trips            │ │
│ └─────────────────────────────────┘ │
└───────────────────────────────────┘

Visual Elements:
- Success green color scheme
- Large confirmation checkmark
- Clear booking reference
- Qatar-specific phone number format
- Next steps clearly outlined
- Easy navigation to key areas
```

---

## 🧩 **Component Library Design**

### **Button Components (17+ Variants)**

```
🔘 Primary Button (Qatar Blue):
├─ Default: #2196F3 background, white text
├─ Hover: #1976D2 (darker blue)
├─ Pressed: #1565C0 (darkest blue)
├─ Disabled: #E0E0E0 background, #999 text
└─ Loading: Spinner + "Processing..." text

🔘 Secondary Button (Qatar Orange):
├─ Default: #FF9800 background, white text
├─ Variants: Same interaction states
└─ Usage: CTAs, highlights, urgent actions

🔘 Outline Button:
├─ Default: Transparent, #2196F3 border/text
├─ Hover: #E3F2FD background
└─ Usage: Secondary actions, cancel buttons

🔘 Ghost Button:
├─ Default: Transparent, #2196F3 text only
├─ Hover: #E3F2FD background
└─ Usage: Subtle actions, links

🔘 Danger Button:
├─ Default: #F44336 background, white text
└─ Usage: Delete, cancel bookings

Icon Positions:
├─ Left icon: 16px spacing from text
├─ Right icon: 16px spacing from text
└─ Icon sizes: 16px (small), 20px (medium), 24px (large)
```

### **Property Card Component**

```
🏠 Property Card Specifications:
├─ Container: 343×240px (screen width - 32px margins)
├─ Border radius: 12px
├─ Shadow: 0 2px 8px rgba(0,0,0,0.1)
├─ Background: #FFFFFF

Image Section (343×160px):
├─ Property photo with 12px radius (top only)
├─ Favorite heart: Top-right, 12px margin
├─ Price badge: Bottom-left, 8px margin from edges
└─ Price format: "QAR 850/night" in Qatar blue

Content Section (16px padding):
├─ Location: 📍 icon + "The Pearl, Doha" (12px text)
├─ Title: "Luxury Villa..." (16px bold, 2 lines max)
├─ Features: 🛏️4 bed • 🛁3 bath • 👥8 guests (14px)
├─ Rating: ⭐4.9 (89 reviews) (14px)
└─ Spacing: 8px between each element

States:
├─ Default: Subtle shadow, clean appearance
├─ Pressed: Slight scale (0.98x), shadow reduction
├─ Favorite: Red heart, subtle animation
└─ Loading: Skeleton placeholder
```

### **Map Components**

```
🗺️ Property Map Specifications:
├─ Full screen height: Screen height - header - tabs
├─ Default center: Doha, Qatar (25.2854°N, 51.5310°E)
├─ Zoom level: City view (appropriate for Qatar)

Property Markers:
├─ Size: 32×24px minimum (touch-friendly)
├─ Design: Qatar blue with white text
├─ Content: "QAR 850" price display
├─ Selected state: Qatar orange color
├─ Hover: Scale to 1.1x

User Location:
├─ Blue dot: 20×20px with white border
├─ Accuracy circle: Light blue with transparency
├─ Animation: Subtle pulse effect

Controls:
├─ My Location: 44×44px FAB, bottom-right
├─ Zoom controls: Standard map controls
├─ Search radius: Visual circle overlay
└─ Property count: Bottom overlay badge
```

---

## 🇶🇦 **Qatar Market Design Elements**

### **Cultural Design Considerations**

```
🎨 Qatar Cultural Elements:
├─ Color Psychology:
│  ├─ Blue: Trust, stability (Qatar flag inspiration)
│  ├─ Maroon: Heritage, tradition (Qatar flag)
│  └─ Gold: Luxury, premium services
│
├─ Typography:
│  ├─ Arabic font preparation: Tajawal, Cairo
│  ├─ Reading direction: RTL support ready
│  ├─ Mixed language: Arabic names with English
│  └─ Font weights: Bold for Arabic, Regular for English
│
├─ Iconography:
│  ├─ Cultural sensitivity: Appropriate imagery
│  ├─ Local landmarks: Skyline, architecture
│  └─ Islamic geometric patterns: Subtle accents
│
└─ Content Adaptation:
   ├─ Qatar locations prominently featured
   ├─ QAR currency formatting: "QAR 1,500"
   ├─ Phone numbers: "+974 XXXX XXXX" format
   └─ Business hours: Qatar timezone (GMT+3)
```

### **Qatar Location Assets**

```
📍 Location Illustrations:
├─ The Pearl-Qatar:
│  ├─ Venetian-style architecture illustration
│  ├─ Marina and waterfront elements
│  └─ Luxury residential towers
│
├─ West Bay:
│  ├─ Modern skyline silhouette
│  ├─ Business district architecture
│  └─ Corniche waterfront
│
├─ Lusail City:
│  ├─ Futuristic city planning
│  ├─ Stadium and entertainment district
│  └─ Modern residential complexes
│
└─ Qatar Icons:
   ├─ Qatar flag elements (maroon and white)
   ├─ Dhow boat illustrations
   ├─ Desert and sea combination
   └─ Modern architecture silhouettes
```

---

## 🔄 **User Flow Prototypes**

### **Complete Booking Journey**

```
🛤️ Figma Prototype Flow:
1. Home Screen
   ├─ Tap property card
   └─ → Property Details

2. Property Details  
   ├─ Scroll through content
   ├─ Tap "Reserve" button
   └─ → Booking Screen

3. Booking Screen
   ├─ Select dates (date picker)
   ├─ Choose guests (counter)
   ├─ Review price breakdown
   └─ → Confirm Booking

4. Booking Confirmation
   ├─ Show success animation
   ├─ Display booking details
   └─ → Navigate to Home or Trips

Interactions:
├─ Smooth transitions (300ms ease)
├─ Loading states for API calls
├─ Form validation feedback
└─ Success animations
```

### **Property Search Flow**

```
🔍 Search Prototype:
1. Home Screen
   ├─ Tap search bar
   └─ → Search Screen

2. Search Screen
   ├─ Enter location/keywords
   ├─ Apply filters (price, beds, etc.)
   ├─ Toggle between list/map view
   └─ → Tap property for details

3. Filter Modal
   ├─ Price range slider
   ├─ Property type selection
   ├─ Amenities checklist
   └─ Apply filters animation

Micro-interactions:
├─ Search bar expand animation
├─ Filter chip animations
├─ List-to-grid view transitions
└─ Loading skeletons
```

---

## 📲 **Figma Setup Instructions**

### **Step 1: Create Figma Account & Project**

```bash
# Your Figma account: dev.web3@outlook.com
# Create new Figma project: "Houseiana Mobile - Qatar Property App"
```

### **Step 2: Import Design System**

1. **Create Design System Page**
   - Colors: Create color styles for all Qatar palette colors
   - Typography: Set up text styles for all font sizes
   - Effects: Create drop shadows and elevation styles
   - Grid: Set up 8px grid system

2. **Create Component Library**
   - Buttons: Master component with variants
   - Cards: Property card with all states
   - Forms: Input fields, pickers, counters
   - Navigation: Headers, tabs, back buttons

### **Step 3: Design All Screens**

1. **Create Frames (iPhone 14 Pro - 393×852px)**
2. **Import Assets** (logos, icons, illustrations)
3. **Build Screens** using components and design system
4. **Add Interactions** and micro-animations

### **Step 4: Create Prototypes**

1. **Link Screens** with appropriate transitions
2. **Add Overlays** for modals and bottom sheets
3. **Include Loading States** and form validation
4. **Test User Flows** from start to finish

---

## 📤 **Export & Handoff**

### **Developer Handoff Preparation**

```
📋 Figma Dev Mode Setup:
├─ Mark all components for export
├─ Add development notes and specifications  
├─ Create CSS/React Native code snippets
├─ Document spacing and sizing
└─ Export assets in multiple formats

Asset Export Settings:
├─ Icons: SVG format
├─ Images: PNG @2x and @3x for retina
├─ Illustrations: SVG or high-res PNG
└─ Color values: Hex codes documented
```

This comprehensive Figma design guide provides everything needed to create professional, Qatar-market-focused mobile app designs. The specifications align perfectly with your React Native implementation and include all cultural considerations for the Qatar market.

Would you like me to create any specific screen designs or component specifications in more detail?