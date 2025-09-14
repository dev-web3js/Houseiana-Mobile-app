import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import propertiesService from '../../properties/propertiesService';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  PROPERTY_TYPES,
} from '../../shared/constants';

const { width } = Dimensions.get('window');

const AddPropertyScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'apartment',
    bedrooms: '',
    bathrooms: '',
    area: '',
    price: '',
    monthlyPrice: '',
    city: '',
    location: '',
    amenities: [],
    photos: [],
  });
  const [loading, setLoading] = useState(false);

  const amenitiesOptions = [
    'WiFi',
    'Kitchen',
    'Parking',
    'Pool',
    'Gym',
    'AC',
    'Heating',
    'TV',
    'Washer',
    'Balcony',
    'Garden',
    'Security',
    'Elevator',
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets) {
        const newPhotos = response.assets.map((asset) => ({
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName || 'photo.jpg',
        }));

        setFormData((prev) => ({
          ...prev,
          photos: [...prev.photos, ...newPhotos],
        }));
      }
    });
  };

  const removePhoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const required = ['title', 'description', 'price', 'city', 'location'];
    const missing = required.filter((field) => !formData[field]);

    if (missing.length > 0) {
      Alert.alert('Error', `Please fill in: ${missing.join(', ')}`);
      return false;
    }

    if (formData.photos.length === 0) {
      Alert.alert('Error', 'Please add at least one photo');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Convert form data for API
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        monthlyPrice: formData.monthlyPrice
          ? parseFloat(formData.monthlyPrice)
          : null,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : null,
        area: formData.area ? parseFloat(formData.area) : null,
        // In a real app, photos would be uploaded to cloud storage first
        photos: formData.photos.map((photo) => photo.uri),
      };

      await propertiesService.createProperty(propertyData);

      Alert.alert('Success', 'Property has been created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  const renderFormSection = (title, children) => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Property</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderFormSection(
          'Basic Information',
          <>
            <TextInput
              style={styles.input}
              placeholder="Property Title"
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.inputLabel}>Property Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.typeContainer}>
                {PROPERTY_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    style={[
                      styles.typeButton,
                      formData.type === type.value && styles.typeButtonActive,
                    ]}
                    onPress={() => handleInputChange('type', type.value)}
                  >
                    <Text
                      style={[
                        styles.typeText,
                        formData.type === type.value && styles.typeTextActive,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </>
        )}

        {renderFormSection(
          'Property Details',
          <>
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Bedrooms</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  value={formData.bedrooms}
                  onChangeText={(value) => handleInputChange('bedrooms', value)}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.halfInput}>
                <Text style={styles.inputLabel}>Bathrooms</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0"
                  value={formData.bathrooms}
                  onChangeText={(value) =>
                    handleInputChange('bathrooms', value)
                  }
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Text style={styles.inputLabel}>Area (sq ft)</Text>
            <TextInput
              style={styles.input}
              placeholder="1000"
              value={formData.area}
              onChangeText={(value) => handleInputChange('area', value)}
              keyboardType="numeric"
            />
          </>
        )}

        {renderFormSection(
          'Pricing',
          <>
            <Text style={styles.inputLabel}>Nightly Price (QAR)</Text>
            <TextInput
              style={styles.input}
              placeholder="500"
              value={formData.price}
              onChangeText={(value) => handleInputChange('price', value)}
              keyboardType="numeric"
            />

            <Text style={styles.inputLabel}>
              Monthly Price (QAR) - Optional
            </Text>
            <TextInput
              style={styles.input}
              placeholder="12000"
              value={formData.monthlyPrice}
              onChangeText={(value) => handleInputChange('monthlyPrice', value)}
              keyboardType="numeric"
            />
          </>
        )}

        {renderFormSection(
          'Location',
          <>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="Doha"
              value={formData.city}
              onChangeText={(value) => handleInputChange('city', value)}
            />

            <Text style={styles.inputLabel}>Specific Location/Area</Text>
            <TextInput
              style={styles.input}
              placeholder="West Bay, The Pearl, etc."
              value={formData.location}
              onChangeText={(value) => handleInputChange('location', value)}
            />
          </>
        )}

        {renderFormSection(
          'Amenities',
          <View style={styles.amenitiesGrid}>
            {amenitiesOptions.map((amenity) => (
              <TouchableOpacity
                key={amenity}
                style={[
                  styles.amenityButton,
                  formData.amenities.includes(amenity) &&
                    styles.amenityButtonActive,
                ]}
                onPress={() => toggleAmenity(amenity)}
              >
                <Text
                  style={[
                    styles.amenityText,
                    formData.amenities.includes(amenity) &&
                      styles.amenityTextActive,
                  ]}
                >
                  {amenity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {renderFormSection(
          'Photos',
          <>
            <TouchableOpacity
              style={styles.addPhotoButton}
              onPress={handleImagePicker}
            >
              <Icon name="add-a-photo" size={32} color={COLORS.primary} />
              <Text style={styles.addPhotoText}>Add Photos</Text>
              <Text style={styles.addPhotoSubtext}>
                Upload high-quality photos of your property
              </Text>
            </TouchableOpacity>

            {formData.photos.length > 0 && (
              <View style={styles.photosGrid}>
                {formData.photos.map((photo, index) => (
                  <View key={index} style={styles.photoContainer}>
                    <Image
                      source={{ uri: photo.uri }}
                      style={styles.photoPreview}
                    />
                    <TouchableOpacity
                      style={styles.removePhotoButton}
                      onPress={() => removePhoto(index)}
                    >
                      <Icon name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Creating Property...' : 'Create Property'}
          </Text>
        </TouchableOpacity>
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
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  formSection: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.lg,
    marginVertical: SPACING.sm,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
    marginTop: SPACING.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: SPACING.md,
    fontSize: FONT_SIZES.sm,
    backgroundColor: COLORS.background,
    marginBottom: SPACING.sm,
  },
  textArea: {
    height: 100,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  halfInput: {
    flex: 1,
  },
  typeContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingVertical: SPACING.sm,
  },
  typeButton: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  typeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
    fontWeight: '500',
  },
  typeTextActive: {
    color: COLORS.background,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  amenityButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  amenityButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  amenityText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text,
    fontWeight: '500',
  },
  amenityTextActive: {
    color: COLORS.background,
  },
  addPhotoButton: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  addPhotoText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  addPhotoSubtext: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  photoContainer: {
    position: 'relative',
  },
  photoPreview: {
    width: (width - SPACING.lg * 4 - SPACING.sm * 2) / 3,
    height: 100,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: SPACING.lg,
    alignItems: 'center',
    marginVertical: SPACING.xl,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
});

export default AddPropertyScreen;
