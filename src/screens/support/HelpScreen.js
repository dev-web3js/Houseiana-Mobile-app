import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY} from '../../shared/constants';

const HelpScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);

  const helpCategories = [
    {
      id: 'booking',
      title: 'Booking & Reservations',
      icon: '📅',
      articles: [
        {
          id: 1,
          title: 'How to book a property',
          description: 'Step-by-step guide to making your first booking',
        },
        {
          id: 2,
          title: 'Cancellation policy',
          description: 'Understanding cancellation terms and refunds',
        },
        {
          id: 3,
          title: 'Payment methods',
          description: 'Accepted payment options in Qatar',
        },
        {
          id: 4,
          title: 'Booking modifications',
          description: 'How to change your reservation dates',
        },
      ],
    },
    {
      id: 'hosting',
      title: 'Hosting',
      icon: '🏠',
      articles: [
        {
          id: 5,
          title: 'Become a host',
          description: 'Getting started with hosting your property',
        },
        {
          id: 6,
          title: 'Listing your property',
          description: 'Creating an attractive property listing',
        },
        {
          id: 7,
          title: 'Managing bookings',
          description: 'Handle guest reservations and communication',
        },
        {
          id: 8,
          title: 'Host earnings',
          description: 'Understanding payouts and taxes',
        },
      ],
    },
    {
      id: 'account',
      title: 'Account & Profile',
      icon: '👤',
      articles: [
        {
          id: 9,
          title: 'Account verification',
          description: 'Complete your profile verification',
        },
        {
          id: 10,
          title: 'Privacy settings',
          description: 'Control your personal information',
        },
        {
          id: 11,
          title: 'Notification preferences',
          description: 'Manage email and push notifications',
        },
      ],
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      icon: '🛡️',
      articles: [
        {
          id: 12,
          title: 'Safety guidelines',
          description: 'Staying safe during your stay',
        },
        {
          id: 13,
          title: 'Report a problem',
          description: 'How to report safety or security issues',
        },
        {
          id: 14,
          title: 'Insurance coverage',
          description: 'Understanding protection policies',
        },
      ],
    },
    {
      id: 'qatar',
      title: 'Qatar Travel Info',
      icon: '🇶🇦',
      articles: [
        {
          id: 15,
          title: 'Qatar travel requirements',
          description: 'Visa and entry requirements for Qatar',
        },
        {
          id: 16,
          title: 'Local customs',
          description: 'Cultural etiquette and local laws',
        },
        {
          id: 17,
          title: 'Transportation in Qatar',
          description: 'Getting around Doha and Qatar',
        },
      ],
    },
  ];

  const quickActions = [
    {
      id: 'contact',
      title: 'Contact Support',
      description: 'Get help from our team',
      icon: '💬',
      action: () => navigation.navigate('ContactSupport'),
    },
    {
      id: 'call',
      title: 'Call Us',
      description: '+974 4000 1234',
      icon: '📞',
      action: () => Linking.openURL('tel:+97440001234'),
    },
    {
      id: 'email',
      title: 'Email Support',
      description: 'support@houseiana.qa',
      icon: '✉️',
      action: () => Linking.openURL('mailto:support@houseiana.qa'),
    },
    {
      id: 'emergency',
      title: 'Emergency',
      description: '24/7 emergency hotline',
      icon: '🚨',
      action: () => Alert.alert(
        'Emergency Hotline',
        'For urgent safety issues, call:\n+974 999 (Police)\n+974 998 (Fire/Medical)',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Call Police', onPress: () => Linking.openURL('tel:999')},
        ]
      ),
    },
  ];

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleCategoryPress = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleArticlePress = (article) => {
    navigation.navigate('HelpArticle', {
      articleId: article.id,
      title: article.title,
    });
  };

  const renderQuickAction = (action) => (
    <TouchableOpacity
      key={action.id}
      style={styles.quickActionItem}
      onPress={action.action}
    >
      <View style={styles.quickActionIcon}>
        <Text style={styles.quickActionIconText}>{action.icon}</Text>
      </View>
      <View style={styles.quickActionContent}>
        <Text style={styles.quickActionTitle}>{action.title}</Text>
        <Text style={styles.quickActionDescription}>{action.description}</Text>
      </View>
      <Text style={styles.quickActionArrow}>→</Text>
    </TouchableOpacity>
  );

  const renderCategory = (category) => {
    const isExpanded = expandedCategory === category.id;
    const filteredArticles = category.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (searchQuery && filteredArticles.length === 0) {
      return null;
    }

    return (
      <View key={category.id} style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryHeader}
          onPress={() => handleCategoryPress(category.id)}
        >
          <View style={styles.categoryTitleContainer}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </View>
          <Text style={[
            styles.expandIcon,
            isExpanded && styles.expandIconRotated
          ]}>
            ↓
          </Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.articlesContainer}>
            {(searchQuery ? filteredArticles : category.articles).map((article) => (
              <TouchableOpacity
                key={article.id}
                style={styles.articleItem}
                onPress={() => handleArticlePress(article)}
              >
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text style={styles.articleDescription}>{article.description}</Text>
                </View>
                <Text style={styles.articleArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={COLORS.textSecondary}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map(renderQuickAction)}
          </View>
        </View>

        {/* Help Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Topic</Text>
          {filteredCategories.map(renderCategory)}
        </View>

        {/* Popular Articles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Articles</Text>
          <View style={styles.popularArticles}>
            <TouchableOpacity 
              style={styles.popularArticleItem}
              onPress={() => handleArticlePress({id: 1, title: 'How to book a property'})}
            >
              <Text style={styles.popularArticleTitle}>How to book a property</Text>
              <Text style={styles.popularArticleViews}>2.1k views</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.popularArticleItem}
              onPress={() => handleArticlePress({id: 2, title: 'Cancellation policy'})}
            >
              <Text style={styles.popularArticleTitle}>Cancellation policy</Text>
              <Text style={styles.popularArticleViews}>1.8k views</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.popularArticleItem}
              onPress={() => handleArticlePress({id: 5, title: 'Become a host'})}
            >
              <Text style={styles.popularArticleTitle}>Become a host</Text>
              <Text style={styles.popularArticleViews}>1.5k views</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Community */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community</Text>
          <TouchableOpacity 
            style={styles.communityItem}
            onPress={() => Linking.openURL('https://community.houseiana.qa')}
          >
            <View style={styles.communityIcon}>
              <Text style={styles.communityIconText}>💬</Text>
            </View>
            <View style={styles.communityContent}>
              <Text style={styles.communityTitle}>Community Forum</Text>
              <Text style={styles.communityDescription}>
                Connect with other hosts and guests
              </Text>
            </View>
            <Text style={styles.communityArrow}>→</Text>
          </TouchableOpacity>
        </View>

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
  searchContainer: {
    paddingVertical: SPACING.md,
  },
  searchInput: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: 16,
    color: COLORS.text,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    marginBottom: SPACING.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: '48%',
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  quickActionIconText: {
    fontSize: 20,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    ...TYPOGRAPHY.bodySmall,
    fontWeight: '600',
    marginBottom: 2,
  },
  quickActionDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  quickActionArrow: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  categoryContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  categoryTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
  },
  expandIcon: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    transform: [{rotate: '0deg'}],
  },
  expandIconRotated: {
    transform: [{rotate: '180deg'}],
  },
  articlesContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  articleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    ...TYPOGRAPHY.body,
    marginBottom: 2,
  },
  articleDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  articleArrow: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  popularArticles: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  popularArticleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  popularArticleTitle: {
    ...TYPOGRAPHY.body,
    flex: 1,
  },
  popularArticleViews: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  communityItem: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  communityIconText: {
    fontSize: 24,
  },
  communityContent: {
    flex: 1,
  },
  communityTitle: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  communityDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  communityArrow: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  spacer: {
    height: 50,
  },
});

export default HelpScreen;