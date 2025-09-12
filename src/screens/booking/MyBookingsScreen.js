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
import mobileApiService from '../../services/api';
import {COLORS, SPACING, FONT_SIZES} from '../../shared/constants';
import {formatPrice, formatDate} from '../../shared/utils';

const MyBookingsScreen = ({navigation}) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('upcoming'); // upcoming, past, cancelled

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const bookingsData = await mobileApiService.getBookings();
      setBookings(bookingsData);
    } catch (error) {
      console.log('Failed to load bookings:', error);
      Alert.alert('Error', 'Failed to load your bookings');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadBookings();
  };

  const handleCancelBooking = (booking) => {
    const canCancel = new Date(booking.checkIn) > new Date(Date.now() + 48 * 60 * 60 * 1000);
    
    if (!canCancel) {
      Alert.alert(
        'Cannot Cancel',
        'This booking cannot be cancelled as it\'s less than 48 hours until check-in.',
        [{text: 'OK'}]
      );
      return;
    }

    Alert.alert(
      'Cancel Booking',
      `Are you sure you want to cancel your booking for ${booking.property.title}? This action cannot be undone.`,
      [
        {text: 'Keep Booking', style: 'cancel'},
        {
          text: 'Cancel Booking',
          style: 'destructive',
          onPress: () => confirmCancelBooking(booking.id),
        },
      ]
    );
  };

  const confirmCancelBooking = async (bookingId) => {
    try {
      await mobileApiService.cancelBooking(bookingId, 'User requested cancellation');
      await loadBookings(); // Reload bookings
      Alert.alert('Success', 'Your booking has been cancelled.');
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel booking. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return COLORS.success;
      case 'pending': return COLORS.warning;
      case 'cancelled': return COLORS.error;
      case 'completed': return COLORS.primary;
      default: return COLORS.textSecondary;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  const filterBookings = () => {
    const now = new Date();
    
    switch (activeTab) {
      case 'upcoming':
        return bookings.filter(booking => 
          new Date(booking.checkIn) > now && booking.status !== 'cancelled'
        );
      case 'past':
        return bookings.filter(booking => 
          new Date(booking.checkOut) < now || booking.status === 'completed'
        );
      case 'cancelled':
        return bookings.filter(booking => booking.status === 'cancelled');
      default:
        return bookings;
    }
  };

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {[
        {id: 'upcoming', label: 'Upcoming'},
        {id: 'past', label: 'Past'},
        {id: 'cancelled', label: 'Cancelled'}
      ].map(tab => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => setActiveTab(tab.id)}>
          <Text style={[styles.tabText, activeTab === tab.id && styles.activeTabText]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBookingCard = (booking) => {
    const isUpcoming = new Date(booking.checkIn) > new Date();
    const canCancel = isUpcoming && new Date(booking.checkIn) > new Date(Date.now() + 48 * 60 * 60 * 1000);
    
    return (
      <TouchableOpacity
        key={booking.id}
        style={styles.bookingCard}
        onPress={() => navigation.navigate('BookingDetail', {bookingId: booking.id})}>
        
        <Image 
          source={{uri: booking.property.photos?.[0] || 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'}} 
          style={styles.propertyImage} 
        />

        <View style={styles.bookingInfo}>
          <View style={styles.bookingHeader}>
            <Text style={styles.propertyTitle} numberOfLines={2}>
              {booking.property.title}
            </Text>
            <View style={[styles.statusBadge, {backgroundColor: getStatusColor(booking.status)}]}>
              <Text style={styles.statusText}>{getStatusText(booking.status)}</Text>
            </View>
          </View>

          <Text style={styles.propertyLocation}>
            {booking.property.area}, {booking.property.city}
          </Text>

          <View style={styles.dateContainer}>
            <View style={styles.dateInfo}>
              <Icon name="event" size={16} color={COLORS.textSecondary} />
              <Text style={styles.dateText}>
                {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
              </Text>
            </View>
            
            <View style={styles.guestsInfo}>
              <Icon name="group" size={16} color={COLORS.textSecondary} />
              <Text style={styles.guestsText}>
                {booking.guests} guest{booking.guests > 1 ? 's' : ''}
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.totalPrice}>{formatPrice(booking.totalAmount)}</Text>
            <Text style={styles.nights}>
              {Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24))} nights
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {isUpcoming && booking.status === 'confirmed' && (
              <>
                <TouchableOpacity
                  style={styles.messageButton}
                  onPress={() => navigation.navigate('Messages', {
                    recipientId: booking.property.hostId,
                    propertyId: booking.property.id,
                    recipientName: booking.property.hostName,
                  })}>
                  <Icon name="message" size={16} color={COLORS.primary} />
                  <Text style={styles.messageButtonText}>Message Host</Text>
                </TouchableOpacity>

                {canCancel && (
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => handleCancelBooking(booking)}>
                    <Icon name="cancel" size={16} color={COLORS.error} />
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                )}
              </>
            )}

            {booking.status === 'completed' && !booking.hasReviewed && (
              <TouchableOpacity
                style={styles.reviewButton}
                onPress={() => navigation.navigate('WriteReview', {
                  bookingId: booking.id,
                  propertyId: booking.property.id,
                })}>
                <Icon name="star-border" size={16} color={COLORS.secondary} />
                <Text style={styles.reviewButtonText}>Write Review</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('BookingDetail', {bookingId: booking.id})}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    const emptyMessages = {
      upcoming: {
        icon: 'event-available',
        title: 'No Upcoming Bookings',
        subtitle: 'When you book a stay, it will appear here',
        action: 'Explore Properties',
        onPress: () => navigation.navigate('Properties'),
      },
      past: {
        icon: 'history',
        title: 'No Past Bookings',
        subtitle: 'Your travel history will appear here after your stays',
      },
      cancelled: {
        icon: 'event-busy',
        title: 'No Cancelled Bookings',
        subtitle: 'Cancelled bookings will appear here',
      },
    };

    const config = emptyMessages[activeTab];

    return (
      <View style={styles.emptyState}>
        <Icon name={config.icon} size={80} color={COLORS.border} />
        <Text style={styles.emptyTitle}>{config.title}</Text>
        <Text style={styles.emptySubtitle}>{config.subtitle}</Text>
        {config.action && (
          <TouchableOpacity style={styles.emptyAction} onPress={config.onPress}>
            <Text style={styles.emptyActionText}>{config.action}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const filteredBookings = filterBookings();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-list" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {renderTabs()}

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        showsVerticalScrollIndicator={false}>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading bookings...</Text>
          </View>
        ) : filteredBookings.length > 0 ? (
          <View style={styles.bookingsList}>
            {filteredBookings.map(renderBookingCard)}
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
    backgroundColor: '#f8f9fa',
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
  filterButton: {
    padding: SPACING.xs,
  },
  tabsContainer: {
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    paddingHorizontal: SPACING.md,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  loadingContainer: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  bookingsList: {
    paddingVertical: SPACING.md,
  },
  bookingCard: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    marginBottom: SPACING.lg,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: 180,
  },
  bookingInfo: {
    padding: SPACING.lg,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  propertyTitle: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginRight: SPACING.md,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.background,
    fontWeight: '600',
  },
  propertyLocation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  dateContainer: {
    marginBottom: SPACING.md,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  dateText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  guestsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  guestsText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  totalPrice: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  nights: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.xs,
    flex: 1,
    justifyContent: 'center',
  },
  messageButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.xs,
    flex: 1,
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    fontWeight: '500',
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff7ed',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.xs,
    flex: 1,
    justifyContent: 'center',
  },
  reviewButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.secondary,
    fontWeight: '500',
  },
  detailsButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    flex: 1,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.xl,
  },
  emptyAction: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: 8,
  },
  emptyActionText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default MyBookingsScreen;