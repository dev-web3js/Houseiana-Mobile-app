import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  RefreshControl,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS, SPACING, FONT_SIZES } from "../../shared/constants";
import { formatPrice, formatDate } from "../../shared/utils";

const BookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // all, upcoming, current, past

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      // Mock data for demo - in real app, this would come from API
      const mockBookings = [
        {
          id: 1,
          guestName: "John Smith",
          guestEmail: "john@example.com",
          guestPhone: "+974 1234 5678",
          propertyTitle: "Luxury Apartment in West Bay",
          propertyImage:
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
          checkIn: "2024-01-15",
          checkOut: "2024-01-20",
          guests: 2,
          totalAmount: 2500,
          status: "confirmed",
          bookingDate: "2024-01-10",
          paymentStatus: "paid",
          specialRequests: "Late check-in requested",
        },
        {
          id: 2,
          guestName: "Sarah Johnson",
          guestEmail: "sarah@example.com",
          guestPhone: "+974 9876 5432",
          propertyTitle: "Modern Studio in The Pearl",
          propertyImage:
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
          checkIn: "2024-01-25",
          checkOut: "2024-02-05",
          guests: 1,
          totalAmount: 4200,
          status: "pending",
          bookingDate: "2024-01-12",
          paymentStatus: "pending",
          specialRequests: "",
        },
        {
          id: 3,
          guestName: "Ahmed Al-Rashid",
          guestEmail: "ahmed@example.com",
          guestPhone: "+974 5555 1234",
          propertyTitle: "Family Villa in Lusail",
          propertyImage:
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
          checkIn: "2024-01-05",
          checkOut: "2024-01-10",
          guests: 4,
          totalAmount: 3500,
          status: "completed",
          bookingDate: "2024-01-01",
          paymentStatus: "paid",
          specialRequests: "Early check-in needed",
        },
      ];

      setBookings(mockBookings);
    } catch (error) {
      console.log("Failed to load bookings:", error);
      Alert.alert("Error", "Failed to load bookings");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadBookings();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "cancelled":
        return "#ef4444";
      case "completed":
        return "#6366f1";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending";
      case "cancelled":
        return "Cancelled";
      case "completed":
        return "Completed";
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "#10b981";
      case "pending":
        return "#f59e0b";
      case "failed":
        return "#ef4444";
      case "refunded":
        return "#6366f1";
      default:
        return "#6b7280";
    }
  };

  const handleBookingAction = (booking, action) => {
    switch (action) {
      case "confirm":
        Alert.alert(
          "Confirm Booking",
          "Are you sure you want to confirm this booking?",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Confirm",
              onPress: () => updateBookingStatus(booking.id, "confirmed"),
            },
          ]
        );
        break;
      case "cancel":
        Alert.alert(
          "Cancel Booking",
          "Are you sure you want to cancel this booking?",
          [
            { text: "No", style: "cancel" },
            {
              text: "Yes",
              style: "destructive",
              onPress: () => updateBookingStatus(booking.id, "cancelled"),
            },
          ]
        );
        break;
      case "contact":
        Alert.alert(
          "Contact Guest",
          `${booking.guestName}\nEmail: ${booking.guestEmail}\nPhone: ${booking.guestPhone}`,
          [
            { text: "Call", onPress: () => {} },
            { text: "Email", onPress: () => {} },
            { text: "Close", style: "cancel" },
          ]
        );
        break;
    }
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
    Alert.alert("Success", `Booking status updated to ${newStatus}`);
  };

  const filterBookings = () => {
    const now = new Date();

    switch (activeTab) {
      case "upcoming":
        return bookings.filter((booking) => new Date(booking.checkIn) > now);
      case "current":
        return bookings.filter(
          (booking) =>
            new Date(booking.checkIn) <= now &&
            new Date(booking.checkOut) >= now
        );
      case "past":
        return bookings.filter((booking) => new Date(booking.checkOut) < now);
      default:
        return bookings;
    }
  };

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {[
        { id: "all", label: "All" },
        { id: "upcoming", label: "Upcoming" },
        { id: "current", label: "Current" },
        { id: "past", label: "Past" },
      ].map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[styles.tab, activeTab === tab.id && styles.activeTab]}
          onPress={() => setActiveTab(tab.id)}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === tab.id && styles.activeTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderBookingCard = (booking) => (
    <View key={booking.id} style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Image
          source={{ uri: booking.propertyImage }}
          style={styles.propertyImage}

        <View style={styles.bookingInfo}>
          <Text style={styles.propertyTitle} numberOfLines={2}>
            {booking.propertyTitle}
          </Text>

          <View style={styles.guestInfo}>
            <Icon name="person" size={16} color={COLORS.textSecondary} />
            <Text style={styles.guestName}>{booking.guestName}</Text>
          </View>

          <View style={styles.dateInfo}>
            <Icon name="event" size={16} color={COLORS.textSecondary} />
            <Text style={styles.dateText}>
              {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
            </Text>
          </View>

          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(booking.status) },
              ]}
            >
              <Text style={styles.statusText}>
                {getStatusText(booking.status)}
              </Text>
            </View>

              style={[
                styles.paymentBadge,
                {
                  backgroundColor: getPaymentStatusColor(booking.paymentStatus),
                },
              ]}
            >
              <Text style={styles.paymentText}>
                {booking.paymentStatus.toUpperCase()}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailRow}>
          <Icon name="group" size={16} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>
            {booking.guests} guest{booking.guests > 1 ? "s" : ""}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="attach-money" size={16} color={COLORS.textSecondary} />
          <Text style={styles.totalAmount}>
            {formatPrice(booking.totalAmount)}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <Icon name="today" size={16} color={COLORS.textSecondary} />
          <Text style={styles.detailText}>
            Booked: {formatDate(booking.bookingDate)}
          </Text>
        </View>
      </View>

      {booking.specialRequests && (
        <View style={styles.specialRequests}>
          <Icon name="info" size={16} color={COLORS.primary} />
          <Text style={styles.requestText}>{booking.specialRequests}</Text>
        </View>
      )}

      <View style={styles.actionButtons}>
        {booking.status === "pending" && (
          <TouchableOpacity
            style={[styles.actionButton, styles.confirmButton]}
            onPress={() => handleBookingAction(booking, "confirm")}
          >
            <Icon name="check" size={16} color="white" />
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        )}

        {booking.status === "confirmed" && (
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => handleBookingAction(booking, "cancel")}
          >
            <Icon name="close" size={16} color="#ef4444" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionButton, styles.contactButton]}
          onPress={() => handleBookingAction(booking, "contact")}
        >
          <Icon name="phone" size={16} color={COLORS.primary} />
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="event-busy" size={80} color="#d1d5db" />
      <Text style={styles.emptyTitle}>No Bookings Yet</Text>
      <Text style={styles.emptySubtitle}>
        Bookings will appear here once guests start booking your properties
      </Text>
    </View>
  );

  const filteredBookings = filterBookings();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Bookings</Text>

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
        showsVerticalScrollIndicator={false}

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
    backgroundColor: "#f7f7f7",
  },
  header: {
    backgroundColor: COLORS.background,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 1,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "600",
    color: COLORS.text,
  },
  filterButton: {
    padding: SPACING.xs,
  },
  tabsContainer: {
    backgroundColor: COLORS.background,
    flexDirection: "row",
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.md,
  },
  loadingContainer: {
    padding: SPACING.xl,
    alignItems: "center",
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
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingHeader: {
    flexDirection: "row",
    marginBottom: SPACING.md,
  },
  propertyImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: SPACING.md,
  },
  bookingInfo: {
    flex: 1,
  },
  propertyTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  guestInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  guestName: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: "500",
  },
  dateInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  dateText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  statusRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  statusText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.background,
    fontWeight: "600",
  },
  paymentBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: 12,
  },
  paymentText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.background,
    fontWeight: "600",
  },
  bookingDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  detailText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  totalAmount: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.primary,
  },
  specialRequests: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
    backgroundColor: "#eff6ff",
    padding: SPACING.sm,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  requestText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.xs,
  },
  confirmButton: {
    backgroundColor: "#10b981",
  },
  confirmButtonText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.background,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#ef4444",
  },
  cancelButtonText: {
    fontSize: FONT_SIZES.xs,
    color: "#ef4444",
    fontWeight: "600",
  },
  contactButton: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  contactButtonText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.primary,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: SPACING.xxl * 2,
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
});

export default BookingsScreen;
