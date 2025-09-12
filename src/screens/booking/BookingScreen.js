import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import mobileApiService from '../../services/api';
import {useAuth} from '../../auth/AuthContext';
import {COLORS, SPACING, FONT_SIZES} from '../../shared/constants';
import {formatPrice, formatDate} from '../../shared/utils';

const BookingScreen = ({route, navigation}) => {
  const {propertyId, preselectedDates} = route.params;
  const {user} = useAuth();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState(preselectedDates?.checkIn || new Date());
  const [checkOut, setCheckOut] = useState(preselectedDates?.checkOut || new Date(Date.now() + 86400000));
  const [guests, setGuests] = useState(1);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    loadProperty();
  }, [propertyId]);

  useEffect(() => {
    if (property && checkIn && checkOut) {
      calculateBookingDetails();
    }
  }, [property, checkIn, checkOut, guests]);

  const loadProperty = async () => {
    try {
      const propertyData = await mobileApiService.getProperty(propertyId);
      setProperty(propertyData);
    } catch (error) {
      Alert.alert('Error', 'Failed to load property details');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const calculateBookingDetails = () => {
    if (!property || !checkIn || !checkOut) return;

    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const basePrice = property.price * nights;
    const serviceFee = basePrice * 0.1; // 10% service fee
    const cleaningFee = 50; // Fixed cleaning fee
    const taxes = basePrice * 0.05; // 5% tax
    const total = basePrice + serviceFee + cleaningFee + taxes;

    setBookingDetails({
      nights,
      basePrice,
      serviceFee,
      cleaningFee,
      taxes,
      total,
    });
  };

  const handleBooking = async () => {
    if (!user) {
      Alert.alert('Login Required', 'Please log in to make a booking', [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Login', onPress: () => navigation.navigate('Login')}
      ]);
      return;
    }

    try {
      const bookingData = {
        propertyId: property.id,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        guests,
        specialRequests,
        totalAmount: bookingDetails.total,
        breakdown: bookingDetails,
      };

      const booking = await mobileApiService.createBooking(bookingData);
      
      navigation.navigate('BookingConfirmation', {
        bookingId: booking.id,
        property,
        bookingDetails: {
          ...bookingData,
          ...bookingDetails,
        },
      });
    } catch (error) {
      Alert.alert('Booking Failed', error.message);
    }
  };

  const adjustGuests = (increment) => {
    const newGuests = guests + increment;
    if (newGuests >= 1 && newGuests <= (property?.maxGuests || 10)) {
      setGuests(newGuests);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!property) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Property not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Your Stay</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Property Summary */}
        <View style={styles.propertyCard}>
          <Image 
            source={{uri: property.photos?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'}} 
            style={styles.propertyImage} 
          />
          <View style={styles.propertyInfo}>
            <Text style={styles.propertyTitle}>{property.title}</Text>
            <Text style={styles.propertyLocation}>{property.area}, {property.city}</Text>
            <Text style={styles.propertyType}>
              {property.bedrooms} bed • {property.bathrooms} bath • {property.type}
            </Text>
            {property.averageRating > 0 && (
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {property.averageRating.toFixed(1)} ({property.reviewCount} reviews)
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dates</Text>
          
          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowCheckInPicker(true)}>
              <Text style={styles.dateLabel}>Check-in</Text>
              <Text style={styles.dateValue}>{formatDate(checkIn)}</Text>
            </TouchableOpacity>

            <View style={styles.dateSeparator}>
              <Icon name="arrow-forward" size={20} color={COLORS.textSecondary} />
            </View>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowCheckOutPicker(true)}>
              <Text style={styles.dateLabel}>Check-out</Text>
              <Text style={styles.dateValue}>{formatDate(checkOut)}</Text>
            </TouchableOpacity>
          </View>

          {bookingDetails && (
            <Text style={styles.nightsText}>
              {bookingDetails.nights} night{bookingDetails.nights > 1 ? 's' : ''}
            </Text>
          )}
        </View>

        {/* Guests Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guests</Text>
          
          <View style={styles.guestsContainer}>
            <View style={styles.guestsInfo}>
              <Text style={styles.guestsLabel}>Number of guests</Text>
              <Text style={styles.guestsLimit}>Max {property.maxGuests || 10} guests</Text>
            </View>
            
            <View style={styles.guestsControls}>
              <TouchableOpacity
                style={[styles.guestButton, guests <= 1 && styles.guestButtonDisabled]}
                onPress={() => adjustGuests(-1)}
                disabled={guests <= 1}>
                <Icon name="remove" size={20} color={guests <= 1 ? COLORS.border : COLORS.text} />
              </TouchableOpacity>
              
              <Text style={styles.guestsCount}>{guests}</Text>
              
              <TouchableOpacity
                style={[styles.guestButton, guests >= (property.maxGuests || 10) && styles.guestButtonDisabled]}
                onPress={() => adjustGuests(1)}
                disabled={guests >= (property.maxGuests || 10)}>
                <Icon name="add" size={20} color={guests >= (property.maxGuests || 10) ? COLORS.border : COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Special Requests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Requests (Optional)</Text>
          <View style={styles.requestsContainer}>
            <Text style={styles.requestsLabel}>
              Let the host know if you have any special requirements
            </Text>
            {/* In a real implementation, you'd add a TextInput here */}
          </View>
        </View>

        {/* Price Breakdown */}
        {bookingDetails && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Details</Text>
            
            <View style={styles.priceBreakdown}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>
                  {formatPrice(property.price)} x {bookingDetails.nights} night{bookingDetails.nights > 1 ? 's' : ''}
                </Text>
                <Text style={styles.priceValue}>{formatPrice(bookingDetails.basePrice)}</Text>
              </View>
              
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Service fee</Text>
                <Text style={styles.priceValue}>{formatPrice(bookingDetails.serviceFee)}</Text>
              </View>
              
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Cleaning fee</Text>
                <Text style={styles.priceValue}>{formatPrice(bookingDetails.cleaningFee)}</Text>
              </View>
              
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Taxes</Text>
                <Text style={styles.priceValue}>{formatPrice(bookingDetails.taxes)}</Text>
              </View>
              
              <View style={[styles.priceRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatPrice(bookingDetails.total)}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Host Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Host</Text>
          <View style={styles.hostInfo}>
            <View style={styles.hostAvatar}>
              <Icon name="person" size={24} color={COLORS.textSecondary} />
            </View>
            <View style={styles.hostDetails}>
              <Text style={styles.hostName}>{property.hostName || 'Host'}</Text>
              <Text style={styles.hostJoined}>Joined in 2023</Text>
            </View>
          </View>
        </View>

        {/* Cancellation Policy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cancellation Policy</Text>
          <Text style={styles.policyText}>
            Free cancellation for 48 hours. After that, cancel up to 7 days before check-in and get a 50% refund, minus service fees.
          </Text>
        </View>
      </ScrollView>

      {/* Book Button */}
      <View style={styles.bookingFooter}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>
            {bookingDetails ? formatPrice(bookingDetails.total) : formatPrice(0)}
          </Text>
        </View>
        
        <TouchableOpacity
          style={styles.bookButton}
          onPress={handleBooking}
          disabled={!bookingDetails}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>

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
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.error,
  },
  header: {
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  propertyCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginVertical: SPACING.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  propertyImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  propertyInfo: {
    flex: 1,
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
    marginBottom: SPACING.xs,
  },
  propertyType: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  ratingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  section: {
    marginVertical: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
  },
  dateSeparator: {
    marginHorizontal: SPACING.md,
  },
  dateLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  dateValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '500',
  },
  nightsText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.md,
  },
  guestsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guestsInfo: {
    flex: 1,
  },
  guestsLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '500',
  },
  guestsLimit: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  guestsControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  guestButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  guestButtonDisabled: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  guestsCount: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    fontWeight: '500',
    minWidth: 20,
    textAlign: 'center',
  },
  requestsContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    minHeight: 80,
  },
  requestsLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  priceBreakdown: {
    gap: SPACING.md,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  priceValue: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  totalLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  totalValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hostDetails: {
    flex: 1,
  },
  hostName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  hostJoined: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  policyText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bookingFooter: {
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  totalAmount: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 8,
    marginLeft: SPACING.md,
  },
  bookButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default BookingScreen;