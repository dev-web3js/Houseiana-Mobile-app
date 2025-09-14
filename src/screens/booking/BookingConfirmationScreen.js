import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Share,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS, SPACING, FONT_SIZES } from "../../shared/constants";
import { formatPrice, formatDate } from "../../shared/utils";

const BookingConfirmationScreen = ({ route, navigation }) => {
  const { bookingId, property, bookingDetails } = route.params;

  const handleShare = async () => {
    try {
      const message = `I just booked a stay at ${property.title} in ${
        property.area
      }, ${property.city}! 
      
Check-in: ${formatDate(new Date(bookingDetails.checkIn))}
Check-out: ${formatDate(new Date(bookingDetails.checkOut))}
Total: ${formatPrice(bookingDetails.total)}

Booking ID: ${bookingId}`;

      await Share.share({
        message,
        title: "My Houseiana Booking",
      });
    } catch (error) {
      console.log("Share error:", error);
    }
  };

  const handleContactHost = () => {
    navigation.navigate("Messages", {
      recipientId: property.hostId,
      propertyId: property.id,
      recipientName: property.hostName,
    });
  };

  const handleViewBooking = () => {
    navigation.navigate("BookingDetail", { bookingId });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Success Header */}
      <View style={styles.successHeader}>
        <View style={styles.successIcon}>
          <Icon name="check-circle" size={80} color={COLORS.success} />
        </View>
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successSubtitle}>
          Your reservation has been confirmed. You'll receive a confirmation
          email shortly.
        </Text>
      </View>

      {/* Booking Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.bookingHeader}>
          <Text style={styles.bookingId}>Booking ID: #{bookingId}</Text>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Icon name="share" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <Image
          source={{
            uri:
              property.photos?.[0] ||
              "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
          }}
          style={styles.propertyImage}
        />

        <View style={styles.propertyDetails}>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          <Text style={styles.propertyLocation}>
            {property.area}, {property.city}

          <View style={styles.bookingDates}>
            <View style={styles.dateSection}>
              <Text style={styles.dateLabel}>Check-in</Text>
              <Text style={styles.dateValue}>
                {formatDate(new Date(bookingDetails.checkIn))}
              </Text>
              <Text style={styles.timeValue}>After 3:00 PM</Text>
            </View>

            <View style={styles.dateSeparator}>
              <Icon
                name="arrow-forward"
                size={24}
                color={COLORS.textSecondary}
              />
            </View>

            <View style={styles.dateSection}>
              <Text style={styles.dateLabel}>Check-out</Text>
              <Text style={styles.dateValue}>
                {formatDate(new Date(bookingDetails.checkOut))}
              </Text>
              <Text style={styles.timeValue}>Before 11:00 AM</Text>
            </View>
          </View>

          <View style={styles.guestsInfo}>
            <Icon name="group" size={20} color={COLORS.textSecondary} />
            <Text style={styles.guestsText}>
              {bookingDetails.guests} guest
              {bookingDetails.guests > 1 ? "s" : ""}
            </Text>
          </View>
        </View>
      </View>

      {/* Price Breakdown */}
      <View style={styles.priceCard}>
        <Text style={styles.cardTitle}>Payment Summary</Text>

        <View style={styles.priceBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>
              {formatPrice(property.price)} x {bookingDetails.nights} night
              {bookingDetails.nights > 1 ? "s" : ""}
            </Text>
            <Text style={styles.priceValue}>
              {formatPrice(bookingDetails.basePrice)}
            </Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service fee</Text>
            <Text style={styles.priceValue}>
              {formatPrice(bookingDetails.serviceFee)}
            </Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Cleaning fee</Text>
            <Text style={styles.priceValue}>
              {formatPrice(bookingDetails.cleaningFee)}
            </Text>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Taxes</Text>
            <Text style={styles.priceValue}>
              {formatPrice(bookingDetails.taxes)}
            </Text>
          </View>

          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>
              {formatPrice(bookingDetails.total)}
            </Text>
          </View>
        </View>

        <View style={styles.paymentMethod}>
          <Icon name="credit-card" size={20} color={COLORS.textSecondary} />
          <Text style={styles.paymentText}>Charged to •••• 1234</Text>
        </View>
      </View>

      {/* Host Information */}
      <View style={styles.hostCard}>
        <Text style={styles.cardTitle}>Your Host</Text>

        <View style={styles.hostInfo}>
          <View style={styles.hostAvatar}>
            <Icon name="person" size={32} color={COLORS.textSecondary} />
          </View>

          <View style={styles.hostDetails}>
            <Text style={styles.hostName}>{property.hostName || "Host"}</Text>
            <Text style={styles.hostJoined}>Hosting since 2023</Text>
            <View style={styles.hostRating}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.hostRatingText}>4.9 • 127 reviews</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.contactButton}
            onPress={handleContactHost}
          >
            <Icon name="message" size={20} color={COLORS.primary} />
            <Text style={styles.contactButtonText}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Important Information */}
      <View style={styles.infoCard}>
        <Text style={styles.cardTitle}>Important Information</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Icon name="home" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>
              Address details will be provided closer to your check-in date
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Icon name="phone" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>
              Host contact information will be available 24 hours before
              check-in
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Icon name="schedule" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>
              Standard check-in time is 3:00 PM, check-out is 11:00 AM
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Icon name="policy" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>
              Free cancellation until 48 hours before check-in
            </Text>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.primaryButtonText}>Back to Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleViewBooking}
        >
          <Text style={styles.secondaryButtonText}>View Booking Details</Text>
        </TouchableOpacity>
      </View>

      {/* Help Section */}
      <View style={styles.helpSection}>
        <Text style={styles.helpTitle}>Need Help?</Text>
        <Text style={styles.helpText}>
          If you have any questions about your booking, you can contact our
          support team 24/7
        </Text>

        <TouchableOpacity style={styles.helpButton}>
          <Icon name="help-outline" size={20} color={COLORS.primary} />
          <Text style={styles.helpButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  successHeader: {
    backgroundColor: COLORS.background,
    alignItems: "center",
    paddingVertical: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  successIcon: {
    marginBottom: SPACING.lg,
  },
  successTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  successSubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  summaryCard: {
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  bookingId: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  shareButton: {
    padding: SPACING.xs,
  },
  propertyImage: {
    width: "100%",
    height: 200,
  },
  propertyDetails: {
    padding: SPACING.lg,
  },
  propertyTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  propertyLocation: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  bookingDates: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  dateSection: {
    flex: 1,
    alignItems: "center",
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
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  timeValue: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  guestsInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
  },
  guestsText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  priceCard: {
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: 16,
    padding: SPACING.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  priceBreakdown: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
  },
  totalLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: "bold",
    color: COLORS.text,
  },
  totalValue: {
    fontSize: FONT_SIZES.md,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  paymentText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  hostCard: {
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: 16,
    padding: SPACING.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  hostAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.md,
  },
  hostDetails: {
    flex: 1,
  },
  hostName: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  hostJoined: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  hostRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.xs,
  },
  hostRatingText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.xs,
  },
  contactButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: "500",
  },
  infoCard: {
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: 16,
    padding: SPACING.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  infoSection: {
    gap: SPACING.md,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SPACING.md,
  },
  infoText: {
    flex: 1,
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    lineHeight: 20,
  },
  actionButtons: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: "center",
  },
  primaryButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryButtonText: {
    color: COLORS.text,
    fontSize: FONT_SIZES.md,
    fontWeight: "500",
  },
  helpSection: {
    backgroundColor: COLORS.background,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    borderRadius: 16,
    padding: SPACING.lg,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  helpTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  helpText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: SPACING.lg,
  },
  helpButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  helpButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: "500",
  },
});

export default BookingConfirmationScreen;
