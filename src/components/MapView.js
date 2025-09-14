import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Callout,
  Circle,
} from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import locationService from "../services/locationService";
import { COLORS, SPACING, FONT_SIZES } from "../shared/constants";
import { formatPrice } from "../shared/utils";

const { width, height } = Dimensions.get("window");

const PropertyMapView = ({
  properties = [],
  selectedProperty = null,
  showUserLocation = true,
  showPrices = true,
  onPropertyPress = null,
  onLocationPress = null,
  style = {},
  initialRegion = null,
  searchRadius = null, // in kilometers
}) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  // Default region for Qatar
  const defaultRegion = {
    latitude: 25.2854, // Doha
    longitude: 51.531,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
  };

  useEffect(() => {
    if (initialRegion) {
      setRegion(initialRegion);
    } else if (properties.length > 0) {
      // Calculate region to fit all properties
      const propertyCoords = properties.filter(
        (p) => p.latitude && p.longitude
      );
      if (propertyCoords.length > 0) {
        const coordinates = propertyCoords.map((p) => ({
          latitude: p.latitude,
          longitude: p.longitude,
        }));
        fitToProperties(coordinates);
      } else {
        setRegion(defaultRegion);
      }
    } else {
      // Try to get user location
      getUserLocation();
    }
  }, [properties, initialRegion]);

  useEffect(() => {
    if (
      selectedProperty &&
      selectedProperty.latitude &&
      selectedProperty.longitude &&
      mapReady
    ) {
      // Animate to selected property
      mapRef.current?.animateToRegion(
        {
          latitude: selectedProperty.latitude,
          longitude: selectedProperty.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [selectedProperty, mapReady]);

  const getUserLocation = async () => {
    try {
      const location = await locationService.getCurrentLocation();
      setUserLocation(location);

      if (!region) {
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      }
    } catch (error) {
      console.log("Could not get user location:", error);
      setRegion(defaultRegion);
    }
  };

  const fitToProperties = (coordinates) => {
    if (coordinates.length === 1) {
      // Single property
      setRegion({
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } else if (coordinates.length > 1) {
      // Multiple properties - calculate bounding box
      const lats = coordinates.map((c) => c.latitude);
      const lngs = coordinates.map((c) => c.longitude);

      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;
      const deltaLat = (maxLat - minLat) * 1.2; // Add 20% padding
      const deltaLng = (maxLng - minLng) * 1.2;

      setRegion({
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: Math.max(deltaLat, 0.01),
        longitudeDelta: Math.max(deltaLng, 0.01),
      });
    }
  };

  const handleMyLocationPress = async () => {
    try {
      const location = await locationService.getCurrentLocation();
      setUserLocation(location);

      mapRef.current?.animateToRegion(
        {
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000

      if (onLocationPress) {
        onLocationPress(location);
      }
    } catch (error) {
      Alert.alert("Location Error", "Could not get your current location");
    }
  };

  const handlePropertyPress = (property) => {
    if (onPropertyPress) {
      onPropertyPress(property);
    }
  };

  const getDirections = (property) => {
    if (property.latitude && property.longitude) {
      locationService.openDirections(
        property.latitude,
        property.longitude,
        property.title
      );
    }
  };

  const renderPropertyMarker = (property, index) => {
    if (!property.latitude || !property.longitude) {return null;}

    const isSelected = selectedProperty && selectedProperty.id === property.id;

    return (
      <Marker
        key={property.id || index}
        coordinate={{
          latitude: property.latitude,
          longitude: property.longitude,
        }}
        onPress={() => handlePropertyPress(property)}
        pinColor={isSelected ? COLORS.secondary : COLORS.primary}
      >
        {showPrices && (
          <View
            style={[
              styles.priceMarker,
              isSelected && styles.priceMarkerSelected,
            ]}
          >
            <Text
              style={[styles.priceText, isSelected && styles.priceTextSelected]}
            >
              {formatPrice(property.price)}
            </Text>
          </View>
        )}

        <Callout onPress={() => handlePropertyPress(property)}>
          <View style={styles.callout}>
            <Text style={styles.calloutTitle} numberOfLines={2}>
              {property.title}
            </Text>
            <Text style={styles.calloutLocation}>
              {property.area}, {property.city}
            </Text>
            <Text style={styles.calloutPrice}>
              {formatPrice(property.price)} / night
            </Text>
            <View style={styles.calloutActions}>
              <TouchableOpacity
                style={styles.calloutButton}
                onPress={() => getDirections(property)}
              >
                <Icon name="directions" size={16} color={COLORS.primary} />
                <Text style={styles.calloutButtonText}>Directions</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Callout>
      </Marker>
    );
  };

  const renderUserLocationMarker = () => {
    if (!showUserLocation || !userLocation) {return null;}

    return (
      <Marker
        coordinate={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        title="Your Location"
        pinColor={COLORS.success}
      >
        <View style={styles.userLocationMarker}>
          <View style={styles.userLocationDot} />
        </View>
      </Marker>
    );
  };

  const renderSearchRadius = () => {
    if (!searchRadius || !userLocation) {return null;}

    return (
      <Circle
        center={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }}
        radius={searchRadius * 1000} // Convert km to meters
        strokeColor={COLORS.primary}
        strokeWidth={2}
        fillColor="rgba(33, 150, 243, 0.1)"
      />
    );
  };

  if (!region) {
    return (
      <View style={[styles.container, styles.loadingContainer, style]}>
        <Text style={styles.loadingText}>Loading map...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        onMapReady={() => setMapReady(true)}
        showsUserLocation={showUserLocation}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        showsBuildings={true}
        showsTraffic={false}
        mapType="standard"
      >
        {properties.map(renderPropertyMarker)}
        {renderUserLocationMarker()}
        {renderSearchRadius()}
      </MapView>

      {/* Controls */}
      <View style={styles.controls}>
        {showUserLocation && (
          <TouchableOpacity
            style={styles.myLocationButton}
            onPress={handleMyLocationPress}
          >
            <Icon name="my-location" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Property Count */}
      {properties.length > 0 && (
        <View style={styles.propertyCount}>
          <Text style={styles.propertyCountText}>
            {properties.length} propert{properties.length === 1 ? "y" : "ies"}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  map: {
    flex: 1,
  },
  controls: {
    position: "absolute",
    right: SPACING.md,
    bottom: SPACING.lg,
    gap: SPACING.sm,
  },
  myLocationButton: {
    backgroundColor: COLORS.background,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  propertyCount: {
    position: "absolute",
    top: SPACING.md,
    left: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  propertyCountText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.text,
  },
  priceMarker: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    marginBottom: 5,
  },
  priceMarkerSelected: {
    backgroundColor: COLORS.secondary,
  },
  priceText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.xs,
    fontWeight: "600",
  },
  priceTextSelected: {
    color: COLORS.text,
  },
  userLocationMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(33, 150, 243, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  userLocationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  callout: {
    minWidth: 200,
    padding: SPACING.sm,
  },
  calloutTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  calloutLocation: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  calloutPrice: {
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: SPACING.sm,
  },
  calloutActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  calloutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    paddingVertical: SPACING.xs,
  },
  calloutButtonText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: "500",
  },
});

export default PropertyMapView;
