# 🎨 Houseiana Mobile - Figma Assets & Components

## 📱 Complete Figma Design System for dev.web3@outlook.com

This document provides all the necessary assets and specifications to recreate the Houseiana Mobile App design system in Figma.

---

## 🎯 **Figma Project Setup**

### **1. Create New Figma Project**
```
Project Name: Houseiana Mobile App
Team: Personal (dev.web3@outlook.com)
Type: Mobile App Design
Platform: iOS/Android (React Native)
```

### **2. File Structure**
```
📁 Houseiana Mobile App
├─ 🎨 Design System
│  ├─ Colors & Typography
│  ├─ Component Library  
│  ├─ Icons & Illustrations
│  └─ Qatar Brand Elements
├─ 📱 Mobile Screens
│  ├─ Authentication Flow
│  ├─ Home & Search
│  ├─ Property Details
│  ├─ Booking Flow
│  ├─ Maps & Location
│  └─ Profile & Settings
└─ 🧩 Interactive Prototype
   ├─ User Flows
   ├─ Micro-interactions
   └─ Qatar Features Demo
```

---

## 🎨 **Design System Components**

### **Color Palette**
```figma
Primary Colors:
• Qatar Blue: #2196F3 (RGB: 33, 150, 243)
• Qatar Orange: #FF9800 (RGB: 255, 152, 0)
• Qatar Gold: #FFD700 (RGB: 255, 215, 0)

Secondary Colors:
• Success Green: #4CAF50 (RGB: 76, 175, 80)
• Warning Amber: #FFC107 (RGB: 255, 193, 7)
• Error Red: #F44336 (RGB: 244, 67, 54)

Neutral Colors:
• Background White: #FFFFFF (RGB: 255, 255, 255)
• Surface Gray: #F5F5F5 (RGB: 245, 245, 245)
• Text Primary: #333333 (RGB: 51, 51, 51)
• Text Secondary: #666666 (RGB: 102, 102, 102)
• Border Light: #E0E0E0 (RGB: 224, 224, 224)
• Border Medium: #CCCCCC (RGB: 204, 204, 204)
```

### **Typography Scale**
```figma
Font Family: System Default (iOS: SF Pro, Android: Roboto)

Text Styles:
• Hero: 24px/32px, Weight: Bold, Color: #333333
• H1: 20px/28px, Weight: Bold, Color: #333333  
• H2: 18px/24px, Weight: SemiBold, Color: #333333
• Body: 16px/22px, Weight: Regular, Color: #333333
• Body Semibold: 16px/22px, Weight: SemiBold, Color: #333333
• Caption: 14px/20px, Weight: Regular, Color: #666666
• Small: 12px/16px, Weight: Regular, Color: #666666
```

### **Spacing System**
```figma
Spacing Scale:
• XS: 4px
• SM: 8px  
• MD: 16px
• LG: 24px
• XL: 32px
• XXL: 48px

Grid System:
• Margins: 24px (left/right)
• Gutters: 16px
• Content Width: 327px (375px - 48px margins)
```

---

## 🧩 **Component Library**

### **1. Buttons**

#### **Primary Button**
```figma
Size: 327×48px
Background: Linear Gradient (#2196F3 to #1976D2)
Corner Radius: 8px
Text: 16px SemiBold, White (#FFFFFF)
Shadow: 0px 2px 8px rgba(33, 150, 243, 0.3)
States: Default, Hover, Pressed, Disabled

Variants:
• Large: 327×48px
• Medium: 160×40px  
• Small: 100×32px
```

#### **Secondary Button**
```figma
Size: 327×48px
Background: #FF9800
Corner Radius: 8px
Text: 16px SemiBold, White (#FFFFFF)
States: Default, Hover, Pressed, Disabled
```

#### **Outline Button**
```figma
Size: 327×48px
Background: Transparent
Border: 1px solid #2196F3
Corner Radius: 8px
Text: 16px SemiBold, #2196F3
States: Default, Hover, Pressed, Disabled
```

### **2. Input Fields**

