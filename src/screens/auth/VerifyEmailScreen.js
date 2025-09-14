import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../shared/constants';
import { apiService } from '../../services/api';

const VerifyEmailScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const { email, token } = route.params || {};

  useEffect(() => {
    // If token is provided, automatically verify
    if (token) {
      handleTokenVerification(token);
    }

    // Start countdown for resend button
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [token]);

  const handleTokenVerification = async (verificationToken) => {
    setIsLoading(true);
    try {
      await apiService.verifyEmail({ token: verificationToken });
      setIsVerified(true);

      // Auto navigate to dashboard after 3 seconds
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      }, 3000);
    } catch (error) {
      Alert.alert(
        'Verification Failed',
        error.message || 'The verification link is invalid or expired.',
        [
          { text: 'Resend Email', onPress: handleResendVerification },
          { text: 'OK', style: 'cancel' },
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      Alert.alert('Error', 'Email address not found. Please sign up again.');
      return;
    }

    setIsResending(true);
    try {
      await apiService.resendVerification({ email });
      Alert.alert(
        'Email Sent',
        'A new verification email has been sent to your address.'
      );

      // Reset countdown
      setCountdown(60);
      setCanResend(false);

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      Alert.alert(
        'Error',
        error.message || 'Failed to send verification email'
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleSkipForNow = () => {
    Alert.alert(
      'Skip Verification?',
      'You can verify your email later in account settings. Some features may be limited.',
      [
        {
          text: 'Continue Anyway',
          onPress: () =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'MainTabs' }],
            }),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>Verifying your email...</Text>
        </View>
      </View>
    );
  }

  if (isVerified) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Text style={styles.successIconText}>✓</Text>
            </View>

            <Text style={styles.successTitle}>Email Verified!</Text>
            <Text style={styles.successMessage}>
              Your email has been successfully verified. You now have full
              access to all Houseiana features.
            </Text>

            <TouchableOpacity
              style={styles.continueButton}
              onPress={() =>
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'MainTabs' }],
                })
              }
            >
              <Text style={styles.continueButtonText}>Continue to App</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.emailIcon}>
            <Text style={styles.emailIconText}>📧</Text>
          </View>

          <Text style={styles.title}>Check your email</Text>
          <Text style={styles.subtitle}>
            We've sent a verification email to{'\n'}
            <Text style={styles.emailHighlight}>{email}</Text>
          </Text>

          <Text style={styles.instructionText}>
            Click the verification link in the email to activate your account.
            The link will expire in 24 hours.
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.resendButton,
                !canResend && styles.resendButtonDisabled,
              ]}
              onPress={handleResendVerification}
              disabled={!canResend || isResending}
            >
              {isResending ? (
                <ActivityIndicator color={COLORS.primary} size="small" />
              ) : (
                <Text
                  style={[
                    styles.resendButtonText,
                    !canResend && styles.resendButtonTextDisabled,
                  ]}
                >
                  {canResend ? 'Resend Email' : `Resend in ${countdown}s`}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkipForNow}
            >
              <Text style={styles.skipButtonText}>Skip for now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.helpSection}>
            <Text style={styles.helpTitle}>Didn't receive the email?</Text>
            <Text style={styles.helpText}>
              • Check your spam or junk folder{'\n'}• Make sure {email} is
              correct{'\n'}• Try resending the verification email
            </Text>
          </View>

          <TouchableOpacity
            style={styles.changeEmailButton}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Register' }],
              });
            }}
          >
            <Text style={styles.changeEmailText}>Use a different email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  header: {
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
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    alignItems: 'center',
  },
  emailIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  emailIconText: {
    fontSize: 40,
  },
  title: {
    ...TYPOGRAPHY.h1,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: 22,
  },
  emailHighlight: {
    fontWeight: '600',
    color: COLORS.primary,
  },
  instructionText: {
    ...TYPOGRAPHY.bodySmall,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  actionButtons: {
    width: '100%',
    marginBottom: SPACING.xl,
  },
  resendButton: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  resendButtonDisabled: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  resendButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  resendButtonTextDisabled: {
    color: COLORS.textSecondary,
  },
  skipButton: {
    paddingVertical: SPACING.md,
    alignItems: 'center',
  },
  skipButtonText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  helpSection: {
    width: '100%',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  helpTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  helpText: {
    ...TYPOGRAPHY.bodySmall,
    lineHeight: 20,
  },
  changeEmailButton: {
    paddingVertical: SPACING.md,
  },
  changeEmailText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Success state styles
  successContainer: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: 100,
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  successIconText: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  successTitle: {
    ...TYPOGRAPHY.h1,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  successMessage: {
    ...TYPOGRAPHY.body,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 22,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VerifyEmailScreen;
