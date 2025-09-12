import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import propertiesService from '../../properties/propertiesService';
import {COLORS, SPACING, FONT_SIZES} from '../../shared/constants';
import {formatPrice} from '../../shared/utils';

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const response = await propertiesService.getFavorites();
      setFavorites(response.data || []);
    } catch (error) {
      console.log('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (propertyId) => {
    Alert.alert(
      'Remove Favorite',
      'Are you sure you want to remove this property from your favorites?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              await propertiesService.toggleFavorite(propertyId);
              setFavorites(prev => prev.filter(item => item.id !== propertyId));
            } catch (error) {
              Alert.alert('Error', 'Failed to remove from favorites');
            }
          },
        },
      ]
    );
  };

  const renderFavorite = ({item}) => (
    <TouchableOpacity
      style={styles.propertyCard}
      onPress={() =>
        navigation.navigate('PropertyDetail', {propertyId: item.id})
      }>
      <View style={styles.cardContent}>
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyTitle}>{item.title}</Text>
          <Text style={styles.propertyLocation}>{item.location}</Text>
          <Text style={styles.propertyPrice}>{formatPrice(item.price)}/month</Text>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFavorite(item.id)}>
          <Icon name="favorite" size={24} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="favorite-border" size={64} color={COLORS.textSecondary} />
      <Text style={styles.emptyTitle}>No Favorites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Properties you favorite will appear here
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Properties')}>
        <Text style={styles.exploreButtonText}>Explore Properties</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={loadFavorites}
        ListEmptyComponent={loading ? null : renderEmptyState}
        contentContainerStyle={[
          styles.listContainer,
          favorites.length === 0 && styles.emptyListContainer,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: SPACING.md,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  propertyCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    padding: SPACING.md,
    alignItems: 'center',
  },
  propertyInfo: {
    flex: 1,
    marginRight: SPACING.md,
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
  removeButton: {
    padding: SPACING.xs,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
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
  exploreButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: 'bold',
  },
});

export default FavoritesScreen;