#### **Text Input**
```figma
Size: 327×48px
Background: #FFFFFF
Border: 1px solid #E0E0E0
Corner Radius: 8px
Padding: 0px 16px
Text: 16px Regular, #333333
Placeholder: 16px Regular, #999999

States:
• Default: Border #E0E0E0
• Focused: Border #2196F3, Shadow: 0px 0px 0px 3px rgba(33, 150, 243, 0.1)
• Error: Border #F44336
• Disabled: Background #F5F5F5, Border #CCCCCC
```

### **3. Property Card**

#### **Featured Property Card**
```figma
Size: 280×320px
Background: #FFFFFF
Corner Radius: 12px
Shadow: 0px 2px 8px rgba(0, 0, 0, 0.1)

Components:
• Image: 280×200px, Corner Radius: 12px 12px 0px 0px
• Favorite Button: 28×28px, Position: Top-right (12px, 12px)
• Content Area: 248×108px, Padding: 16px
• Title: H2 style, Max 2 lines
• Location: Caption style, #666666
• Rating: Caption style with star icon
• Price: Body Semibold, #2196F3, "QAR 850/night"
```

#### **Search Result Card**
```figma
Size: 327×120px
Background: #FFFFFF
Corner Radius: 8px
Shadow: 0px 1px 4px rgba(0, 0, 0, 0.1)
Layout: Horizontal (Image + Content)

Components:
• Image: 100×120px, Corner Radius: 8px 0px 0px 8px
• Content: 211×120px, Padding: 12px
```

### **4. Navigation Components**

#### **Tab Bar**
```figma
Size: 375×83px (includes safe area)
Background: #FFFFFF
Border Top: 1px solid #E0E0E0

Tab Items (5 tabs):
• Home: Icon + "Home" label
• Search: Icon + "Search" label  
• Bookings: Icon + "Trips" label
• Favorites: Icon + "Saved" label
• Profile: Icon + "Profile" label

Active State: #2196F3
Inactive State: #999999
```

#### **Header Bar**
```figma
Size: 375×104px (includes status bar)
Background: #FFFFFF
Border Bottom: 1px solid #E0E0E0

Components:
• Back Button: 24×24px (when needed)
• Title: H2 style, centered or left-aligned
• Action Button: 24×24px (right side)
```

---

## 📱 **Screen Templates**

### **1. Splash Screen**
```figma
Size: 375×812px (iPhone X/11/12/13/14)
Background: Linear Gradient (#FFFFFF to #F5F7FA)

Elements:
• Logo: 150×100px, centered
• Tagline: "Qatar's Premier Property Platform"
• Loading indicator: 40×40px, #2196F3
• Qatar flag colors accent
```

### **2. Login Screen**
```figma
Layout Structure:
• Header: 120px from top
  - Title: "Welcome Back" (H1)
  - Subtitle: "Sign in to continue..."
• Form Area: Start at 220px
  - Email Input: 327×48px
  - Password Input: 327×48px (68px spacing)
  - Forgot Password link
• Primary Action: 400px from top
  - Login Button: 327×48px
• Secondary Actions: 480px from top
  - Social login options
• Footer: 600px from top
  - Signup link
```

### **3. Home Screen**
```figma
Layout Structure:
• Status Bar: 44px
• Header: 80px
  - Greeting text
  - Location with Qatar flag
  - Notification bell
• Search Bar: 48px + 16px margin
• Quick Filters: 40px horizontal scroll
• Featured Section: 260px
  - Title + horizontal property carousel
• Nearby Section: Start at 536px
  - Title + vertical property list
• Tab Bar: Bottom 83px
```

### **4. Property Details Screen**
```figma
Layout Structure:
• Image Gallery: 375×280px full-width
• Navigation Overlay: Back + Favorite buttons
• Content Scroll Area: 532px height
  - Property title, location, rating
  - Host information card
  - Amenities grid
  - Description (expandable)
  - Reviews section
• Bottom Action Bar: 64px height
  - Contact Host + Book Now buttons
```

