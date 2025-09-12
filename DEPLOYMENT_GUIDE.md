# 🚀 Houseiana Mobile App - Complete Deployment Guide

## Overview
This guide will help you deploy the Houseiana Mobile App to see the actual app layout on iOS simulator, Android emulator, or physical devices.

## ✅ Prerequisites Check
- ✅ Node.js v22.19.0 (Installed)
- ✅ npm v10.9.3 (Installed) 
- ✅ Xcode Command Line Tools (Installed)
- ❌ CocoaPods (Need to install)
- ❌ React Native CLI (Need to install)

---

## 📱 Deployment Options

### Option 1: iOS Simulator (Recommended - Fastest)
### Option 2: Android Emulator  
### Option 3: Expo Go (Easiest for quick testing)
### Option 4: Physical Device

---

## 🍎 Option 1: iOS Simulator Deployment

### Step 1: Install Required Dependencies

Run these commands in Terminal:

```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install CocoaPods
brew install cocoapods

# Install React Native CLI globally
npm install -g @react-native-community/cli

# Verify installations
pod --version
npx react-native --version
```

### Step 2: Initialize iOS Project

```bash
# Navigate to project directory
cd "/Users/goldenloonie/Library/CloudStorage/OneDrive-Personal/Desktop/next JS project/Houseiana Mobile app"

# Create new React Native project with iOS/Android templates
npx react-native init HouseianaTemp --skip-install
cp -r HouseianaTemp/ios ./
cp -r HouseianaTemp/android ./
rm -rf HouseianaTemp

# Install iOS dependencies
cd ios && pod install && cd ..
```

### Step 3: Run on iOS Simulator

```bash
# Start Metro bundler in one terminal
npm start

# In another terminal, run iOS
npx react-native run-ios

# Or specify simulator
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### Step 4: Switch Between Main App and Storybook

To view the app layout:
```javascript
// In index.js, set:
const SHOW_STORYBOOK = false;  // Shows main app layout
```

To view Storybook documentation:
```javascript
// In index.js, set:
const SHOW_STORYBOOK = true;   // Shows Storybook
```

---

## 🤖 Option 2: Android Emulator Deployment  

### Step 1: Install Android Studio

1. Download Android Studio from: https://developer.android.com/studio
2. Install Android SDK and create virtual device (AVD)
3. Add Android SDK to PATH

### Step 2: Configure Environment Variables

Add to your `~/.zshrc` or `~/.bash_profile`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Step 3: Run on Android Emulator

```bash
# Start Metro bundler
npm start

# Start Android emulator and run app
npx react-native run-android
```

---

## 📲 Option 3: Expo Go (Quickest Testing)

### Step 1: Convert to Expo Project

```bash
# Install Expo CLI
npm install -g @expo/cli

# Initialize Expo in existing project
cd "/Users/goldenloonie/Library/CloudStorage/OneDrive-Personal/Desktop/next JS project/Houseiana Mobile app"

