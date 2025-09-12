# Houseiana Mobile App 📱

A comprehensive React Native mobile application for property rental management in Qatar, featuring complete integration with the Houseiana platform.

## 🏠 Overview

Houseiana Mobile App is the mobile companion to the Houseiana web platform, providing users and property hosts with a seamless mobile experience for browsing, managing, and booking properties in Qatar's rental market.

## ✨ Key Features

### 🔍 **Property Discovery**
- Advanced search with location, dates, and guest filters
- Property categories (Beachfront, Luxury, Villas, etc.)
- Popular Qatar destinations (The Pearl, West Bay, Lusail)
- Interactive date pickers and guest selection
- Comprehensive property details with photos and amenities

### 🏡 **Host Management**
- Complete host dashboard with performance metrics
- Property creation with image upload capabilities
- Booking management and guest communication
- Revenue tracking and occupancy analytics
- Property listing management (edit/delete)

### 👤 **User Experience**
- Secure JWT authentication
- Property favorites and wishlist
- User profile management
- Real-time property search results
- Touch-optimized mobile interface

### 💱 **Qatar Market Focus**
- QAR currency formatting
- Local area coverage (Doha, West Bay, The Pearl, etc.)
- Arabic-friendly layout considerations
- Regional property types and amenities

## 🚀 Tech Stack

- **Frontend**: React Native 0.72.0 with JavaScript
- **Navigation**: React Navigation 6.x (Stack + Bottom Tabs)
- **State Management**: React Context API + AsyncStorage
- **HTTP Client**: Axios with JWT interceptors
- **UI Components**: React Native Paper, Vector Icons
- **Image Handling**: React Native Image Picker
- **Date Selection**: React Native Date Picker
- **Backend Integration**: NestJS API (http://localhost:5000)

## 📱 Screenshots & Demo

*[Screenshots will be added once the app is built and tested]*

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16+)
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS - macOS only)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/dev-web3js/Houseiana-Mobile-app.git

# Navigate to project directory
cd Houseiana-Mobile-app

# Install dependencies
npm install

# iOS setup (macOS only)
cd ios && pod install && cd ..

# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

### Backend Setup
Ensure the Houseiana NestJS backend is running:
```bash
# Start backend server
cd ../Houseiana-Backend
npm run start:dev
```
Backend should be accessible at `http://localhost:5000`

## 📁 Project Structure

```
src/
├── auth/                 # Authentication context and services
├── components/           # Reusable UI components
├── navigation/           # App navigation configuration
├── properties/           # Property-related services
├── screens/             # Screen components
│   ├── auth/            # Login/Register screens
│   ├── home/            # Enhanced home screen
│   ├── host/            # Host management screens
│   ├── properties/      # Property browsing screens
│   ├── profile/         # User profile screens
│   └── search/          # Advanced search screens
├── services/            # API clients and utilities
└── shared/              # Constants, utilities, and helpers
```

## 🔗 API Integration

The mobile app integrates seamlessly with the Houseiana NestJS backend:

- **Authentication**: `/auth/login`, `/auth/register`, `/auth/profile`
- **Properties**: `/properties/*` (search, CRUD, favorites)
- **Host Features**: Property and booking management endpoints
- **User Management**: Profile and preference endpoints

## 🎯 Key Screens

### Main User Flow
1. **Enhanced Home Screen** - Property search with categories and destinations
2. **Advanced Search** - Comprehensive filtering and sorting options
3. **Property Details** - Full property information with booking options
4. **Favorites** - Saved properties management

### Host Flow
1. **Host Dashboard** - Performance metrics and quick actions
2. **Add Property** - Complete property creation with images
3. **My Properties** - Property management and statistics
4. **Bookings** - Guest booking management and communication

### Authentication
1. **Login Screen** - Secure user authentication
2. **Register Screen** - New user registration with validation

## 🌟 Features Highlights

### 📊 **Host Dashboard**
- Property count and performance metrics
- Active bookings and revenue tracking
- Quick access to management functions
- Occupancy rates and guest ratings

### 🔍 **Advanced Search**
- Location-based property search
- Date range selection with validation
- Guest count and room specifications
- Price range and amenity filtering
- Multiple sorting options

### 📱 **Mobile-Optimized**
- Touch-friendly interface design
- Native navigation patterns
- Pull-to-refresh functionality
- Modal dialogs and date pickers
- Responsive layout for all screen sizes

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test suite
npm test -- --testPathPattern=auth
```

## 🚀 Deployment

### Android
```bash
# Generate release APK
cd android
./gradlew assembleRelease
```

### iOS
```bash
# Build for App Store using Xcode
# Archive and upload through Xcode
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Comprehensive installation instructions
- [Project Documentation](PROJECT_DOCUMENTATION.md) - Complete development log
- [API Documentation](http://localhost:5000/api) - Backend API reference

## 🐛 Troubleshooting

### Common Issues
- **Metro bundler cache issues**: `npx react-native start --reset-cache`
- **Android build fails**: Clean gradle cache in `android/` directory
- **iOS build fails**: Run `pod install` in `ios/` directory
- **Network requests fail**: Verify backend is running on port 5000

### Android Network Configuration
For Android emulator, the API URL should use `http://10.0.2.2:5000` instead of `localhost`.

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/dev-web3js/Houseiana-Mobile-app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/dev-web3js/Houseiana-Mobile-app/discussions)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React Native for cross-platform compatibility
- Integrates with the Houseiana NestJS backend platform
- Designed for the Qatar property rental market
- Optimized for mobile-first user experience

---

**Houseiana Mobile App** - Bringing Qatar's premier property rental platform to your mobile device! 🏠📱