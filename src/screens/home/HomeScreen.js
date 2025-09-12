import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useAuth} from '../../auth/AuthContext';
import propertiesService from '../../properties/propertiesService';
import {COLORS, SPACING, FONT_SIZES} from '../../shared/constants';

const HomeScreen = ({navigation}) => {
  const {user} = useAuth();
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    try {
      const response = await propertiesService.getProperties({
        limit: 5,
        sortBy: 'views',
        sortOrder: 'desc',
      });
      setFeaturedProperties(response.data || []);
    } catch (error) {
      console.log('Failed to load featured properties:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Welcome back, {user?.name || 'Guest'}!
        </Text>
        <Text style={styles.subtitle}>
          Find your perfect property
        </Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Properties')}>
          <Text style={styles.actionTitle}>Search Properties</Text>
          <Text style={styles.actionSubtitle}>Browse available listings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Favorites')}>
          <Text style={styles.actionTitle}>My Favorites</Text>
          <Text style={styles.actionSubtitle}>View saved properties</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Properties</Text>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : featuredProperties.length > 0 ? (
          featuredProperties.map((property) => (
            <TouchableOpacity
              key={property.id}
              style={styles.propertyCard}
              onPress={() =>
                navigation.navigate('PropertyDetail', {propertyId: property.id})
              }>
              <Text style={styles.propertyTitle}>{property.title}</Text>
              <Text style={styles.propertyLocation}>{property.location}</Text>
              <Text style={styles.propertyPrice}>${property.price}/month</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No featured properties available</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    backgroundColor: COLORS.primary,
  },
  greeting: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    color: COLORS.background,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.background,
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    padding: SPACING.md,
    justifyContent: 'space-between',
  },
  actionCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    marginHorizontal: SPACING.xs,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  actionSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  section: {
    padding: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
  propertyCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  propertyTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  propertyLocation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  propertyPrice: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});

export default HomeScreen;