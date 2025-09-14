import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  RefreshControl,
  Modal,
  TextInput,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../shared/constants';
import { apiService } from '../../services/api';

const WishlistsScreen = ({ navigation }) => {
  const [wishlists, setWishlists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWishlistName, setNewWishlistName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadWishlists();
  }, []);

  const loadWishlists = async () => {
    try {
      const response = await apiService.getWishlists();
      setWishlists(response.data || mockWishlists);
    } catch (error) {
      // Use mock data for development
      setWishlists(mockWishlists);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadWishlists();
    setIsRefreshing(false);
  };

  const handleCreateWishlist = async () => {
    if (!newWishlistName.trim()) {
      Alert.alert('Error', 'Please enter a wishlist name');
      return;
    }

    setIsCreating(true);
    try {
      const response = await apiService.createWishlist({
        name: newWishlistName.trim(),
        description: '',
      });

      setWishlists((prev) => [response.data, ...prev]);
      setShowCreateModal(false);
      setNewWishlistName('');

      Alert.alert('Success', 'Wishlist created successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create wishlist');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteWishlist = (wishlistId, wishlistName) => {
    Alert.alert(
      'Delete Wishlist',
      `Are you sure you want to delete "${wishlistName}"? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiService.deleteWishlist(wishlistId);
              setWishlists((prev) => prev.filter((w) => w.id !== wishlistId));
            } catch (error) {
              Alert.alert('Error', 'Failed to delete wishlist');
            }
          },
        },
      ]
    );
  };

  const getWishlistImage = (wishlist) => {
    if (wishlist.properties && wishlist.properties.length > 0) {
      return wishlist.properties[0].image;
    }
    return null;
  };

  const renderWishlistItem = ({ item }) => (
    <TouchableOpacity
      style={styles.wishlistItem}
      onPress={() =>
        navigation.navigate('WishlistDetail', {
          wishlistId: item.id,
          wishlistName: item.name,
        })
      }
    >
      <View style={styles.wishlistImageContainer}>
        {getWishlistImage(item) ? (
          <Image
            source={{ uri: getWishlistImage(item) }}
            style={styles.wishlistImage}
          />
        ) : (
          <View style={styles.wishlistImagePlaceholder}>
            <Text style={styles.wishlistImagePlaceholderText}>❤️</Text>
          </View>
        )}
        <View style={styles.wishlistOverlay}>
          <Text style={styles.propertyCount}>
            {item.propertyCount || 0}{' '}
            {item.propertyCount === 1 ? 'property' : 'properties'}
          </Text>
        </View>
      </View>

      <View style={styles.wishlistContent}>
        <Text style={styles.wishlistName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.wishlistDescription} numberOfLines={2}>
          {item.description || 'No description'}
        </Text>
        <Text style={styles.wishlistDate}>
          Created {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.moreButton}
        onPress={() => handleDeleteWishlist(item.id, item.name)}
      >
        <Text style={styles.moreButtonText}>⋯</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>💖</Text>
      <Text style={styles.emptyStateTitle}>Create your first wishlist</Text>
      <Text style={styles.emptyStateText}>
        Organize your favorite properties into collections. Create a wishlist
        for your next trip, dream destinations, or special occasions.
      </Text>
      <TouchableOpacity
        style={styles.createFirstWishlistButton}
        onPress={() => setShowCreateModal(true)}
      >
        <Text style={styles.createFirstWishlistButtonText}>
          Create Wishlist
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderCreateModal = () => (
    <Modal
      visible={showCreateModal}
      animationType="slide"
      presentationStyle="formSheet"
      onRequestClose={() => setShowCreateModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            style={styles.modalCancelButton}
            onPress={() => {
              setShowCreateModal(false);
              setNewWishlistName('');
            }}
          >
            <Text style={styles.modalCancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Create Wishlist</Text>
          <TouchableOpacity
            style={[
              styles.modalCreateButton,
              !newWishlistName.trim() && styles.modalCreateButtonDisabled,
            ]}
            onPress={handleCreateWishlist}
            disabled={!newWishlistName.trim() || isCreating}
          >
            <Text
              style={[
                styles.modalCreateText,
                !newWishlistName.trim() && styles.modalCreateTextDisabled,
              ]}
            >
              {isCreating ? 'Creating...' : 'Create'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.modalContent}>
          <Text style={styles.inputLabel}>Wishlist name</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="e.g. Qatar Getaway, Business Travel, Dream Homes"
            value={newWishlistName}
            onChangeText={setNewWishlistName}
            maxLength={50}
            autoFocus={true}
            placeholderTextColor={COLORS.textSecondary}
          />
          <Text style={styles.characterCount}>{newWishlistName.length}/50</Text>

          <Text style={styles.tipText}>
            💡 Tip: Create specific wishlists like "Weekend Getaways" or "Family
            Trips" to organize your favorites better.
          </Text>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wishlists</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={wishlists}
        renderItem={renderWishlistItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContainer,
          wishlists.length === 0 && styles.emptyListContainer,
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />

      {renderCreateModal()}
    </View>
  );
};

// Mock data for development
const mockWishlists = [
  {
    id: '1',
    name: 'Qatar Business Trips',
    description: 'Properties perfect for business travelers in Doha',
    propertyCount: 5,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    properties: [
      {
        id: 'prop1',
        image:
          'https://images.unsplash.com/photo-1715168437311-18b9ec0830c1?w=400&h=300&fit=crop',
      },
    ],
  },
  {
    id: '2',
    name: 'Family Getaways',
    description: 'Family-friendly properties with pools and entertainment',
    propertyCount: 3,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    properties: [
      {
        id: 'prop2',
        image:
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      },
    ],
  },
  {
    id: '3',
    name: 'Luxury Stays',
    description: 'High-end properties for special occasions',
    propertyCount: 8,
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    properties: [
      {
        id: 'prop3',
        image:
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...TYPOGRAPHY.h1,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: SPACING.lg,
  },
  emptyListContainer: {
    flex: 1,
  },
  wishlistItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  wishlistImageContainer: {
    position: 'relative',
  },
  wishlistImage: {
    width: 100,
    height: 100,
  },
  wishlistImagePlaceholder: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistImagePlaceholderText: {
    fontSize: 32,
  },
  wishlistOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  propertyCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  wishlistContent: {
    flex: 1,
    padding: SPACING.md,
    justifyContent: 'space-between',
  },
  wishlistName: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  wishlistDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    flex: 1,
  },
  wishlistDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  moreButton: {
    padding: SPACING.md,
    justifyContent: 'center',
  },
  moreButtonText: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyStateIcon: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  emptyStateTitle: {
    ...TYPOGRAPHY.h2,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptyStateText: {
    ...TYPOGRAPHY.bodySmall,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.xl,
  },
  createFirstWishlistButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  createFirstWishlistButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalCancelButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  modalCancelText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  modalTitle: {
    ...TYPOGRAPHY.h3,
  },
  modalCreateButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  modalCreateButtonDisabled: {
    opacity: 0.5,
  },
  modalCreateText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  modalCreateTextDisabled: {
    color: COLORS.textSecondary,
  },
  modalContent: {
    padding: SPACING.lg,
  },
  inputLabel: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  nameInput: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  characterCount: {
    ...TYPOGRAPHY.caption,
    textAlign: 'right',
    marginBottom: SPACING.lg,
  },
  tipText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    borderRadius: 8,
    lineHeight: 18,
  },
});

export default WishlistsScreen;
