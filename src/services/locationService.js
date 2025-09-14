import Geolocation from "react-native-geolocation-service";
import { Platform, Alert, Linking } from "react-native";
import { request, check, PERMISSIONS, RESULTS } from "react-native-permissions";
import AsyncStorage from "@react-native-async-storage/async-storage";

class LocationService {
  constructor() {
    this.watchId = null;
    this.currentLocation = null;
  }

  // Check if location permissions are granted
  async checkPermissions() {
    try {
      const permission =
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await check(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log("Error checking location permissions:", error);
      return false;
    }
  }

  // Request location permissions
  async requestPermissions() {
    try {
      const permission =
        Platform.OS === "ios"
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await request(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log("Error requesting location permissions:", error);
      return false;
    }
  }

  // Prompt user for location permissions with explanation
  async promptForPermissions(reason = "location-based search") {
    const hasPermission = await this.checkPermissions();

    if (hasPermission) {
      return true;
    }

    const reasons = {
      "location-based-search": {
        title: "Enable Location Access",
        message:
          "Find properties near you and get personalized recommendations based on your location.",
      },
      "property-directions": {
        title: "Location Access Required",
        message: "We need your location to provide directions to the property.",
      },
      "nearby-amenities": {
        title: "Find Nearby Places",
        message:
          "Discover restaurants, attractions, and amenities near your accommodation.",
      },
    };

    const config = reasons[reason] || reasons["location-based-search"];

    return new Promise((resolve) => {
      Alert.alert(config.title, config.message, [
        {
          text: "Not Now",
          style: "cancel",
          onPress: () => resolve(false),
        },
        {
          text: "Allow",
          onPress: async () => {
            const granted = await this.requestPermissions();
            if (!granted) {
              Alert.alert(
                "Permission Denied",
                "To use location features, please enable location access in Settings.",
                [
                  { text: "Cancel", onPress: () => resolve(false) },
                  {
                    text: "Open Settings",
                    onPress: () => {
                      Linking.openSettings();
                      resolve(false);
                    },
                  },
                ]
              );
            } else {
              resolve(true);
            }
          },
        },
      ]);
    });
  }

  // Get current location
  async getCurrentLocation(options = {}) {
    const hasPermission = await this.checkPermissions();

    if (!hasPermission) {
      const granted = await this.promptForPermissions("location-based-search");
      if (!granted) {
        throw new Error("Location permission denied");
      }
    }

    const defaultOptions = {
      accuracy: {
        android: "high",
        ios: "best",
      },
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      distanceFilter: 0,
      forceRequestLocation: true,
      forceLocationManager: false,
      showLocationDialog: true,
      ...options,
    };

    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          };

          this.saveLastKnownLocation(this.currentLocation);
          resolve(this.currentLocation);
        },
        (error) => {
          console.log("Location error:", error);

          // Try to get last known location as fallback
          this.getLastKnownLocation().then((lastLocation) => {
            if (lastLocation) {
              resolve(lastLocation);
            } else {
              reject(new Error(this.getLocationErrorMessage(error.code)));
            }
          });
        },
        defaultOptions
      );
    });
  }

  // Watch location changes
  async watchLocation(callback, options = {}) {
    const hasPermission = await this.checkPermissions();

    if (!hasPermission) {
      throw new Error("Location permission denied");
    }

    const defaultOptions = {
      accuracy: {
        android: "high",
        ios: "best",
      },
      enableHighAccuracy: true,
      distanceFilter: 10, // Update every 10 meters
      interval: 5000, // Update every 5 seconds
      fastestInterval: 2000,
      forceRequestLocation: true,
      forceLocationManager: false,
      showLocationDialog: true,
      ...options,
    };

    this.watchId = Geolocation.watchPosition(
      (position) => {
        this.currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };

        this.saveLastKnownLocation(this.currentLocation);
        callback(this.currentLocation);
      },
      (error) => {
        console.log("Location watch error:", error);
        callback(null, new Error(this.getLocationErrorMessage(error.code)));
      },
      defaultOptions
    );

    return this.watchId;
  }

  // Stop watching location
  stopWatchingLocation() {
    if (this.watchId !== null) {
      Geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  // Save last known location for offline use
  async saveLastKnownLocation(location) {
    try {
      await AsyncStorage.setItem(
        "last_known_location",
        JSON.stringify(location)
      );
    } catch (error) {
      console.log("Error saving location:", error);
    }
  }

  // Get last known location
  async getLastKnownLocation() {
    try {
      const location = await AsyncStorage.getItem("last_known_location");
      return location ? JSON.parse(location) : null;
    } catch (error) {
      console.log("Error getting last known location:", error);
      return null;
    }
  }

  // Calculate distance between two points (in kilometers)
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Get properties within radius
  async getNearbyProperties(properties, radiusKm = 10) {
    try {
      const userLocation = await this.getCurrentLocation();

      return properties
        .filter((property) => {
          if (!property.latitude || !property.longitude) {
            return false;
          }

          const distance = this.calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            property.latitude,
            property.longitude
          );

        return distance <= radiusKm;
        })
        .map((property) => ({
          ...property,
          distance: this.calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            property.latitude,
            property.longitude
          ),
        }))
        .sort((a, b) => a.distance - b.distance);
    } catch (error) {
      console.log("Error getting nearby properties:", error);
      return properties; // Return all properties if location fails
    }
  }

  // Get location from address (geocoding)
  async geocodeAddress(address) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng,
          address: data.results[0].formatted_address,
        };
      }

      throw new Error("Address not found");
    } catch (error) {
      console.log("Geocoding error:", error);
      throw error;
    }
  }

  // Get address from coordinates (reverse geocoding)
  async reverseGeocode(latitude, longitude) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        return {
          address: data.results[0].formatted_address,
          components: data.results[0].address_components,
        };
      }

      throw new Error("Address not found");
    } catch (error) {
      console.log("Reverse geocoding error:", error);
      throw error;
    }
  }

  // Open maps app for directions
  openDirections(
    destinationLat,
    destinationLng,
    destinationName = "Destination"
  ) {
    const destination = `${destinationLat},${destinationLng}`;

    const urls = {
      ios: `maps://app?daddr=${destination}&dirflg=d`,
      android: `google.navigation:q=${destination}`,
    };

    const url = Platform.OS === "ios" ? urls.ios : urls.android;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          // Fallback to Google Maps web
          const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
          return Linking.openURL(webUrl);
        }
      })
      .catch((err) => {
        console.log("Error opening maps:", err);
        Alert.alert("Error", "Could not open maps application");
      });
  }

  // Get location-based search suggestions
  async getLocationSuggestions(query, userLocation = null) {
    try {
      if (!userLocation) {
        userLocation = await this.getCurrentLocation();
      }

      // Qatar-specific locations with coordinates
      const qatarLocations = [
        {
          name: "The Pearl",
          latitude: 25.37,
          longitude: 51.5373,
          type: "district",
        },
        {
          name: "West Bay",
          latitude: 25.3208,
          longitude: 51.5127,
          type: "district",
        },
        { name: "Lusail", latitude: 25.4378, longitude: 51.4911, type: "city" },
        {
          name: "Al Waab",
          latitude: 25.3192,
          longitude: 51.4361,
          type: "district",
        },
        {
          name: "Al Rayyan",
          latitude: 25.2919,
          longitude: 51.4265,
          type: "city",
        },
        {
          name: "Al Wakrah",
          latitude: 25.1658,
          longitude: 51.6042,
          type: "city",
        },
        {
          name: "Doha Downtown",
          latitude: 25.2854,
          longitude: 51.531,
          type: "district",
        },
        { name: "Katara", latitude: 25.3778, longitude: 51.5304, type: "area" },
        {
          name: "Aspire Zone",
          latitude: 25.2709,
          longitude: 51.4921,
          type: "area",
        },
        {
          name: "Education City",
          latitude: 25.3147,
          longitude: 51.4397,
          type: "area",
        },
      ];

      const filtered = qatarLocations.filter((location) =>
        location.name.toLowerCase().includes(query.toLowerCase())
      );

      // Add distance information if user location available
      return filtered
        .map((location) => ({
          ...location,
          distance: userLocation
            ? this.calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                location.latitude,
                location.longitude
              )
            : null,
        }))
        .sort((a, b) => {
          if (a.distance && b.distance) {
            return a.distance - b.distance;
          }
          return a.name.localeCompare(b.name);
        });
    } catch (error) {
      console.log("Error getting location suggestions:", error);
      return [];
    }
  }

  // Error message helper
  getLocationErrorMessage(errorCode) {
    switch (errorCode) {
      case 1:
        return "Location access denied. Please enable location permissions in Settings.";
      case 2:
        return "Location unavailable. Please try again.";
      case 3:
        return "Location request timed out. Please try again.";
      default:
        return "Unable to get your location. Please try again.";
    }
  }

  // Check if location services are enabled
  async isLocationEnabled() {
    try {
      const enabled = await Geolocation.isLocationEnabled();
      return enabled;
    } catch (error) {
      console.log("Error checking location services:", error);
      return false;
    }
  }

  // Prompt user to enable location services
  async promptToEnableLocation() {
    const enabled = await this.isLocationEnabled();

    if (!enabled) {
      Alert.alert(
        "Location Services Disabled",
        "Please enable location services in your device settings to use location-based features.",
        [
          { text: "Cancel" },
          { text: "Settings", onPress: () => Linking.openSettings() },
        ]
      );
    }

    return enabled;
  }

  // Get current city/area name
  async getCurrentArea() {
    try {
      const location = await this.getCurrentLocation();
      const address = await this.reverseGeocode(
        location.latitude,
        location.longitude

      // Extract city/area from address components
      const cityComponent = address.components.find(
        (component) =>
          component.types.includes("locality") ||
          component.types.includes("administrative_area_level_1")
      );

      return cityComponent ? cityComponent.long_name : "Qatar";
    } catch (error) {
      console.log("Error getting current area:", error);
      return "Qatar"; // Default fallback
    }
  }

  // Clean up
  destroy() {
    this.stopWatchingLocation();
    this.currentLocation = null;
  }
}

// Create singleton instance
const locationService = new LocationService();

export default locationService;
