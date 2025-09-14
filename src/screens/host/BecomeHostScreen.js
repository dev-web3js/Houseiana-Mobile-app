import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../shared/constants';

const { width } = Dimensions.get('window');

const BecomeHostScreen = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const scrollViewRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const onboardingSteps = [
    {
      id: 1,
      title: 'Share your space',
      subtitle: 'Earn money as a Houseiana host',
      description:
        "Turn your extra space into extra income. List your property on Qatar's premier rental platform.",
      image:
        'https://images.unsplash.com/photo-1715168437311-18b9ec0830c1?w=400&h=300&fit=crop',
      icon: '🏠',
    },
    {
      id: 2,
      title: 'Host with confidence',
      subtitle: "We've got you covered",
      description:
        'Our Host Protection Program and 24/7 support give you peace of mind when hosting in Qatar.',
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      icon: '🛡️',
    },
    {
      id: 3,
      title: "It's free to get started",
      subtitle: 'Set up your listing',
      description:
        'Create your listing for free. Only pay when you start earning from successful bookings.',
      image:
        'https://images.unsplash.com/photo-1580041065738-e72023775cdc?w=400&h=300&fit=crop',
      icon: '✨',
    },
  ];

  const benefits = [
    {
      icon: '💰',
      title: 'Earn QAR 2,000+ monthly',
      description: 'Top hosts in Qatar earn substantial income',
    },
    {
      icon: '📱',
      title: 'Easy management',
      description: 'Control everything from your phone',
    },
    {
      icon: '🔒',
      title: 'Secure payments',
      description: 'Get paid safely through our platform',
    },
    {
      icon: '🇶🇦',
      title: 'Qatar-focused',
      description: 'Built specifically for the Qatar market',
    },
  ];

  const handleNextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      // Animate to next step
      scrollViewRef.current?.scrollTo({
        x: nextStep * width,
        animated: true,
      });
    } else {
      navigation.navigate('BecomeHostRegister');
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);

      scrollViewRef.current?.scrollTo({
        x: prevStep * width,
        animated: true,
      });
    }
  };

  const renderStep = (step, index) => (
    <View key={step.id} style={styles.stepContainer}>
      <View style={styles.stepContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: step.image }} style={styles.stepImage} />
          <View style={styles.iconOverlay}>
            <Text style={styles.stepIcon}>{step.icon}</Text>
          </View>
        </View>

        <View style={styles.textContent}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
        </View>
      </View>
    </View>
  );

  const renderBenefit = (benefit, index) => (
    <View key={index} style={styles.benefitItem}>
      <View style={styles.benefitIconContainer}>
        <Text style={styles.benefitIcon}>{benefit.icon}</Text>
      </View>
      <View style={styles.benefitContent}>
        <Text style={styles.benefitTitle}>{benefit.title}</Text>
        <Text style={styles.benefitDescription}>{benefit.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Become a Host</Text>
        <TouchableOpacity
          style={styles.skipButton}
          onPress={() => navigation.navigate('BecomeHostRegister')}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        {onboardingSteps.map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index === currentStep && styles.progressDotActive,
            ]}
          />
        ))}
      </View>

      {/* Onboarding Steps */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.stepsScrollView}
      >
        {onboardingSteps.map(renderStep)}
      </ScrollView>

      {/* Benefits Section (only on last step) */}
      {currentStep === onboardingSteps.length - 1 && (
        <View style={styles.benefitsSection}>
          <Text style={styles.benefitsTitle}>Why host with Houseiana?</Text>
          <View style={styles.benefitsList}>{benefits.map(renderBenefit)}</View>
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.previousButton}
            onPress={handlePreviousStep}
          >
            <Text style={styles.previousButtonText}>Previous</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[
            styles.nextButton,
            currentStep === 0 && styles.nextButtonFullWidth,
          ]}
          onPress={handleNextStep}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === onboardingSteps.length - 1
              ? 'Get Started'
              : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Host earnings preview */}
      <View style={styles.earningsPreview}>
        <Text style={styles.earningsTitle}>Qatar hosts earn an average of</Text>
        <Text style={styles.earningsAmount}>QAR 1,850</Text>
        <Text style={styles.earningsSubtitle}>per month</Text>
      </View>
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
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  backButtonText: {
    fontSize: 20,
    color: COLORS.text,
    fontWeight: '600',
  },
  headerTitle: {
    ...TYPOGRAPHY.h2,
  },
  skipButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  skipButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  stepsScrollView: {
    flex: 1,
  },
  stepContainer: {
    width: width,
    flex: 1,
  },
  stepContent: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  stepImage: {
    width: width - SPACING.lg * 2,
    height: 200,
    borderRadius: 16,
  },
  iconOverlay: {
    position: 'absolute',
    bottom: -20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.background,
  },
  stepIcon: {
    fontSize: 28,
  },
  textContent: {
    alignItems: 'center',
  },
  stepTitle: {
    ...TYPOGRAPHY.h1,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  stepSubtitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  stepDescription: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    lineHeight: 24,
    color: COLORS.textSecondary,
  },
  benefitsSection: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
  },
  benefitsTitle: {
    ...TYPOGRAPHY.h3,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  benefitsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  benefitIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  benefitIcon: {
    fontSize: 20,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '600',
    marginBottom: 2,
  },
  benefitDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
  },
  previousButton: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  previousButtonText: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    color: COLORS.text,
  },
  nextButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonFullWidth: {
    flex: 1,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  earningsPreview: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  earningsTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  earningsAmount: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  earningsSubtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    opacity: 0.9,
  },
});

export default BecomeHostScreen;