# Create app.json for Expo
cat > app.json << EOF
{
  "expo": {
    "name": "Houseiana Mobile",
    "slug": "houseiana-mobile",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "platforms": ["ios", "android", "web"],
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
}
EOF
```

### Step 2: Run with Expo

```bash
# Start Expo development server
npx expo start

# Scan QR code with Expo Go app on your phone
# Or press 'i' for iOS simulator, 'a' for Android
```

---

## 📱 Option 4: Physical Device

### For iOS Device:

1. **Xcode Setup:**
   - Open iOS project in Xcode: `open ios/HouseianaMobile.xcworkspace`
   - Select your device as target
   - Sign with your Apple ID (Xcode > Preferences > Accounts)
   - Build and run (Cmd + R)

2. **Trust Developer:**
   - Go to Settings > General > VPN & Device Management
   - Trust your developer profile

### For Android Device:

1. **Enable Developer Options:**
   - Go to Settings > About Phone
   - Tap "Build Number" 7 times
   - Go back to Settings > Developer Options
   - Enable "USB Debugging"

2. **Deploy:**
   ```bash
   # Connect device via USB
   adb devices  # Should show your device
   npx react-native run-android
   ```

---

## 🎨 What You'll See - App Layout Preview

### Main App Layout (`SHOW_STORYBOOK = false`)

```
┌─────────────────────────────────────┐
│ 🏠 Houseiana                   👤  │ ← Header
├─────────────────────────────────────┤
│                                     │
│ 🔍 Search properties in Qatar...   │ ← Search Bar
│                                     │
├─────────────────────────────────────┤
│ 🏷️  Featured Properties             │
│                                     │
│ ┌─────────┐  ┌─────────┐           │
│ │[Image]  │  │[Image]  │           │ ← Property Cards
│ │Villa    │  │Apt      │           │
│ │QAR 850  │  │QAR 450  │           │
│ └─────────┘  └─────────┘           │
│                                     │
├─────────────────────────────────────┤
│ 🗺️ Map View  📍 Near You           │
│                                     │
├─────────────────────────────────────┤
│ [🏠] [🔍] [📅] [♡] [👤]            │ ← Bottom Tabs
│ Home Search Trips Fav Profile      │
└─────────────────────────────────────┘
```

### Booking Flow Layout

```
┌─────────────────────────────────────┐
│ ← Book Property              📤    │
├─────────────────────────────────────┤
│ 🏠 Luxury Villa in The Pearl        │
│ ⭐ 4.9 (89 reviews)                │
│                                     │
│ 📅 Check-in:  [Dec 20, 2024 ▼]     │
│ 📅 Check-out: [Dec 25, 2024 ▼]     │
│                                     │
│ 👥 Guests: [-] 4 [+]                │
│                                     │
│ 💰 Price Breakdown:                 │
│    QAR 850 x 5 nights = QAR 4,250  │
│    Cleaning fee = QAR 150           │
│    Service fee = QAR 300            │
│    Taxes = QAR 200                  │
│    ─────────────────────────────    │
│    Total: QAR 4,900                 │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │        Confirm Booking          │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Map View Layout

```
┌─────────────────────────────────────┐
│ ← Map View                    🔍   │
├─────────────────────────────────────┤
│ 🗺️              📍QAR850           │
│                   Pearl             │
│     📍QAR650                       │
│       West Bay                      │
│                                     │
│         🔵 Your Location            │
│                                     │
│                   📍QAR1200        │
│                    Lusail           │
│                              🎯     │ ← My Location
│                                     │
├─────────────────────────────────────┤
│ 📊 3 properties found              │
└─────────────────────────────────────┘
```

---

## 🇶🇦 Qatar Market Features You'll See

### Currency & Localization
- All prices in QAR (Qatar Riyal) format
- Qatar-specific locations in dropdown
- Arabic language support (prepared)

### Map Integration  
- **Default location**: Doha, Qatar
- **Featured areas**: The Pearl, West Bay, Lusail
- **Local landmarks**: Katara, Education City, Aspire Zone

### Property Types
- **Villas**: Luxury properties in The Pearl
- **Apartments**: Modern units in West Bay  
- **Penthouses**: High-rise properties in Lusail
- **Traditional**: Properties in Al Rayyan

---

## 🛠️ Troubleshooting

### Common Issues

#### Metro Bundler Issues
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Reset Metro completely
rm -rf node_modules
npm install
npx react-native start --reset-cache
```

#### iOS Build Issues
```bash
# Clean iOS build
cd ios && xcodebuild clean && cd ..
rm -rf ios/build

# Reinstall pods
cd ios && pod deintegrate && pod install && cd ..
```

#### Android Build Issues
```bash
# Clean Android build
cd android && ./gradlew clean && cd ..

# Fix permissions (if needed)
chmod +x android/gradlew
```

#### Dependencies Issues
```bash
# Fix node modules
rm -rf node_modules package-lock.json
npm install

# Fix iOS dependencies
cd ios && pod deintegrate && pod install && cd ..
```

---

## 📱 Quick Start Commands

### For iOS (Recommended):
```bash
# 1. Install dependencies
brew install cocoapods
npm install -g @react-native-community/cli

# 2. Set up iOS
npx react-native init HouseianaTemp --skip-install
cp -r HouseianaTemp/ios ./
rm -rf HouseianaTemp
cd ios && pod install && cd ..

# 3. Run app
npm start
# In new terminal:
npx react-native run-ios
```

### For Quick Testing (Expo):
```bash
# 1. Install Expo
npm install -g @expo/cli

# 2. Start Expo
npx expo start

# 3. Use Expo Go app on phone to scan QR code
```

---

## 🎯 Expected Results

### Main App Features:
- ✅ Home screen with property search
- ✅ Property listings with Qatar locations  
- ✅ Interactive map with property markers
- ✅ Complete booking flow
- ✅ User profile and favorites
- ✅ Qatar-specific currency and locations

### Storybook Features:
- ✅ Interactive component playground
- ✅ Real-time prop editing
- ✅ 50+ component stories
- ✅ Design system documentation
- ✅ Qatar market customizations

### Performance:
- ✅ Smooth 60fps animations
- ✅ Fast property loading
- ✅ Responsive touch interactions
- ✅ Optimized images and maps

---

## 📞 Support

If you encounter issues:

1. **Check logs**: Look at Metro bundler output for errors
2. **Verify environment**: Ensure all tools are installed correctly  
3. **Clean and rebuild**: Clear caches and reinstall dependencies
4. **Use simulators first**: Easier than physical devices for testing

---

**Ready to see your Houseiana Mobile App in action!** 🚀📱

Choose your deployment option above and follow the steps to see the complete Qatar-focused property rental app with interactive booking, maps, and comprehensive UI components.