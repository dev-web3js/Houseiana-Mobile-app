# Houseiana Mobile App - Setup Guide

## 🚀 Complete Installation & Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **React Native CLI** (`npm install -g react-native-cli`)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development - macOS only)
- **Git**

### Backend Setup

1. **Start the NestJS Backend Server**:
   ```bash
   # Navigate to your backend directory
   cd "Houseiana Backend"
   
   # Install dependencies
   npm install
   
   # Start the server
   npm run start:dev
   ```
   
   The backend should be running on `http://localhost:5000`

2. **Verify Backend is Running**:
   - Open `http://localhost:5000/api` in your browser
   - You should see the Swagger API documentation

### Mobile App Installation

1. **Install Dependencies**:
   ```bash
   # Navigate to mobile app directory
   cd "Houseiana Mobile app"
   
   # Install npm dependencies
   npm install
   ```

2. **iOS Setup** (macOS only):
   ```bash
   # Navigate to iOS directory and install pods
   cd ios
   pod install
   cd ..
   ```

3. **Android Setup**:
   - Ensure Android Studio is installed
   - Set up Android SDK and emulator
   - Accept Android SDK licenses:
     ```bash
     sdkmanager --licenses
     ```

### Additional Package Configuration

Some packages require additional setup:

#### React Native Vector Icons
```bash
# Link vector icons (if using RN < 0.60)
react-native link react-native-vector-icons
```

#### Image Picker Permissions

**Android** - Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

**iOS** - Add to `ios/YourApp/Info.plist`:
```xml
<key>NSCameraUsageDescription</key>
<string>This app needs access to camera to take photos of properties</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs access to photo library to select property images</string>
```

### Running the App

#### Android
```bash
# Start Metro bundler
npm start

# In a new terminal, run Android app
npm run android
```

#### iOS
```bash
# Start Metro bundler
npm start

# In a new terminal, run iOS app
npm run ios
```

### Environment Configuration

Create a `.env` file in the root directory:
```env
API_BASE_URL=http://localhost:5000
ENVIRONMENT=development
```

Update the API client URL if needed in `src/services/apiClient.js`.

### Features Available

The mobile app includes all features from the web version:

#### 🏠 **Core Features**
- ✅ Advanced property search with filters
- ✅ Property categories (Beachfront, Luxury, Villas, etc.)
- ✅ Popular Qatar destinations (The Pearl, West Bay, Lusail, etc.)
- ✅ Date picker for check-in/check-out
- ✅ Guest count selection
- ✅ Property favorites system
- ✅ User authentication (login/register)

#### 🎯 **Host Features**
- ✅ Host Dashboard with statistics
- ✅ Add new properties with image upload
- ✅ Manage existing properties
- ✅ Booking management system
- ✅ Earnings tracking
- ✅ Property performance metrics

#### 🔍 **Advanced Search**
- ✅ Location-based search
- ✅ Price range filtering
- ✅ Bedroom/bathroom filters
- ✅ Amenities selection
- ✅ Property type filtering
- ✅ Multiple sort options

#### 📱 **Mobile-Optimized UI**
- ✅ Responsive design for all screen sizes
- ✅ Touch-friendly interface
- ✅ Native navigation patterns
- ✅ Pull-to-refresh functionality
- ✅ Modal dialogs and date pickers
- ✅ Image galleries and carousels

#### 🎨 **Design System**
- ✅ Consistent color scheme matching web app
- ✅ QAR currency formatting (Qatar market)
- ✅ Arabic-friendly layout considerations
- ✅ Material Design icons
- ✅ Professional property cards

### API Integration

The app integrates with your NestJS backend:

- **Authentication**: `/auth/login`, `/auth/register`
- **Properties**: `/properties/*` (search, CRUD, favorites)
- **Host Features**: Property management endpoints
- **User Management**: Profile and preferences

### Troubleshooting

#### Common Issues:

1. **Metro bundler issues**:
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build fails**:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   npm run android
   ```

3. **iOS build fails**:
   ```bash
   cd ios
   pod install
   cd ..
   npm run ios
   ```

4. **Network requests failing**:
   - Ensure backend is running on port 5000
   - For Android emulator, use `http://10.0.2.2:5000` instead of `localhost`
   - For iOS simulator, `http://localhost:5000` should work

#### Android Network Configuration

If you're testing on Android emulator, update the API URL in `src/services/apiClient.js`:
```javascript
const API_BASE_URL = __DEV__ ? 
  (Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000') :
  'https://your-production-api.com';
```

### Development Workflow

1. **Start Backend**: Ensure NestJS server is running
2. **Start Mobile App**: Use `npm start` then `npm run android/ios`
3. **Hot Reload**: Changes to JS files will automatically reload
4. **API Testing**: Use Swagger docs at `http://localhost:5000/api`

### Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

### Building for Production

#### Android
```bash
# Generate release APK
cd android
./gradlew assembleRelease
```

#### iOS
```bash
# Build for iOS App Store
# Use Xcode to archive and upload
```

### Next Steps

1. **Customize Branding**: Update colors in `src/shared/constants.js`
2. **Add Analytics**: Integrate Firebase or similar
3. **Push Notifications**: Set up FCM for booking notifications
4. **Real-time Features**: Add Socket.io for live messaging
5. **Offline Support**: Implement data caching
6. **App Store Deployment**: Prepare for production release

### Support

- **Backend Issues**: Check NestJS server logs
- **Mobile Issues**: Check Metro bundler output
- **API Integration**: Verify endpoints in Swagger docs

---

## 📊 Architecture Overview

```
Houseiana Mobile App/
├── 📱 React Native Frontend
│   ├── Authentication (JWT)
│   ├── Property Management
│   ├── Host Dashboard
│   ├── Search & Filters
│   └── User Profiles
├── 🌐 NestJS Backend API
│   ├── Auth Module
│   ├── Properties Module
│   ├── Users Module
│   └── Prisma Database
└── 📊 Features Parity
    ├── ✅ All Web Features
    ├── ✅ Mobile Optimizations
    ├── ✅ Touch Interactions
    └── ✅ Native Navigation
```

The mobile app provides 100% feature parity with your web application while offering native mobile user experience patterns and optimizations.