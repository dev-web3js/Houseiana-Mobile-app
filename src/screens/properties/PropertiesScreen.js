import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import propertiesService from '../../properties/propertiesService';
import {COLORS, SPACING, FONT_SIZES} from '../../shared/constants';
import {formatPrice} from '../../shared/utils';

const PropertiesScreen = ({navigation}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadProperties();
  }, [searchQuery, filters]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const response = await propertiesService.getProperties({
        search: searchQuery,
        ...filters,
      });
      setProperties(response.data || []);
    } catch (error) {
      console.log('Failed to load properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderProperty = ({item}) => (
    <TouchableOpacity
      style={styles.propertyCard}
      onPress={() =>
        navigation.navigate('PropertyDetail', {propertyId: item.id})
      }>
      <Text style={styles.propertyTitle}>{item.title}</Text>
      <Text style={styles.propertyLocation}>{item.location}</Text>
      <Text style={styles.propertyDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.propertyFooter}>
        <Text style={styles.propertyPrice}>{formatPrice(item.price)}/month</Text>
        <Text style={styles.propertyType}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search properties..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={properties}
        renderItem={renderProperty}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={loadProperties}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {loading ? 'Loading properties...' : 'No properties found'}
          </Text>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONT_SIZES.md,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: SPACING.md,
  },
  propertyCard: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  propertyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  propertyLocation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  propertyDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  propertyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  propertyPrice: {
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  propertyType: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textTransform: 'capitalize',
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});

export default PropertiesScreen;