import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import propertiesService from '../../properties/propertiesService';
import {COLORS, SPACING, FONT_SIZES} from '../../shared/constants';
import {formatPrice} from '../../shared/utils';

const MyPropertiesScreen = ({navigation}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMyProperties();
  }, []);

  const loadMyProperties = async () => {
    try {
      const response = await propertiesService.getMyProperties();
      setProperties(response.data || []);
    } catch (error) {
      console.log('Failed to load properties:', error);
      Alert.alert('Error', 'Failed to load your properties');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadMyProperties();
  };

  const handleEditProperty = (propertyId) => {
    navigation.navigate('EditProperty', {propertyId});
  };

  const handleDeleteProperty = (property) => {
    Alert.alert(
      'Delete Property',
      `Are you sure you want to delete "${property.title}"? This action cannot be undone.`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await propertiesService.deleteProperty(property.id);
              setProperties(prev => prev.filter(p => p.id !== property.id));
              Alert.alert('Success', 'Property has been deleted');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete property');
            }
          }
        }
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'inactive': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'Pending Review';
      case 'inactive': return 'Inactive';
      default: return 'Unknown';
    }
  };

  const renderPropertyCard = (property) => (
    <View key={property.id} style={styles.propertyCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('PropertyDetail', {propertyId: property.id})}>
        <Image 
          source={{
            uri: property.photos?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
          }} 
          style={styles.propertyImage} 
        />
      </TouchableOpacity>
      
      <View style={styles.propertyInfo}>
        <View style={styles.propertyHeader}>
          <View style={styles.titleContainer}>
            <Text style={styles.propertyTitle} numberOfLines={2}>
              {property.title}
            </Text>
            <Text style={styles.propertyLocation}>
              {property.area}, {property.city}
            </Text>
          </View>
          
          <View style={[styles.statusBadge, {backgroundColor: getStatusColor(property.status)}]}>
            <Text style={styles.statusText}>{getStatusText(property.status)}</Text>
          </View>
        </View>

        <View style={styles.propertyStats}>
          <View style={styles.statItem}>
            <Icon name="visibility" size={16} color="#6b7280" />
            <Text style={styles.statText}>{property.views || 0} views</Text>
          </View>
          
          <View style={styles.statItem}>
            <Icon name="favorite" size={16} color="#6b7280" />
            <Text style={styles.statText}>{property.favoriteCount || 0} favorites</Text>
          </View>
          
          <View style={styles.statItem}>
            <Icon name="event" size={16} color="#6b7280" />
            <Text style={styles.statText}>{property.bookings || 0} bookings</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.propertyPrice}>
            {formatPrice(property.price)} / night
          </Text>
          {property.monthlyPrice && (
            <Text style={styles.monthlyPrice}>
              {formatPrice(property.monthlyPrice)} / month
            </Text>
          )}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => handleEditProperty(property.id)}>
            <Icon name="edit" size={16} color={COLORS.primary} />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.viewButton]}
            onPress={() => navigation.navigate('PropertyDetail', {propertyId: property.id})}>
            <Icon name="visibility" size={16} color="#10b981" />
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDeleteProperty(property)}>
            <Icon name="delete" size={16} color="#ef4444" />
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="home-work" size={80} color="#d1d5db" />
      <Text style={styles.emptyTitle}>No Properties Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start earning by adding your first property
      </Text>
      <TouchableOpacity
        style={styles.addFirstPropertyButton}
        onPress={() => navigation.navigate('AddProperty')}>
        <Text style={styles.addFirstPropertyText}>Add Your First Property</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => {
    const totalViews = properties.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalFavorites = properties.reduce((sum, p) => sum + (p.favoriteCount || 0), 0);
    const totalBookings = properties.reduce((sum, p) => sum + (p.bookings || 0), 0);
    const activeProperties = properties.filter(p => p.status === 'active').length;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{activeProperties}</Text>
          <Text style={styles.statLabel}>Active</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalViews}</Text>
          <Text style={styles.statLabel}>Total Views</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalFavorites}</Text>
          <Text style={styles.statLabel}>Favorites</Text>
        </View>
        
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalBookings}</Text>
          <Text style={styles.statLabel}>Bookings</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>My Properties</Text>
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProperty')}>
          <Icon name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        
        {properties.length > 0 && renderStats()}
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading properties...</Text>
          </View>
        ) : properties.length > 0 ? (
          <View style={styles.propertiesList}>
            {properties.map(renderPropertyCard)}
          </View>
        ) : (
          renderEmptyState()
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 1,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    marginVertical: SPACING.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  propertiesList: {
    paddingBottom: SPACING.xl,
  },
  propertyCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: 180,
  },
  propertyInfo: {
    padding: SPACING.md,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  titleContainer: {
    flex: 1,
    marginRight: SPACING.md,
  },
  propertyTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  propertyLocation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.background,
    fontWeight: '600',
  },
  propertyStats: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
    gap: SPACING.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statText: {
    fontSize: FONT_SIZES.xs,
    color: '#6b7280',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  propertyPrice: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  monthlyPrice: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.xs,
  },
  editButton: {
    backgroundColor: '#eff6ff',
  },
  editButtonText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#f0fdf4',
  },
  viewButtonText: {
    fontSize: FONT_SIZES.xs,
    color: '#10b981',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#fef2f2',
  },
  deleteButtonText: {
    fontSize: FONT_SIZES.xs,
    color: '#ef4444',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  addFirstPropertyButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 8,
  },
  addFirstPropertyText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default MyPropertiesScreen;