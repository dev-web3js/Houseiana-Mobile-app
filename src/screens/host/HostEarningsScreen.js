import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../shared/constants';
import { apiService } from '../../services/api';

const { width } = Dimensions.get('window');

const HostEarningsScreen = ({ navigation }) => {
  const [earnings, setEarnings] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const periods = [
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' },
    { key: 'year', label: 'This Year' },
  ];

  useEffect(() => {
    loadEarnings();
  }, [selectedPeriod]);

  const loadEarnings = async () => {
    try {
      const response = await apiService.getHostEarnings({
        period: selectedPeriod,
      });
      setEarnings(response.data || mockEarnings);
    } catch (error) {
      // Use mock data for development
      setEarnings(mockEarnings);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadEarnings();
    setIsRefreshing(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-QA', {
      style: 'currency',
      currency: 'QAR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getChangeColor = (change) => {
    if (change > 0) {
      return COLORS.success;
    }
    if (change < 0) {
      return COLORS.error;
    }
    return COLORS.textSecondary;
  };

  const renderEarningsCard = () => (
    <View style={styles.earningsCard}>
      <Text style={styles.cardTitle}>Total Earnings</Text>
      <Text style={styles.totalAmount}>
        {formatCurrency(earnings?.total || 0)}
      </Text>
      <View style={styles.changeContainer}>
        <Text
          style={[
            styles.changeText,
            { color: getChangeColor(earnings?.change || 0) },
          ]}
        >
          {earnings?.change > 0 ? '+' : ''}
          {earnings?.change || 0}%
        </Text>
        <Text style={styles.changeLabel}>vs last {selectedPeriod}</Text>
      </View>
    </View>
  );

  const renderStatsGrid = () => (
    <View style={styles.statsGrid}>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{earnings?.bookings || 0}</Text>
        <Text style={styles.statLabel}>Bookings</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{earnings?.nights || 0}</Text>
        <Text style={styles.statLabel}>Nights</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>
          {formatCurrency(earnings?.avgNightly || 0)}
        </Text>
        <Text style={styles.statLabel}>Avg/Night</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.statValue}>{earnings?.occupancy || 0}%</Text>
        <Text style={styles.statLabel}>Occupancy</Text>
      </View>
    </View>
  );

  const renderRecentPayouts = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Payouts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('PayoutHistory')}>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>

      {earnings?.recentPayouts?.map((payout, index) => (
        <View key={index} style={styles.payoutItem}>
          <View style={styles.payoutInfo}>
            <Text style={styles.payoutAmount}>
              {formatCurrency(payout.amount)}
            </Text>
            <Text style={styles.payoutDate}>
              {new Date(payout.date).toLocaleDateString()}
            </Text>
          </View>
          <View
            style={[
              styles.payoutStatus,
              {
                backgroundColor:
                  payout.status === 'completed'
                    ? COLORS.success
                    : COLORS.warning,
              },
            ]}
          >
            <Text style={styles.payoutStatusText}>
              {payout.status === 'completed' ? 'Paid' : 'Pending'}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderEarningsBreakdown = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Earnings Breakdown</Text>

      <View style={styles.breakdownItem}>
        <View style={styles.breakdownInfo}>
          <Text style={styles.breakdownLabel}>Gross earnings</Text>
          <Text style={styles.breakdownAmount}>
            {formatCurrency(earnings?.breakdown?.gross || 0)}
          </Text>
        </View>
      </View>

      <View style={styles.breakdownItem}>
        <View style={styles.breakdownInfo}>
          <Text style={styles.breakdownLabel}>Service fees</Text>
          <Text style={styles.breakdownAmount}>
            -{formatCurrency(earnings?.breakdown?.serviceFee || 0)}
          </Text>
        </View>
        <Text style={styles.breakdownPercentage}>
          ({earnings?.breakdown?.serviceFeePercent || 3}%)
        </Text>
      </View>

      <View style={styles.breakdownItem}>
        <View style={styles.breakdownInfo}>
          <Text style={styles.breakdownLabel}>Taxes withheld</Text>
          <Text style={styles.breakdownAmount}>
            -{formatCurrency(earnings?.breakdown?.taxes || 0)}
          </Text>
        </View>
      </View>

      <View style={[styles.breakdownItem, styles.breakdownTotal]}>
        <View style={styles.breakdownInfo}>
          <Text style={styles.breakdownLabelTotal}>Net earnings</Text>
          <Text style={styles.breakdownAmountTotal}>
            {formatCurrency(earnings?.total || 0)}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPayoutButton = () => (
    <TouchableOpacity
      style={styles.payoutButton}
      onPress={() => navigation.navigate('RequestPayout')}
    >
      <Text style={styles.payoutButtonText}>Request Payout</Text>
    </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Earnings</Text>
        <TouchableOpacity
          style={styles.helpButton}
          onPress={() => navigation.navigate('EarningsHelp')}
        >
          <Text style={styles.helpButtonText}>?</Text>
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        {periods.map((period) => (
          <TouchableOpacity
            key={period.key}
            style={[
              styles.periodButton,
              selectedPeriod === period.key && styles.periodButtonActive,
            ]}
            onPress={() => setSelectedPeriod(period.key)}
          >
            <Text
              style={[
                styles.periodButtonText,
                selectedPeriod === period.key && styles.periodButtonTextActive,
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {renderEarningsCard()}
        {renderStatsGrid()}
        {renderEarningsBreakdown()}
        {renderRecentPayouts()}

        <View style={styles.spacer} />
      </ScrollView>

      {renderPayoutButton()}
    </View>
  );
};

// Mock data for development
const mockEarnings = {
  total: 4250,
  change: 12.5,
  bookings: 8,
  nights: 24,
  avgNightly: 425,
  occupancy: 78,
  breakdown: {
    gross: 4650,
    serviceFee: 140,
    serviceFeePercent: 3,
    taxes: 260,
  },
  recentPayouts: [
    {
      amount: 1850,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      amount: 1200,
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: 'completed',
    },
    {
      amount: 950,
      date: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
      status: 'pending',
    },
  ],
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
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  helpButtonText: {
    fontSize: 18,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.md,
    borderRadius: 12,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: COLORS.primary,
  },
  periodButtonText: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  periodButtonTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
  },
  earningsCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: SPACING.xl,
    alignItems: 'center',
    marginBottom: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    marginBottom: SPACING.sm,
  },
  totalAmount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: SPACING.xs,
  },
  changeLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  statItem: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
  },
  seeAllText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  payoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
  },
  payoutInfo: {},
  payoutAmount: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  payoutDate: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  payoutStatus: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  payoutStatusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  breakdownTotal: {
    borderBottomWidth: 0,
    borderTopWidth: 2,
    borderTopColor: COLORS.primary,
    paddingTop: SPACING.md,
    marginTop: SPACING.sm,
  },
  breakdownInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  breakdownLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  breakdownLabelTotal: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  breakdownAmount: {
    ...TYPOGRAPHY.body,
    fontWeight: '500',
  },
  breakdownAmountTotal: {
    ...TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  breakdownPercentage: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  spacer: {
    height: 100,
  },
  payoutButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  payoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HostEarningsScreen;
