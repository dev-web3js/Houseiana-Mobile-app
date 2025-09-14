import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { launchImagePicker } from 'react-native-image-picker';
import { COLORS, SPACING, TYPOGRAPHY } from '../../shared/constants';
import { apiService } from '../../services/api';

const KYCVerificationScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [kycData, setKycData] = useState({
    documentType: null,
    frontImage: null,
    backImage: null,
    selfieImage: null,
    personalInfo: {},
  });
  const [isUploading, setIsUploading] = useState(false);

  const documentTypes = [
    {
      id: 'passport',
      title: 'Passport',
      description: 'International passport',
      icon: '📘',
      requirements: [
        'Clear photo of passport pages',
        'Must be valid and not expired',
      ],
    },
    {
      id: 'national_id',
      title: 'National ID',
      description: 'Qatar ID or National ID',
      icon: '🪪',
      requirements: ['Front and back photos', 'Must be valid and not expired'],
    },
    {
      id: 'driving_license',
      title: 'Driving License',
      description: 'Government-issued license',
      icon: '🚗',
      requirements: ['Front and back photos', 'Must be valid and not expired'],
    },
  ];

  const verificationSteps = [
    {
      id: 1,
      title: 'Choose Document Type',
      description: 'Select your verification document',
    },
    {
      id: 2,
      title: 'Upload Documents',
      description: 'Take clear photos of your documents',
    },
    {
      id: 3,
      title: 'Take Selfie',
      description: 'Verify your identity with a selfie',
    },
    {
      id: 4,
      title: 'Review & Submit',
      description: 'Confirm your information',
    },
  ];

  const handleDocumentSelect = (documentType) => {
    setKycData((prev) => ({
      ...prev,
      documentType,
    }));
    setCurrentStep(2);
  };

  const handleImageCapture = (imageType) => {
    const options = {
      title: `Take ${imageType} Photo`,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
    };

    launchImagePicker(options, (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        setKycData((prev) => ({
          ...prev,
          [imageType]: imageUri,
        }));
      }
    });
  };

  const handleSubmitVerification = async () => {
    if (!kycData.frontImage || !kycData.selfieImage) {
      Alert.alert('Error', 'Please upload all required documents');
      return;
    }

    if (kycData.documentType?.id !== 'passport' && !kycData.backImage) {
      Alert.alert(
        'Error',
        'Please upload both front and back of your document'
      );
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();

      // Add document images
      if (kycData.frontImage) {
        formData.append('frontImage', {
          uri: kycData.frontImage,
          type: 'image/jpeg',
          name: 'front.jpg',
        });
      }

      if (kycData.backImage) {
        formData.append('backImage', {
          uri: kycData.backImage,
          type: 'image/jpeg',
          name: 'back.jpg',
        });
      }

      if (kycData.selfieImage) {
        formData.append('selfieImage', {
          uri: kycData.selfieImage,
          type: 'image/jpeg',
          name: 'selfie.jpg',
        });
      }

      formData.append('documentType', kycData.documentType.id);

      await apiService.submitKYCVerification(formData);

      Alert.alert(
        'Verification Submitted',
        "Your documents have been submitted for review. You'll receive an email within 24-48 hours.",
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to submit verification. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const renderProgressIndicator = () => (
    <View style={styles.progressContainer}>
      {verificationSteps.map((step, index) => (
        <View key={step.id} style={styles.progressStep}>
          <View
            style={[
              styles.progressDot,
              currentStep >= step.id && styles.progressDotActive,
              currentStep > step.id && styles.progressDotCompleted,
            ]}
          >
            {currentStep > step.id ? (
              <Text style={styles.progressCheckmark}>✓</Text>
            ) : (
              <Text
                style={[
                  styles.progressNumber,
                  currentStep >= step.id && styles.progressNumberActive,
                ]}
              >
                {step.id}
              </Text>
            )}
          </View>
          {index < verificationSteps.length - 1 && (
            <View
              style={[
                styles.progressLine,
                currentStep > step.id && styles.progressLineActive,
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderDocumentSelection = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Choose Your Document</Text>
      <Text style={styles.stepDescription}>
        Select the type of document you'd like to use for verification
      </Text>

      {documentTypes.map((docType) => (
        <TouchableOpacity
          key={docType.id}
          style={[
            styles.documentTypeCard,
            kycData.documentType?.id === docType.id &&
              styles.documentTypeCardSelected,
          ]}
          onPress={() => handleDocumentSelect(docType)}
        >
          <Text style={styles.documentIcon}>{docType.icon}</Text>
          <View style={styles.documentInfo}>
            <Text style={styles.documentTitle}>{docType.title}</Text>
            <Text style={styles.documentDescription}>
              {docType.description}
            </Text>
            <View style={styles.requirementsList}>
              {docType.requirements.map((req, index) => (
                <Text key={index} style={styles.requirementText}>
                  • {req}
                </Text>
              ))}
            </View>
          </View>
          <Text style={styles.selectArrow}>→</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderDocumentUpload = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Upload {kycData.documentType?.title}</Text>
      <Text style={styles.stepDescription}>
        Take clear photos of your {kycData.documentType?.title.toLowerCase()}
      </Text>

      {/* Front Image */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadLabel}>
          {kycData.documentType?.id === 'passport'
            ? 'Passport Photo Page'
            : 'Front Side'}
        </Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImageCapture('frontImage')}
        >
          {kycData.frontImage ? (
            <Image
              source={{ uri: kycData.frontImage }}
              style={styles.uploadedImage}
            />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Text style={styles.uploadIcon}>📷</Text>
              <Text style={styles.uploadText}>Take Photo</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Back Image (not required for passport) */}
      {kycData.documentType?.id !== 'passport' && (
        <View style={styles.uploadSection}>
          <Text style={styles.uploadLabel}>Back Side</Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleImageCapture('backImage')}
          >
            {kycData.backImage ? (
              <Image
                source={{ uri: kycData.backImage }}
                style={styles.uploadedImage}
              />
            ) : (
              <View style={styles.uploadPlaceholder}>
                <Text style={styles.uploadIcon}>📷</Text>
                <Text style={styles.uploadText}>Take Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentStep(1)}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !kycData.frontImage && styles.nextButtonDisabled,
          ]}
          onPress={() => setCurrentStep(3)}
          disabled={
            !kycData.frontImage ||
            (kycData.documentType?.id !== 'passport' && !kycData.backImage)
          }
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSelfieCapture = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Take a Selfie</Text>
      <Text style={styles.stepDescription}>
        Take a clear selfie to verify your identity matches your document
      </Text>

      <View style={styles.uploadSection}>
        <Text style={styles.uploadLabel}>Selfie Photo</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImageCapture('selfieImage')}
        >
          {kycData.selfieImage ? (
            <Image
              source={{ uri: kycData.selfieImage }}
              style={styles.uploadedImage}
            />
          ) : (
            <View style={styles.uploadPlaceholder}>
              <Text style={styles.uploadIcon}>🤳</Text>
              <Text style={styles.uploadText}>Take Selfie</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.selfieInstructions}>
        <Text style={styles.instructionsTitle}>Selfie Guidelines:</Text>
        <Text style={styles.instructionItem}>
          • Look directly at the camera
        </Text>
        <Text style={styles.instructionItem}>• Ensure good lighting</Text>
        <Text style={styles.instructionItem}>• Remove glasses if possible</Text>
        <Text style={styles.instructionItem}>• Don't use filters</Text>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentStep(2)}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !kycData.selfieImage && styles.nextButtonDisabled,
          ]}
          onPress={() => setCurrentStep(4)}
          disabled={!kycData.selfieImage}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderReview = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Review & Submit</Text>
      <Text style={styles.stepDescription}>
        Please review your information before submitting
      </Text>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>Document Type</Text>
        <Text style={styles.reviewValue}>{kycData.documentType?.title}</Text>
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.reviewSectionTitle}>Uploaded Documents</Text>
        <View style={styles.reviewImages}>
          {kycData.frontImage && (
            <Image
              source={{ uri: kycData.frontImage }}
              style={styles.reviewImage}
            />
          )}
          {kycData.backImage && (
            <Image
              source={{ uri: kycData.backImage }}
              style={styles.reviewImage}
            />
          )}
          {kycData.selfieImage && (
            <Image
              source={{ uri: kycData.selfieImage }}
              style={styles.reviewImage}
            />
          )}
        </View>
      </View>

      <View style={styles.verificationNotice}>
        <Text style={styles.noticeIcon}>ℹ️</Text>
        <View style={styles.noticeContent}>
          <Text style={styles.noticeTitle}>Verification Process</Text>
          <Text style={styles.noticeText}>
            Our team will review your documents within 24-48 hours. You'll
            receive an email with the verification result.
          </Text>
        </View>
      </View>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentStep(3)}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.submitButton,
            isUploading && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmitVerification}
          disabled={isUploading}
        >
          <Text style={styles.submitButtonText}>
            {isUploading ? 'Submitting...' : 'Submit Verification'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeButtonText}>×</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Identity Verification</Text>
        <View style={styles.headerSpacer} />
      </View>

      {renderProgressIndicator()}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 1 && renderDocumentSelection()}
        {currentStep === 2 && renderDocumentUpload()}
        {currentStep === 3 && renderSelfieCapture()}
        {currentStep === 4 && renderReview()}
      </ScrollView>
    </View>
  );
};

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
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: '600',
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  progressStep: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  progressDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
  },
  progressDotCompleted: {
    backgroundColor: COLORS.success,
  },
  progressNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  progressNumberActive: {
    color: '#FFFFFF',
  },
  progressCheckmark: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.border,
    marginHorizontal: SPACING.sm,
  },
  progressLineActive: {
    backgroundColor: COLORS.success,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    ...TYPOGRAPHY.h1,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  stepDescription: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  documentTypeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  documentTypeCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.accent,
  },
  documentIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  documentDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  requirementsList: {
    marginTop: 4,
  },
  requirementText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  selectArrow: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  uploadSection: {
    marginBottom: SPACING.lg,
  },
  uploadLabel: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  uploadButton: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  uploadPlaceholder: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    fontSize: 40,
    marginBottom: SPACING.sm,
  },
  uploadText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  uploadedImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  selfieInstructions: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginTop: SPACING.lg,
  },
  instructionsTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  instructionItem: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  reviewSection: {
    marginBottom: SPACING.lg,
  },
  reviewSectionTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  reviewValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  reviewImages: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  verificationNotice: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    flexDirection: 'row',
    marginBottom: SPACING.xl,
  },
  noticeIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  noticeContent: {
    flex: 1,
  },
  noticeTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  noticeText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: SPACING.xl,
  },
  backButton: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  backButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.text,
  },
  nextButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    backgroundColor: COLORS.success,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default KYCVerificationScreen;
