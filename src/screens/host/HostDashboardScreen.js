import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../auth/AuthContext';
import { COLORS, SPACING, FONT_SIZES } from '../../shared/constants';

const { width } = Dimensions.get('window');

const HostDashboardScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeBookings: 0,
    totalEarnings: 0,
    averageRating: 0,
    occupancyRate: 0,
    monthlyRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigation.replace('LoginScreen');
      return;
    }

    // Check if user is a host
    if (user.role !== 'host' && user.role !== 'both' && !user.isHost) {
      Alert.alert(
        'Access Denied',
        'You need to be registered as a host to access this dashboard.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
      return;
    }

    fetchHostStats();
  }, [user, navigation]);

  const fetchHostStats = async () => {
    try {
      // For demo purposes, using sample data
      // In real app, this would fetch from API
      setStats({
        totalProperties: 3,
        activeBookings: 5,
        totalEarnings: 125000,
        averageRating: 4.8,
        occupancyRate: 78,
        monthlyRevenue: 25500,
      });
    } catch (error) {
      console.log('Failed to fetch host stats:', error);
      Alert.alert('Error', 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Manage Properties',
      subtitle: 'View and edit your listings',
      icon: '🏘️',
      onPress: () => navigation.navigate('MyProperties'),
      color: '#eff6ff',
    },
    {
      title: 'View Reservations',
      subtitle: 'Manage guest bookings',
      icon: '📋',
      onPress: () => navigation.navigate('Bookings'),
      color: '#f0fdf4',
    },
    {
      title: 'Track Earnings',
      subtitle: 'View revenue reports',
      icon: '💳',
      onPress: () => navigation.navigate('Earnings'),
      color: '#fef3c7',
    },
    {
      title: 'Messages',
      subtitle: 'Chat with guests',
      icon: '💬',
      onPress: () => navigation.navigate('Messages'),
      color: '#fce7f3',
    },
  ];

  const statCards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: '🏠',
      color: '#eff6ff',
      textColor: '#1e293b',
    },
    {
      title: 'Active Bookings',
      value: stats.activeBookings,
      icon: '📅',
      color: '#f0fdf4',
      textColor: '#10b981',
    },
    {
      title: 'Monthly Revenue',
      value: `QAR ${stats.monthlyRevenue.toLocaleString()}`,
      icon: '💰',
      color: '#fef3c7',
      textColor: '#f59e0b',
    },
    {
      title: 'Average Rating',
      value: stats.averageRating,
      icon: '⭐',
      color: '#fce7f3',
      textColor: '#ec4899',
    },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Host Dashboard</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProperty')}
        >
          <Icon name="add" size={20} color="white" />
          <Text style={styles.addButtonText}>Add Property</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>
            Welcome back, {user?.firstName || user?.name || 'Host'}!
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Here's an overview of your hosting performance
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {statCards.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statHeader}>
                <View
                  style={[styles.statIcon, { backgroundColor: stat.color }]}
                >
                  <Text style={styles.statEmoji}>{stat.icon}</Text>
                </View>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
              <Text style={[styles.statValue, { color: stat.textColor }]}>
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={action.onPress}
                activeOpacity={0.7}
              >
                <View style={styles.actionHeader}>
                  <View
                    style={[
                      styles.actionIcon,
                      { backgroundColor: action.color },
                    ]}
                  >
                    <Text style={styles.actionEmoji}>{action.icon}</Text>
                  </View>
                  <View style={styles.actionTextContainer}>
                    <Text style={styles.actionTitle}>{action.title}</Text>
                    <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={20} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Performance Insights */}
        <View style={styles.insightsSection}>
          <Text style={styles.sectionTitle}>Performance Insights</Text>

          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Icon name="trending-up" size={24} color="#10b981" />
              <Text style={styles.insightTitle}>Occupancy Rate</Text>
            </View>
            <Text style={styles.insightValue}>{stats.occupancyRate}%</Text>
            <Text style={styles.insightSubtext}>
              Your properties are performing well this month
            </Text>
          </View>

          <View style={styles.insightCard}>
            <View style={styles.insightHeader}>
              <Icon name="attach-money" size={24} color="#f59e0b" />
              <Text style={styles.insightTitle}>Total Earnings</Text>
            </View>
            <Text style={styles.insightValue}>
              QAR {stats.totalEarnings.toLocaleString()}
            </Text>
            <Text style={styles.insightSubtext}>
              Total revenue generated from all properties
            </Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            <Icon name="event" size={20} color="#2563eb" />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New booking received</Text>
              <Text style={styles.activityTime}>2 hours ago</Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <Icon name="star" size={20} color="#f59e0b" />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>New 5-star review</Text>
              <Text style={styles.activityTime}>1 day ago</Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <Icon name="message" size={20} color="#10b981" />
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Message from guest</Text>
              <Text style={styles.activityTime}>2 days ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  loadingText: {
    fontSize: FONT_SIZES.lg,
    color: '#717171',
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
  addButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    gap: SPACING.xs,
  },
  addButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  welcomeSection: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.lg,
    marginVertical: SPACING.lg,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  welcomeTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  welcomeSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: '#6b7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    width: (width - SPACING.lg * 2 - SPACING.md) / 2,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.md,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statEmoji: {
    fontSize: 20,
  },
  statTitle: {
    fontSize: FONT_SIZES.xs,
    color: '#6b7280',
    fontWeight: '500',
    flex: 1,
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
  },
  quickActionsSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  quickActionsGrid: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  actionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: SPACING.md,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionEmoji: {
    fontSize: 20,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: FONT_SIZES.xs,
    color: '#6b7280',
  },
  insightsSection: {
    marginBottom: SPACING.xl,
  },
  insightCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    gap: SPACING.sm,
  },
  insightTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  insightValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  insightSubtext: {
    fontSize: FONT_SIZES.sm,
    color: '#6b7280',
  },
  recentSection: {
    marginBottom: SPACING.xl,
  },
  activityCard: {
    backgroundColor: COLORS.background,
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    gap: SPACING.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: FONT_SIZES.xs,
    color: '#6b7280',
  },
});

export default HostDashboardScreen;
