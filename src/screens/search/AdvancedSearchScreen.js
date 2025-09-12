import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import Modal from 'react-native-modal';
import propertiesService from '../../properties/propertiesService';
import {COLORS, SPACING, FONT_SIZES, CATEGORIES, SORT_OPTIONS} from '../../shared/constants';
import {formatPrice} from '../../shared/utils';

const AdvancedSearchScreen = ({navigation, route}) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    category: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: 'all',
    amenities: [],
    sortBy: 'relevance',
    ...route.params?.searchParams,
  });
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortModal, setShowSortModal] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  
  const amenitiesOptions = [
    'WiFi', 'Kitchen', 'Parking', 'Pool', 'Gym', 'AC', 'Heating',
    'TV', 'Washer', 'Balcony', 'Garden', 'Security', 'Elevator'
  ];

  useEffect(() => {
    searchProperties();
  }, [searchParams]);

  const searchProperties = async () => {
    setLoading(true);
    try {
      const filters = {
        ...searchParams,
        category: searchParams.category !== 'all' ? searchParams.category : undefined,
        propertyType: searchParams.propertyType !== 'all' ? searchParams.propertyType : undefined,
        minPrice: searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined,
        maxPrice: searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined,
        bedrooms: searchParams.bedrooms ? parseInt(searchParams.bedrooms) : undefined,
        bathrooms: searchParams.bathrooms ? parseInt(searchParams.bathrooms) : undefined,
        guests: searchParams.guests ? parseInt(searchParams.guests) : undefined,
      };

      // Remove empty values
      Object.keys(filters).forEach(key => {
        if (!filters[key] || (Array.isArray(filters[key]) && filters[key].length === 0)) {
          delete filters[key];
        }
      });

      const response = await propertiesService.getProperties(filters);
      setProperties(response.data || []);
      setTotalResults(response.total || response.data?.length || 0);
    } catch (error) {
      console.log('Search failed:', error);
      Alert.alert('Error', 'Failed to search properties');
    } finally {
      setLoading(false);
    }
  };

  const updateSearchParam = (key, value) => {
    setSearchParams(prev => ({...prev, [key]: value}));
  };

  const toggleAmenity = (amenity) => {
    setSearchParams(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const clearFilters = () => {
    setSearchParams({
      location: searchParams.location,
      checkIn: searchParams.checkIn,
      checkOut: searchParams.checkOut,
      guests: searchParams.guests,
      category: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: 'all',
      amenities: [],
      sortBy: 'relevance',
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchParams.category !== 'all') count++;
    if (searchParams.minPrice || searchParams.maxPrice) count++;
    if (searchParams.bedrooms) count++;
    if (searchParams.bathrooms) count++;
    if (searchParams.propertyType !== 'all') count++;
    if (searchParams.amenities.length > 0) count++;
    return count;
  };

  const renderSearchHeader = () => (
    <View style={styles.searchHeader}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>
      
      <View style={styles.searchInputContainer}>
        <Icon name="search" size={20} color="#717171" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search location..."
          value={searchParams.location}
          onChangeText={(value) => updateSearchParam('location', value)}
          returnKeyType="search"
          onSubmitEditing={searchProperties}
        />
      </View>
    </View>
  );

  const renderFiltersBar = () => (
    <View style={styles.filtersBar}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.filterChip, getActiveFiltersCount() > 0 && styles.filterChipActive]}
          onPress={() => setShowFilters(true)}>
          <Icon name="tune" size={16} color={getActiveFiltersCount() > 0 ? 'white' : COLORS.text} />
          <Text style={[styles.filterChipText, getActiveFiltersCount() > 0 && styles.filterChipTextActive]}>
            Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.filterChip}
          onPress={() => setShowSortModal(true)}>
          <Icon name="sort" size={16} color={COLORS.text} />
          <Text style={styles.filterChipText}>Sort</Text>
        </TouchableOpacity>

        {CATEGORIES.slice(0, 6).map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.filterChip,
              searchParams.category === category.id && styles.filterChipActive,
            ]}
            onPress={() => updateSearchParam('category', category.id)}>
            <Text style={styles.categoryEmoji}>{category.icon}</Text>
            <Text style={[
              styles.filterChipText,
              searchParams.category === category.id && styles.filterChipTextActive,
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderResultsHeader = () => (
    <View style={styles.resultsHeader}>
      <Text style={styles.resultsCount}>
        {totalResults} {totalResults === 1 ? 'property' : 'properties'} found
      </Text>
      {searchParams.location && (
        <Text style={styles.searchLocation}>in {searchParams.location}</Text>
      )}
    </View>
  );

  const renderPropertyCard = ({item}) => (
    <TouchableOpacity
      style={styles.propertyCard}
      onPress={() => navigation.navigate('PropertyDetail', {propertyId: item.id})}>
      <Image 
        source={{
          uri: item.photos?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
        }} 
        style={styles.propertyImage} 
      />
      
      <TouchableOpacity style={styles.favoriteButton}>
        <Icon name="favorite-border" size={20} color="white" />
      </TouchableOpacity>
      
      <View style={styles.propertyInfo}>
        <View style={styles.propertyHeader}>
          <Text style={styles.propertyTitle} numberOfLines={1}>
            {item.title}
          </Text>
          {item.averageRating > 0 && (
            <View style={styles.ratingContainer}>
              <Icon name="star" size={14} color="#FFD700" />
              <Text style={styles.ratingText}>
                {item.averageRating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>
        
        <Text style={styles.propertyLocation}>
          {item.area}, {item.city}
        </Text>
        
        <Text style={styles.propertyDetails}>
          {item.bedrooms} bed · {item.bathrooms} bath · {item.area} sq ft
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.propertyPrice}>
            QAR {item.monthlyPrice?.toLocaleString() || item.price?.toLocaleString()}
          </Text>
          <Text style={styles.priceUnit}> / night</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFiltersModal = () => (
    <Modal
      isVisible={showFilters}
      style={styles.modal}
      onBackdropPress={() => setShowFilters(false)}>
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filters</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Icon name="close" size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Price Range */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Price Range (QAR)</Text>
            <View style={styles.priceInputs}>
              <TextInput
                style={styles.priceInput}
                placeholder="Min"
                value={searchParams.minPrice}
                onChangeText={(value) => updateSearchParam('minPrice', value)}
                keyboardType="numeric"
              />
              <Text style={styles.priceSeparator}>to</Text>
              <TextInput
                style={styles.priceInput}
                placeholder="Max"
                value={searchParams.maxPrice}
                onChangeText={(value) => updateSearchParam('maxPrice', value)}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Bedrooms & Bathrooms */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Bedrooms</Text>
            <View style={styles.numberSelector}>
              {['Any', '1', '2', '3', '4', '5+'].map(num => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.numberButton,
                    searchParams.bedrooms === (num === 'Any' ? '' : num === '5+' ? '5' : num) && styles.numberButtonActive,
                  ]}
                  onPress={() => updateSearchParam('bedrooms', num === 'Any' ? '' : num === '5+' ? '5' : num)}>
                  <Text style={[
                    styles.numberButtonText,
                    searchParams.bedrooms === (num === 'Any' ? '' : num === '5+' ? '5' : num) && styles.numberButtonTextActive,
                  ]}>
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Bathrooms</Text>
            <View style={styles.numberSelector}>
              {['Any', '1', '2', '3', '4+'].map(num => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.numberButton,
                    searchParams.bathrooms === (num === 'Any' ? '' : num === '4+' ? '4' : num) && styles.numberButtonActive,
                  ]}
                  onPress={() => updateSearchParam('bathrooms', num === 'Any' ? '' : num === '4+' ? '4' : num)}>
                  <Text style={[
                    styles.numberButtonText,
                    searchParams.bathrooms === (num === 'Any' ? '' : num === '4+' ? '4' : num) && styles.numberButtonTextActive,
                  ]}>
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Amenities */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {amenitiesOptions.map(amenity => (
                <TouchableOpacity
                  key={amenity}
                  style={[
                    styles.amenityChip,
                    searchParams.amenities.includes(amenity) && styles.amenityChipActive,
                  ]}
                  onPress={() => toggleAmenity(amenity)}>
                  <Text style={[
                    styles.amenityChipText,
                    searchParams.amenities.includes(amenity) && styles.amenityChipTextActive,
                  ]}>
                    {amenity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.modalFooter}>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.applyButton} 
            onPress={() => {
              setShowFilters(false);
              searchProperties();
            }}>
            <Text style={styles.applyButtonText}>Show Results</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const renderSortModal = () => (
    <Modal
      isVisible={showSortModal}
      style={styles.sortModal}
      onBackdropPress={() => setShowSortModal(false)}>
      <View style={styles.sortContent}>
        <Text style={styles.modalTitle}>Sort by</Text>
        {SORT_OPTIONS.map(option => (
          <TouchableOpacity
            key={option.value}
            style={styles.sortOption}
            onPress={() => {
              updateSearchParam('sortBy', option.value);
              setShowSortModal(false);
            }}>
            <Text style={[
              styles.sortOptionText,
              searchParams.sortBy === option.value && styles.sortOptionTextActive,
            ]}>
              {option.label}
            </Text>
            {searchParams.sortBy === option.value && (
              <Icon name="check" size={20} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {renderSearchHeader()}
      {renderFiltersBar()}
      {renderResultsHeader()}
      
      <FlatList
        data={properties}
        renderItem={renderPropertyCard}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={searchProperties}
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyState}>
              <Icon name="search-off" size={64} color="#ccc" />
              <Text style={styles.emptyTitle}>No properties found</Text>
              <Text style={styles.emptySubtitle}>
                Try adjusting your filters or search terms
              </Text>
            </View>
          )
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {renderFiltersModal()}
      {renderSortModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: SPACING.md,
  },
  backButton: {
    padding: SPACING.xs,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    paddingVertical: SPACING.md,
  },
  filtersBar: {
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginHorizontal: SPACING.xs,
    gap: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: COLORS.background,
  },
  categoryEmoji: {
    fontSize: 14,
  },
  resultsHeader: {
    padding: SPACING.md,
    backgroundColor: COLORS.background,
  },
  resultsCount: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  searchLocation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  listContainer: {
    padding: SPACING.md,
  },
  propertyCard: {
    backgroundColor: COLORS.surface,
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
    height: 200,
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    padding: SPACING.xs,
  },
  propertyInfo: {
    padding: SPACING.md,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  propertyTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginLeft: SPACING.sm,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  propertyLocation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  propertyDetails: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  propertyPrice: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  priceUnit: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  modalTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  filterSection: {
    padding: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterSectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  priceInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
  },
  priceSeparator: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  numberSelector: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  numberButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  numberButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  numberButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '500',
  },
  numberButtonTextActive: {
    color: COLORS.background,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  amenityChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  amenityChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  amenityChipText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text,
    fontWeight: '500',
  },
  amenityChipTextActive: {
    color: COLORS.background,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  clearButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.background,
    fontWeight: '600',
  },
  sortModal: {
    margin: SPACING.lg,
    justifyContent: 'center',
  },
  sortContent: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.lg,
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sortOptionText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  sortOptionTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});

export default AdvancedSearchScreen;