import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { COLORS, SPACING, FONT_SIZES } from "../shared/constants";
import { formatPrice } from "../shared/utils";

const { width } = Dimensions.get("window");

const PropertyCard = ({
  property,
  onPress,
  onFavoritePress,
  isFavorite = false,
  showFavoriteButton = true,
  style = {},
}) => {
  const handleFavoritePress = () => {
    if (onFavoritePress) {
      onFavoritePress(property);
    }
  };

  const handleCardPress = () => {
    if (onPress) {
      onPress(property);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handleCardPress}
      activeOpacity={0.8}

      {/* Property Image */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              property.images?.[0] ||
              "https://via.placeholder.com/300x200?text=No+Image",
          }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Favorite Button */}
        {showFavoriteButton && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name={isFavorite ? "favorite" : "favorite-border"}
              size={24}
              color={isFavorite ? COLORS.error : COLORS.background}
            />
          </TouchableOpacity>
        )}

        {/* Price Badge */}
        <View style={styles.priceBadge}>
          <Text style={styles.priceText}>
            {formatPrice(property.price)}/night
          </Text>
        </View>
      </View>

      {/* Property Details */}
      <View style={styles.detailsContainer}>
        {/* Location */}
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={16} color={COLORS.textSecondary} />
          <Text style={styles.locationText} numberOfLines={1}>
            {property.area}, {property.city}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {property.title}
        </Text>

        {/* Property Features */}
        <View style={styles.featuresContainer}>
          {property.bedrooms && (
            <View style={styles.feature}>
              <Icon name="bed" size={16} color={COLORS.textSecondary} />
              <Text style={styles.featureText}>{property.bedrooms} bed</Text>
            </View>
          )}

          {property.bathrooms && (
            <View style={styles.feature}>
              <Icon name="bathtub" size={16} color={COLORS.textSecondary} />
              <Text style={styles.featureText}>{property.bathrooms} bath</Text>
            </View>
          )}

          {property.guests && (
            <View style={styles.feature}>
              <Icon name="people" size={16} color={COLORS.textSecondary} />
              <Text style={styles.featureText}>{property.guests} guests</Text>
            </View>
          )}
        </View>

        {/* Rating */}
        {property.rating && (
          <View style={styles.ratingContainer}>
            <Icon name="star" size={16} color={COLORS.warning} />
            <Text style={styles.ratingText}>
              {property.rating} ({property.reviewCount || 0} reviews)
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    marginBottom: SPACING.md,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: SPACING.sm,
    right: SPACING.sm,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 20,
    padding: SPACING.xs,
  },
  priceBadge: {
    position: "absolute",
    bottom: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  priceText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.sm,
    fontWeight: "600",
  },
  detailsContainer: {
    padding: SPACING.md,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.xs,
  },
  locationText: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  title: {
    fontSize: FONT_SIZES.md,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: 22,
  },
  featuresContainer: {
    flexDirection: "row",
    marginBottom: SPACING.sm,
  },
  feature: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: SPACING.md,
  },
  featureText: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: SPACING.xs,
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
});

export default PropertyCard;
