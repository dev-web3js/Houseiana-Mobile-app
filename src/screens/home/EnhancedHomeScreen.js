import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../../auth/AuthContext';
import propertiesService from '../../properties/propertiesService';
import {COLORS, SPACING, FONT_SIZES, CATEGORIES, POPULAR_DESTINATIONS} from '../../shared/constants';
import {formatPrice} from '../../shared/utils';

const {width} = Dimensions.get('window');

const EnhancedHomeScreen = ({navigation}) => {
  const {user} = useAuth();
  const [searchLocation, setSearchLocation] = useState('');
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000));
  const [guests, setGuests] = useState('');
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProperties();
  }, []);

  const loadFeaturedProperties = async () => {
    try {
      const response = await propertiesService.getProperties({
        limit: 8,
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

  const handleSearch = () => {
    const searchParams = {
      location: searchLocation,
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      guests: guests,
      category: activeCategory !== 'all' ? activeCategory : undefined,
    };
    navigation.navigate('Properties', {searchParams});
  };

  const handleQuickSearch = (location) => {
    setSearchLocation(location);
    const searchParams = {
      location: location,
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      guests: guests,
    };
    navigation.navigate('Properties', {searchParams});
  };

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <Text style={styles.heroTitle}>Find Your Perfect Stay</Text>
      <Text style={styles.heroSubtitle}>
        Discover comfort-first homes for daily, weekly or monthly rentals
      </Text>

      <View style={styles.searchBar}>
        <View style={styles.searchInput}>
          <Text style={styles.inputLabel}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Where are you going?"
            value={searchLocation}
            onChangeText={setSearchLocation}
            placeholderTextColor="#717171"
          />
        </View>

        <TouchableOpacity
          style={styles.searchInput}
          onPress={() => setShowCheckInPicker(true)}>
          <Text style={styles.inputLabel}>Check in</Text>
          <Text style={styles.dateText}>
            {checkIn.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.searchInput}
          onPress={() => setShowCheckOutPicker(true)}>
          <Text style={styles.inputLabel}>Check out</Text>
          <Text style={styles.dateText}>
            {checkOut.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <View style={styles.searchInput}>
          <Text style={styles.inputLabel}>Guests</Text>
          <TextInput
            style={styles.input}
            placeholder="Add guests"
            value={guests}
            onChangeText={setGuests}
            keyboardType="numeric"
            placeholderTextColor="#717171"
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="search" size={24} color="white" />
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Search Tags */}
      <View style={styles.quickSearchContainer}>
        <Text style={styles.popularLabel}>Popular:</Text>
        {['The Pearl', 'West Bay', 'Lusail', 'Flexible dates'].map(tag => (
          <TouchableOpacity
            key={tag}
            style={styles.quickSearchTag}
            onPress={() => {
              if (tag === 'Flexible dates') {
                setCheckIn(new Date());
                setCheckOut(new Date(Date.now() + 86400000));
              } else {
                handleQuickSearch(tag);
              }
            }}>
            <Text style={styles.quickSearchText}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CATEGORIES.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              activeCategory === category.id && styles.categoryItemActive,
            ]}
            onPress={() => setActiveCategory(category.id)}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.categoryName,
                activeCategory === category.id && styles.categoryNameActive,
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderPopularDestinations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Popular destinations</Text>
      <Text style={styles.sectionSubtitle}>
        Explore our most sought-after locations for your stay
      </Text>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.destinationsContainer}>
          {POPULAR_DESTINATIONS.map((dest, index) => (
            <TouchableOpacity
              key={index}
              style={styles.destinationCard}
              onPress={() => handleQuickSearch(dest.city)}>
              <Image source={{uri: dest.image}} style={styles.destinationImage} />
              <View style={styles.destinationOverlay}>
                <Text style={styles.destinationCity}>{dest.city}</Text>
                <Text style={styles.destinationProperties}>{dest.properties}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderFeaturedProperties = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Featured rentals</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading properties...</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.propertiesContainer}>
            {featuredProperties.slice(0, 8).map(property => (
              <TouchableOpacity
                key={property.id}
                style={styles.propertyCard}
                onPress={() =>
                  navigation.navigate('PropertyDetail', {propertyId: property.id})
                }>
                <Image 
                  source={{
                    uri: property.photos?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'
                  }} 
                  style={styles.propertyImage} 
                />
                <TouchableOpacity style={styles.favoriteButton}>
                  <Icon name="favorite-border" size={20} color="white" />
                </TouchableOpacity>
                
                <View style={styles.propertyInfo}>
                  <View style={styles.propertyHeader}>
                    <Text style={styles.propertyTitle} numberOfLines={1}>
                      {property.title}
                    </Text>
                    {property.averageRating > 0 && (
                      <View style={styles.ratingContainer}>
                        <Icon name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingText}>
                          {property.averageRating.toFixed(1)}
                        </Text>
                      </View>
                    )}
                  </View>
                  
                  <Text style={styles.propertyLocation}>
                    {property.area}, {property.city}
                  </Text>
                  
                  <Text style={styles.propertyDetails}>
                    {property.bedrooms} bed · {property.bathrooms} bath
                  </Text>
                  
                  <Text style={styles.propertyPrice}>
                    QAR {property.monthlyPrice?.toLocaleString() || property.price?.toLocaleString()}
                    <Text style={styles.priceUnit}> / night</Text>
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      <TouchableOpacity
        style={styles.showAllButton}
        onPress={() => navigation.navigate('Properties')}>
        <Text style={styles.showAllButtonText}>Show all properties</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHostCTA = () => (
    <View style={styles.hostCTA}>
      <Text style={styles.hostTitle}>Become a Host</Text>
      <Text style={styles.hostSubtitle}>
        Earn extra income and unlock new opportunities by sharing your space
      </Text>
      <TouchableOpacity 
        style={styles.hostButton}
        onPress={() => navigation.navigate('HostDashboard')}>
        <Text style={styles.hostButtonText}>Get started</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderSearchBar()}
      {renderCategories()}
      {renderPopularDestinations()}
      {renderFeaturedProperties()}
      {renderHostCTA()}

      {/* Date Pickers */}
      <DatePicker
        modal
        open={showCheckInPicker}
        date={checkIn}
        mode="date"
        minimumDate={new Date()}
        onConfirm={(date) => {
          setShowCheckInPicker(false);
          setCheckIn(date);
          // Reset checkout if it's before the new check-in date
          if (checkOut <= date) {
            setCheckOut(new Date(date.getTime() + 86400000));
          }
        }}
        onCancel={() => setShowCheckInPicker(false)}
      />

      <DatePicker
        modal
        open={showCheckOutPicker}
        date={checkOut}
        mode="date"
        minimumDate={new Date(checkIn.getTime() + 86400000)}
        onConfirm={(date) => {
          setShowCheckOutPicker(false);
          setCheckOut(date);
        }}
        onCancel={() => setShowCheckOutPicker(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    backgroundColor: COLORS.primary,
    padding: SPACING.lg,
    paddingTop: SPACING.xxl,
    minHeight: 400,
  },
  heroTitle: {
    fontSize: FONT_SIZES.xxxl,
    fontWeight: 'bold',
    color: COLORS.background,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  heroSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.background,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    opacity: 0.9,
  },
  searchBar: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  searchInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: SPACING.md,
  },
  inputLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  input: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    padding: 0,
  },
  dateText: {
    fontSize: FONT_SIZES.sm,
    color: '#717171',
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: 12,
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  searchButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  quickSearchContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  popularLabel: {
    color: COLORS.background,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  quickSearchTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  quickSearchText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  categoriesContainer: {
    backgroundColor: COLORS.background,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  categoryItem: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    marginHorizontal: SPACING.xs,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    opacity: 0.64,
  },
  categoryItemActive: {
    borderBottomColor: COLORS.text,
    opacity: 1,
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: SPACING.xs,
  },
  categoryName: {
    fontSize: FONT_SIZES.xs,
    color: '#717171',
    fontWeight: '500',
  },
  categoryNameActive: {
    color: COLORS.text,
    fontWeight: '600',
  },
  section: {
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  sectionSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: '#717171',
    marginBottom: SPACING.lg,
  },
  destinationsContainer: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  destinationCard: {
    width: 200,
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
    padding: SPACING.md,
  },
  destinationCity: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.background,
    marginBottom: 2,
  },
  destinationProperties: {
    fontSize: FONT_SIZES.xs,
    color: 'rgba(255,255,255,0.9)',
  },
  loadingContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: '#717171',
  },
  propertiesContainer: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  propertyCard: {
    width: 280,
    backgroundColor: COLORS.background,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    color: '#717171',
    marginBottom: SPACING.xs,
  },
  propertyDetails: {
    fontSize: FONT_SIZES.sm,
    color: '#717171',
    marginBottom: SPACING.sm,
  },
  propertyPrice: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  priceUnit: {
    fontSize: FONT_SIZES.sm,
    color: '#717171',
    fontWeight: 'normal',
  },
  showAllButton: {
    backgroundColor: COLORS.text,
    padding: SPACING.md,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  showAllButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  hostCTA: {
    backgroundColor: '#667eea',
    padding: SPACING.xxl,
    alignItems: 'center',
  },
  hostTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.background,
    marginBottom: SPACING.md,
  },
  hostSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.background,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    opacity: 0.95,
    lineHeight: 22,
  },
  hostButton: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.xxl,
    paddingVertical: SPACING.md,
    borderRadius: 999,
  },
  hostButtonText: {
    color: '#667eea',
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default EnhancedHomeScreen;