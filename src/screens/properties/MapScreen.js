import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import PropertyMapView from '../../components/MapView';
import propertiesService from '../../properties/propertiesService';
import { COLORS } from '../../shared/constants';

const MapScreen = ({ route, navigation }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Get initial data from route params
  const initialProperties = route.params?.properties || [];
  const initialSelectedProperty = route.params?.selectedProperty || null;
  const initialRegion = route.params?.region || null;
  const searchFilters = route.params?.filters || {};

  useEffect(() => {
    if (initialProperties.length > 0) {
      setProperties(initialProperties);
      setSelectedProperty(initialSelectedProperty);
      setLoading(false);
    } else {
      loadProperties();
    }
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const response = await propertiesService.getProperties(searchFilters);

      if (response.success) {
        // Filter properties that have location data
        const propertiesWithLocation = response.data.filter(
          (property) => property.latitude && property.longitude
        );
        setProperties(propertiesWithLocation);
      } else {
        Alert.alert('Error', 'Failed to load properties');
      }
    } catch (error) {
      console.error('Error loading properties:', error);
      Alert.alert('Error', 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const handlePropertyPress = (property) => {
    setSelectedProperty(property);

    // Navigate to property details after a short delay to show selection
    setTimeout(() => {
      navigation.navigate('PropertyDetail', {
        property,
        propertyId: property.id,
      });
    }, 300);
  };

  const handleLocationPress = (location) => {
    console.log('User location:', location);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <PropertyMapView
        properties={properties}
        selectedProperty={selectedProperty}
        showUserLocation={true}
        showPrices={true}
        onPropertyPress={handlePropertyPress}
        onLocationPress={handleLocationPress}
        initialRegion={initialRegion}
        style={styles.map}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
