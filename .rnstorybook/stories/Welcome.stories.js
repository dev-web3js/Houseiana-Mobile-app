import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const WelcomeScreen = () => {
  const componentCategories = [
    {
      title: 'Core Components',
      description: 'Essential UI building blocks',
      components: ['Button', 'LoadingSpinner', 'PropertyCard'],
      icon: 'widgets',
      color: '#2196F3',
    },
    {
      title: 'Map Components',
      description: 'Interactive mapping features',
      components: ['PropertyMapView', 'MapScreen'],
      icon: 'map',
      color: '#4CAF50',
    },
    {
      title: 'Booking Screens',
      description: 'Complete booking workflow',
      components: ['BookingScreen', 'BookingConfirmation', 'MyBookings'],
      icon: 'event',
      color: '#FF9800',
    },
  ];

  const features = [
    'Interactive component playground',
    'Real-time prop editing',
    'Qatar market customization',
    'Mobile-optimized design',
    'Comprehensive documentation',
    'Accessibility features',
  ];

  const ComponentCategoryCard = ({category}) => (
    <TouchableOpacity style={[styles.categoryCard, {borderLeftColor: category.color}]}>
      <View style={styles.categoryHeader}>
        <Icon name={category.icon} size={24} color={category.color} />
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>
      <Text style={styles.categoryDescription}>{category.description}</Text>
      <View style={styles.componentList}>
        {category.components.map((component, index) => (
          <Text key={index} style={styles.componentName}>
            • {component}
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🏠</Text>
          <View>
            <Text style={styles.title}>Houseiana Mobile</Text>
            <Text style={styles.subtitle}>Component Library</Text>
          </View>
        </View>
        <Text style={styles.version}>v1.0.0</Text>
      </View>

      {/* Introduction */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Welcome to Storybook</Text>
        <Text style={styles.description}>
          Explore and interact with all UI components used in the Houseiana Mobile App.
          This living documentation helps developers understand, test, and implement
          components consistently across the application.
        </Text>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Icon name="check-circle" size={16} color="#4CAF50" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Component Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Component Categories</Text>
        {componentCategories.map((category, index) => (
          <ComponentCategoryCard key={index} category={category} />
        ))}
      </View>

      {/* Qatar Market Focus */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Qatar Market Customization</Text>
        <View style={styles.qatarSection}>
          <Text style={styles.qatarText}>🇶🇦</Text>
          <View style={styles.qatarContent}>
            <Text style={styles.description}>
              Components are specifically designed for the Qatar market with:
            </Text>
            <View style={styles.qatarFeatures}>
              <Text style={styles.qatarFeature}>• QAR currency formatting</Text>
              <Text style={styles.qatarFeature}>• Local area integration (The Pearl, West Bay, Lusail)</Text>
              <Text style={styles.qatarFeature}>• Arabic language support preparation</Text>
              <Text style={styles.qatarFeature}>• Cultural design considerations</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Getting Started */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Getting Started</Text>
        <View style={styles.stepContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Browse component categories in the sidebar
            </Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              Select a component to view its stories
            </Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Use controls to modify props in real-time
            </Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepText}>
              Copy code examples for your implementation
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Built with ❤️ for the Houseiana Mobile App
        </Text>
        <Text style={styles.footerSubtext}>
          Interactive component documentation powered by Storybook
        </Text>
      </View>
    </ScrollView>
  );
};

const meta = {
  title: 'Welcome',
  component: WelcomeScreen,
};

export default meta;

export const Welcome = {
  render: () => <WelcomeScreen />,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
  version: {
    fontSize: 12,
    color: '#999999',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666666',
  },
  featureGrid: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
  },
  categoryCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  componentList: {
    marginLeft: 8,
  },
  componentName: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 2,
  },
  qatarSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  qatarText: {
    fontSize: 32,
    marginRight: 12,
  },
  qatarContent: {
    flex: 1,
  },
  qatarFeatures: {
    marginTop: 8,
    marginLeft: 8,
  },
  qatarFeature: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  stepContainer: {
    marginTop: 8,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 4,
  },
});