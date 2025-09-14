import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  Share,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../shared/constants';
import { apiService } from '../../services/api';

const AccountSettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    notifications: {
      push: true,
      email: true,
      sms: false,
      marketing: false,
    },
    privacy: {
      profileVisible: true,
      showReviews: true,
      showWishlists: false,
    },
    preferences: {
      currency: 'QAR',
      language: 'English',
      dateFormat: 'DD/MM/YYYY',
    },
  });

  const [userStats, setUserStats] = useState({
    accountCreated: new Date(2023, 8, 15),
    totalBookings: 8,
    totalNights: 24,
    isVerified: true,
    hostSince: null,
  });

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      const response = await apiService.getUserSettings();
      setSettings(response.data || settings);
    } catch (error) {
      // Use default settings
    }
  };

  const updateSetting = async (category, key, value) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value,
      },
    };

    setSettings(newSettings);

    try {
      await apiService.updateUserSettings(newSettings);
    } catch (error) {
      Alert.alert('Error', 'Failed to update settings');
      // Revert the change
      setSettings(settings);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone and you will lose all your data.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Final Confirmation',
              'Type "DELETE" to confirm account deletion.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Confirm Delete',
                  style: 'destructive',
                  onPress: async () => {
                    try {
                      await apiService.deleteUserAccount();
                      navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                      });
                    } catch (error) {
                      Alert.alert('Error', 'Failed to delete account');
                    }
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleShareApp = async () => {
    try {
      await Share.share({
        message:
          "Check out Houseiana - Qatar's premier property rental platform! Download the app and discover amazing places to stay.",
        url: 'https://houseiana.qa/app',
      });
    } catch (error) {
      console.error('Error sharing app:', error);
    }
  };

  const renderToggleSetting = (title, description, category, key) => (
    <View style={styles.settingItem}>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={settings[category][key]}
        onValueChange={(value) => updateSetting(category, key, value)}
        trackColor={{ false: COLORS.border, true: COLORS.primary }}
        thumbColor={settings[category][key] ? '#FFFFFF' : COLORS.textSecondary}
        ios_backgroundColor={COLORS.border}
      />
    </View>
  );

  const renderActionSetting = (
    title,
    description,
    onPress,
    textColor = COLORS.text
  ) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, { color: textColor }]}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      <Text style={styles.settingArrow}>→</Text>
    </TouchableOpacity>
  );

  const renderSection = (title, children) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>{children}</View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Account Overview</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.totalBookings}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userStats.totalNights}</Text>
              <Text style={styles.statLabel}>Nights</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {new Date().getFullYear() -
                  userStats.accountCreated.getFullYear()}
              </Text>
              <Text style={styles.statLabel}>Years</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userStats.isVerified ? '✓' : '○'}
              </Text>
              <Text style={styles.statLabel}>Verified</Text>
            </View>
          </View>
        </View>

        {/* Account Information */}
        {renderSection('Account Information', [
          renderActionSetting(
            'Personal Information',
            'Name, email, phone number',
            () => navigation.navigate('PersonalInfo')
          ),
          renderActionSetting(
            'Identity Verification',
            userStats.isVerified ? 'Verified' : 'Complete verification',
            () => navigation.navigate('KYCVerify')
          ),
          renderActionSetting(
            'Login & Security',
            'Password, two-factor authentication',
            () => navigation.navigate('LoginSecurity')
          ),
          renderActionSetting(
            'Payment Methods',
            'Manage cards and payment options',
            () => navigation.navigate('PaymentMethods')
          ),
        ])}

        {/* Notifications */}
        {renderSection('Notifications', [
          renderToggleSetting(
            'Push Notifications',
            'Booking updates and messages',
            'notifications',
            'push'
          ),
          renderToggleSetting(
            'Email Notifications',
            'Trip confirmations and receipts',
            'notifications',
            'email'
          ),
          renderToggleSetting(
            'SMS Notifications',
            'Important account alerts',
            'notifications',
            'sms'
          ),
          renderToggleSetting(
            'Marketing Communications',
            'Special offers and promotions',
            'notifications',
            'marketing'
          ),
        ])}

        {/* Privacy */}
        {renderSection('Privacy & Sharing', [
          renderToggleSetting(
            'Profile Visibility',
            'Allow others to find your profile',
            'privacy',
            'profileVisible'
          ),
          renderToggleSetting(
            'Show Reviews',
            'Display reviews on your profile',
            'privacy',
            'showReviews'
          ),
          renderToggleSetting(
            'Show Wishlists',
            'Make your wishlists public',
            'privacy',
            'showWishlists'
          ),
          renderActionSetting(
            'Data & Privacy',
            'Download your data, privacy settings',
            () => navigation.navigate('DataPrivacy')
          ),
        ])}

        {/* Preferences */}
        {renderSection('Preferences', [
          renderActionSetting(
            'Language & Region',
            `${settings.preferences.language} (${settings.preferences.currency})`,
            () => navigation.navigate('LanguageRegion')
          ),
          renderActionSetting(
            'Date & Time',
            settings.preferences.dateFormat,
            () => navigation.navigate('DateTimeSettings')
          ),
          renderActionSetting(
            'Accessibility',
            'Font size, contrast, screen reader',
            () => navigation.navigate('Accessibility')
          ),
        ])}

        {/* Host Settings (if applicable) */}
        {userStats.hostSince &&
          renderSection('Host Tools', [
            renderActionSetting(
              'Professional Hosting Tools',
              'Advanced host features',
              () => navigation.navigate('HostTools')
            ),
            renderActionSetting(
              'Host Preferences',
              'Booking requirements, house rules',
              () => navigation.navigate('HostPreferences')
            ),
          ])}

        {/* Support & Legal */}
        {renderSection('Support & Legal', [
          renderActionSetting('Help Center', 'Get help and support', () =>
            navigation.navigate('Help')
          ),
          renderActionSetting(
            'Give us Feedback',
            'Help us improve Houseiana',
            () => navigation.navigate('Feedback')
          ),
          renderActionSetting(
            'Share Houseiana',
            'Invite friends to join',
            handleShareApp
          ),
          renderActionSetting(
            'Terms of Service',
            'Legal terms and conditions',
            () => navigation.navigate('TermsOfService')
          ),
          renderActionSetting(
            'Privacy Policy',
            'How we protect your privacy',
            () => navigation.navigate('PrivacyPolicy')
          ),
        ])}

        {/* Danger Zone */}
        {renderSection('Account Actions', [
          renderActionSetting('Sign Out', 'Sign out of your account', () => {
            Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Sign Out',
                onPress: () =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  }),
              },
            ]);
          }),
          renderActionSetting(
            'Delete Account',
            'Permanently delete your account and data',
            handleDeleteAccount,
            COLORS.error
          ),
        ])}

        <View style={styles.spacer} />
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
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  statsSection: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: SPACING.lg,
    marginVertical: SPACING.md,
  },
  statsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.sm,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionContent: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  settingArrow: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  spacer: {
    height: 50,
  },
});

export default AccountSettingsScreen;
