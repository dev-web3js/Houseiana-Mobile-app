import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, PAYMENT_METHODS, REGIONS } from '../../shared/constants';
import { apiService } from '../../services/api';
import { detectUserRegion, getRegionalDefaults } from '../../shared/utils';
import { useTranslation } from '../../services/localizationService';

const PaymentMethodsScreen = ({ navigation }) => {
  const { t, currentRegion } = useTranslation();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultMethodId, setDefaultMethodId] = useState(null);
  const [userRegion, setUserRegion] = useState(currentRegion || 'North America');
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState([]);

  useEffect(() => {
    loadPaymentMethods();
    loadAvailablePaymentMethods();
  }, [userRegion]);

  const loadAvailablePaymentMethods = () => {
    const available = [];
    
    // Global cards - always available
    Object.values(PAYMENT_METHODS.cards).forEach(card => {
      if (card.global) {
        available.push({ ...card, category: 'cards' });
      }
    });

    // Regional payment methods
    Object.entries(PAYMENT_METHODS).forEach(([category, methods]) => {
      if (category === 'cards') return; // Already handled
      
      Object.values(methods).forEach(method => {
        if (method.global || (method.regions && method.regions.includes(userRegion))) {
          available.push({ ...method, category });
        }
      });
    });

    setAvailablePaymentMethods(available);
  };

  const loadPaymentMethods = async () => {
    try {
      const response = await apiService.getPaymentMethods();
      setPaymentMethods(response.data || mockPaymentMethods);
      const defaultMethod = response.data?.find((method) => method.isDefault);
      setDefaultMethodId(defaultMethod?.id);
    } catch (error) {
      // Use mock data for development
      setPaymentMethods(mockPaymentMethods);
      setDefaultMethodId(mockPaymentMethods[0]?.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPaymentMethod = () => {
    navigation.navigate('AddPaymentMethod');
  };

  const handleEditPaymentMethod = (method) => {
    navigation.navigate('EditPaymentMethod', { methodId: method.id });
  };

  const handleDeletePaymentMethod = (method) => {
    Alert.alert(
      'Delete Payment Method',
      `Are you sure you want to delete ${
        method.type === 'card' ? 'this card' : method.title
      }?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await apiService.deletePaymentMethod(method.id);
              setPaymentMethods((prev) =>
                prev.filter((m) => m.id !== method.id)
              );
              if (defaultMethodId === method.id) {
                setDefaultMethodId(null);
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to delete payment method');
            }
          },
        },
      ]
    );
  };

  const handleSetDefault = async (methodId) => {
    try {
      await apiService.setDefaultPaymentMethod(methodId);
      setDefaultMethodId(methodId);
    } catch (error) {
      Alert.alert('Error', 'Failed to update default payment method');
    }
  };

  const getCardIcon = (brand) => {
    const icons = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳',
      default: '💳',
    };
    return icons[brand?.toLowerCase()] || icons.default;
  };

  const getPaymentMethodIcon = (type) => {
    const icons = {
      card: '💳',
      paypal: '🅿️',
      apple_pay: '🍎',
      google_pay: '🔴',
      bank_transfer: '🏦',
      digital_wallet: '💰',
    };
    return icons[type] || '💳';
  };

  const formatCardNumber = (number) => {
    return `•••• •••• •••• ${number.slice(-4)}`;
  };

  const renderPaymentMethod = (method) => (
    <View key={method.id} style={styles.paymentMethodCard}>
      <View style={styles.paymentMethodHeader}>
        <View style={styles.paymentMethodInfo}>
          <Text style={styles.paymentMethodIcon}>
            {method.type === 'card'
              ? getCardIcon(method.brand)
              : getPaymentMethodIcon(method.type)}
          </Text>
          <View style={styles.paymentMethodDetails}>
            <Text style={styles.paymentMethodTitle}>
              {method.type === 'card'
                ? `${method.brand?.toUpperCase()} ${formatCardNumber(
                    method.lastFour
                  )}`
                : method.title}
            </Text>
            <Text style={styles.paymentMethodSubtitle}>
              {method.type === 'card'
                ? `Expires ${method.expiryMonth}/${method.expiryYear}`
                : method.description}
            </Text>
          </View>
        </View>

        <View style={styles.paymentMethodActions}>
          {method.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => {
              Alert.alert(
                method.type === 'card'
                  ? 'Card Options'
                  : 'Payment Method Options',
                'What would you like to do?',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Set as Default',
                    onPress: () => handleSetDefault(method.id),
                    style: method.isDefault ? 'cancel' : 'default',
                  },
                  {
                    text: 'Edit',
                    onPress: () => handleEditPaymentMethod(method),
                  },
                  {
                    text: 'Delete',
                    onPress: () => handleDeletePaymentMethod(method),
                    style: 'destructive',
                  },
                ]
              );
            }}
          >
            <Text style={styles.moreButtonText}>⋯</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Additional method details */}
      <View style={styles.paymentMethodFooter}>
        <View style={styles.paymentMethodStatus}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: method.isVerified
                  ? COLORS.success
                  : COLORS.warning,
              },
            ]}
          />
          <Text style={styles.statusText}>
            {method.isVerified ? 'Verified' : 'Pending verification'}
          </Text>
        </View>

        {method.lastUsed && (
          <Text style={styles.lastUsedText}>
            Last used {new Date(method.lastUsed).toLocaleDateString()}
          </Text>
        )}
      </View>
    </View>
  );

  const renderAddMethodSection = () => (
    <View style={styles.addMethodSection}>
      <Text style={styles.sectionTitle}>Add Payment Method</Text>

      <TouchableOpacity
        style={styles.addMethodButton}
        onPress={() => navigation.navigate('AddCreditCard')}
      >
        <Text style={styles.addMethodIcon}>💳</Text>
        <View style={styles.addMethodInfo}>
          <Text style={styles.addMethodTitle}>Credit or Debit Card</Text>
          <Text style={styles.addMethodDescription}>
            Visa, Mastercard, Amex
          </Text>
        </View>
        <Text style={styles.addMethodArrow}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addMethodButton}
        onPress={() => navigation.navigate('AddBankAccount')}
      >
        <Text style={styles.addMethodIcon}>🏦</Text>
        <View style={styles.addMethodInfo}>
          <Text style={styles.addMethodTitle}>Bank Account</Text>
          <Text style={styles.addMethodDescription}>Direct bank transfer</Text>
        </View>
        <Text style={styles.addMethodArrow}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.addMethodButton}
        onPress={() => navigation.navigate('AddDigitalWallet')}
      >
        <Text style={styles.addMethodIcon}>📱</Text>
        <View style={styles.addMethodInfo}>
          <Text style={styles.addMethodTitle}>Digital Wallet</Text>
          <Text style={styles.addMethodDescription}>
            PayPal, Apple Pay, Google Pay
          </Text>
        </View>
        <Text style={styles.addMethodArrow}>→</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSecuritySection = () => (
    <View style={styles.securitySection}>
      <Text style={styles.sectionTitle}>Security & Privacy</Text>

      <View style={styles.securityItem}>
        <View style={styles.securityInfo}>
          <Text style={styles.securityTitle}>Save payment info</Text>
          <Text style={styles.securityDescription}>
            Securely store payment methods for faster checkout
          </Text>
        </View>
        <Switch
          value={true}
          trackColor={{ false: COLORS.border, true: COLORS.primary }}
          thumbColor={'#FFFFFF'}
        />
      </View>

      <TouchableOpacity
        style={styles.securityItem}
        onPress={() => navigation.navigate('PaymentSecurity')}
      >
        <View style={styles.securityInfo}>
          <Text style={styles.securityTitle}>Payment security</Text>
          <Text style={styles.securityDescription}>
            2FA, fraud protection, secure encryption
          </Text>
        </View>
        <Text style={styles.securityArrow}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.securityItem}
        onPress={() => navigation.navigate('TransactionHistory')}
      >
        <View style={styles.securityInfo}>
          <Text style={styles.securityTitle}>Transaction history</Text>
          <Text style={styles.securityDescription}>
            View all payment transactions
          </Text>
        </View>
        <Text style={styles.securityArrow}>→</Text>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddPaymentMethod}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Payment Methods */}
        {paymentMethods.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Payment Methods</Text>
            {paymentMethods.map(renderPaymentMethod)}
          </View>
        )}

        {/* Add New Methods */}
        {renderAddMethodSection()}

        {/* Security Section */}
        {renderSecuritySection()}

        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
};

// Global mock data for development
const mockPaymentMethods = [
  {
    id: '1',
    type: 'card',
    brand: 'visa',
    lastFour: '4242',
    expiryMonth: '12',
    expiryYear: '25',
    isDefault: true,
    isVerified: true,
    lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    currency: 'USD',
    region: 'North America',
  },
  {
    id: '2',
    type: 'card',
    brand: 'mastercard',
    lastFour: '8888',
    expiryMonth: '08',
    expiryYear: '26',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    currency: 'EUR',
    region: 'Europe',
  },
  {
    id: '3',
    type: 'paypal',
    title: 'PayPal',
    description: 'user@example.com',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    currency: 'USD',
    region: 'Global',
  },
  {
    id: '4',
    type: 'apple_pay',
    title: 'Apple Pay',
    description: 'Touch ID & Face ID',
    isDefault: false,
    isVerified: true,
    lastUsed: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    currency: 'USD',
    region: 'North America',
  },
  {
    id: '5',
    type: 'bank_transfer',
    title: 'Wire Transfer',
    description: 'International bank transfer',
    isDefault: false,
    isVerified: true,
    lastUsed: null,
    currency: 'USD',
    region: 'Global',
  },
];

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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.md,
  },
  paymentMethodCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  paymentMethodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  paymentMethodSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  paymentMethodActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  defaultBadge: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  defaultBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  moreButton: {
    padding: SPACING.sm,
  },
  moreButtonText: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  paymentMethodFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentMethodStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.xs,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  lastUsedText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  addMethodSection: {
    marginBottom: SPACING.xl,
  },
  addMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addMethodIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  addMethodInfo: {
    flex: 1,
  },
  addMethodTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  addMethodDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  addMethodArrow: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  securitySection: {
    marginBottom: SPACING.xl,
  },
  securityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  securityInfo: {
    flex: 1,
    marginRight: SPACING.md,
  },
  securityTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  securityDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  securityArrow: {
    fontSize: 20,
    color: COLORS.textSecondary,
  },
  spacer: {
    height: 50,
  },
});

export default PaymentMethodsScreen;