### **5. Booking Screen**
```figma
Layout Structure:
• Header: Navigation + "Book Your Stay"
• Property Summary: Compact card
• Date Selection: Check-in/Check-out cards
• Guest Selection: Dropdown/stepper
• Price Breakdown: Detailed cost summary
• Terms acceptance
• Payment button: "Confirm and Pay"
```

### **6. Map Screen**
```figma
Full-Screen Map: 375×812px
Overlays:
• Search bar: Floating, 48px height
• Filter button: Floating FAB
• Property markers: Custom with price bubbles
• User location: Blue dot with accuracy circle
• Bottom sheet: Property preview card

Qatar Map Center: 25.3548°N, 51.4834°E
Featured Areas: The Pearl, West Bay, Lusail
```

---

## 🇶🇦 **Qatar-Specific Elements**

### **Cultural Design Elements**
```figma
Qatar Flag Colors:
• Maroon: #8D1B3D
• White: #FFFFFF

Islamic Geometric Patterns:
• Subtle background textures
• Border decorations
• Loading animations

Arabic Typography Preparation:
• RTL layout components
• Arabic numeral alternatives
• Cultural color preferences
```

### **Location Components**
```figma
Qatar Areas Chips:
• The Pearl: #2196F3 background
• West Bay: #FF9800 background  
• Lusail: #4CAF50 background
• Old Town: #9C27B0 background

Map Markers:
• Custom Qatar-themed markers
• QAR price bubbles
• Local landmark icons
```

### **Currency & Localization**
```figma
QAR Price Display:
• Format: "QAR 1,250"
• Color: #2196F3
• Typography: Body Semibold
• Per night: Caption style

Phone Number Format:
• Format: "+974 XXXX XXXX"
• Country code: #666666
• Number: #333333
```

---

## 🎬 **Interactive Prototype Flows**

### **User Journey 1: Property Search & Booking**
```figma
Flow Steps:
1. Home Screen → Search bar tap
2. Search Screen → Location selection
3. Search Results → Property selection  
4. Property Details → Image gallery interaction
5. Property Details → Book Now tap
6. Booking Screen → Date selection
7. Booking Screen → Payment confirmation
8. Success Screen → Trip details

Interactions:
• Smooth transitions (300ms ease)
• Loading states
• Form validation
• Success animations
```

### **User Journey 2: Map Exploration**
```figma
Flow Steps:
1. Home Screen → Tab navigation to Map
2. Map Screen → Property marker tap
3. Property Preview → Full details tap
4. Property Details → Contact host
5. Message Screen → Host communication

Interactions:
• Map zoom and pan
• Marker animations
• Bottom sheet interactions
• Real-time updates
```

---

## 📋 **Figma Setup Instructions**

### **Step 1: Create Design System**
1. Create new Figma file: "Houseiana Design System"
2. Set up color styles using the palette above
3. Create text styles for all typography scales
4. Build component library with variants
5. Create auto-layout components for responsive design

### **Step 2: Design Screens**
1. Create new Figma file: "Houseiana Mobile Screens"
2. Set up iPhone 14 frame (375×812px)
3. Create all screen templates
4. Apply design system components
5. Add realistic Qatar property content

### **Step 3: Create Prototype**
1. Link screens with appropriate transitions
2. Add micro-interactions and hover states
3. Set up overflow behaviors for scrolling
4. Create interactive components
5. Test user flows

### **Step 4: Export Assets**
```figma
Export Settings:
• Icons: SVG format
• Images: PNG @1x, @2x, @3x
• Components: Figma Dev Mode
• Prototypes: Share link with dev specs
```

---

## 🚀 **Ready for Implementation**

### **Figma to Code Handoff**
- Component props and variants documented
- Spacing and sizing specifications
- Color tokens and typography scales
- Interactive states and animations
- Qatar localization requirements

### **Development Assets**
- All screens designed with pixel-perfect accuracy
- Component library matches React Native implementation
- Interactive prototype demonstrates full user experience
- Qatar market customizations clearly specified

**Your Figma design system is ready to be built! All specifications match the implemented React Native components for seamless development handoff.** 🎨📱✨