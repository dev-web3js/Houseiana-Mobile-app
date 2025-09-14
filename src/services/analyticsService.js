import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from './api';

class AnalyticsService {
  constructor() {
    this.isEnabled = true;
    this.sessionId = null;
    this.userId = null;
    this.deviceInfo = null;
    this.eventQueue = [];
    this.flushInterval = 30000; // 30 seconds
    this.maxQueueSize = 50;
    this.isInitialized = false;
  }

  /**
   * Initialize analytics service
   */
  async initialize(userId = null) {
    try {
      // Get user preferences for analytics
      const analyticsEnabled = await AsyncStorage.getItem('analytics_enabled');
      this.isEnabled = analyticsEnabled !== 'false';

      if (!this.isEnabled) {
        console.log('📊 Analytics disabled by user preference');
        return;
      }

      this.userId = userId;
      this.sessionId = this.generateSessionId();
      this.deviceInfo = await this.getDeviceInfo();

      // Start session
      await this.trackEvent('session_start', {
        session_id: this.sessionId,
        device_info: this.deviceInfo,
        timestamp: new Date().toISOString(),
      });

      // Start periodic flush
      this.startPeriodicFlush();

      this.isInitialized = true;
      console.log('📊 Analytics service initialized');
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
    }
  }

  /**
   * Generate unique session ID
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get device information
   */
  async getDeviceInfo() {
    const deviceInfo = {
      platform: Platform.OS,
      version: Platform.Version,
      app_version: '1.0.0', // Get from app config
      timestamp: new Date().toISOString(),
    };

    // Add additional device info if available
    try {
      const deviceId = await AsyncStorage.getItem('device_id');
      if (!deviceId) {
        const newDeviceId = `device_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        await AsyncStorage.setItem('device_id', newDeviceId);
        deviceInfo.device_id = newDeviceId;
      } else {
        deviceInfo.device_id = deviceId;
      }
    } catch (error) {
      console.warn('Could not generate device ID:', error);
    }

    return deviceInfo;
  }

  /**
   * Track custom event
   */
  async trackEvent(eventName, properties = {}) {
    if (!this.isEnabled) {
      return;
    }

    const event = {
      event_name: eventName,
      properties: {
        ...properties,
        session_id: this.sessionId,
        user_id: this.userId,
        timestamp: new Date().toISOString(),
        platform: Platform.OS,
      },
    };

    // Add to queue
    this.eventQueue.push(event);
    console.log(`📊 Event tracked: ${eventName}`, properties);

    // Flush if queue is full
    if (this.eventQueue.length >= this.maxQueueSize) {
      await this.flushEvents();
    }
  }

  /**
   * Track screen view
   */
  async trackScreen(screenName, properties = {}) {
    await this.trackEvent('screen_view', {
      screen_name: screenName,
      ...properties,
    });
  }

  /**
   * Track user action
   */
  async trackAction(action, category, label = null, value = null) {
    await this.trackEvent('user_action', {
      action,
      category,
      label,
      value,
    });
  }

  /**
   * Track business events
   */
  async trackBusinessEvent(eventType, data = {}) {
    const businessEvents = {
      // Property events
      property_viewed: (data) =>
        this.trackEvent('property_viewed', {
          property_id: data.propertyId,
          property_type: data.propertyType,
          location: data.location,
          price: data.price,
        }),

      property_searched: (data) =>
        this.trackEvent('property_searched', {
          search_query: data.query,
          filters: data.filters,
          results_count: data.resultsCount,
          location: data.location,
        }),

      property_favorited: (data) =>
        this.trackEvent('property_favorited', {
          property_id: data.propertyId,
          property_type: data.propertyType,
          source: data.source,
        }),

      // Booking events
      booking_started: (data) =>
        this.trackEvent('booking_started', {
          property_id: data.propertyId,
          check_in: data.checkIn,
          check_out: data.checkOut,
          guests: data.guests,
          total_nights: data.totalNights,
        }),

      booking_completed: (data) =>
        this.trackEvent('booking_completed', {
          booking_id: data.bookingId,
          property_id: data.propertyId,
          total_amount: data.totalAmount,
          payment_method: data.paymentMethod,
          booking_source: data.source,
        }),

      booking_cancelled: (data) =>
        this.trackEvent('booking_cancelled', {
          booking_id: data.bookingId,
          property_id: data.propertyId,
          cancellation_reason: data.reason,
          refund_amount: data.refundAmount,
        }),

      // Payment events
      payment_started: (data) =>
        this.trackEvent('payment_started', {
          booking_id: data.bookingId,
          amount: data.amount,
          currency: data.currency,
          payment_method: data.paymentMethod,
        }),

      payment_completed: (data) =>
        this.trackEvent('payment_completed', {
          transaction_id: data.transactionId,
          booking_id: data.bookingId,
          amount: data.amount,
          currency: data.currency,
          payment_method: data.paymentMethod,
        }),

      payment_failed: (data) =>
        this.trackEvent('payment_failed', {
          booking_id: data.bookingId,
          amount: data.amount,
          error_code: data.errorCode,
          error_message: data.errorMessage,
          payment_method: data.paymentMethod,
        }),

      // User events
      user_registered: (data) =>
        this.trackEvent('user_registered', {
          user_id: data.userId,
          registration_method: data.method,
          user_type: data.userType,
        }),

      user_login: (data) =>
        this.trackEvent('user_login', {
          user_id: data.userId,
          login_method: data.method,
          user_type: data.userType,
        }),

      profile_completed: (data) =>
        this.trackEvent('profile_completed', {
          user_id: data.userId,
          completion_percentage: data.completionPercentage,
        }),

      // Host events
      property_listed: (data) =>
        this.trackEvent('property_listed', {
          property_id: data.propertyId,
          property_type: data.propertyType,
          location: data.location,
          price: data.price,
          host_id: data.hostId,
        }),

      earnings_withdrawn: (data) =>
        this.trackEvent('earnings_withdrawn', {
          amount: data.amount,
          currency: data.currency,
          payout_method: data.payoutMethod,
          host_id: data.hostId,
        }),

      // Communication events
      message_sent: (data) =>
        this.trackEvent('message_sent', {
          conversation_id: data.conversationId,
          message_type: data.messageType,
          recipient_type: data.recipientType,
        }),

      // Support events
      support_contacted: (data) =>
        this.trackEvent('support_contacted', {
          contact_method: data.method,
          issue_category: data.category,
          user_type: data.userType,
        }),
    };

    const trackingFunction = businessEvents[eventType];
    if (trackingFunction) {
      await trackingFunction(data);
    } else {
      console.warn(`Unknown business event type: ${eventType}`);
    }
  }

  /**
   * Track error events
   */
  async trackError(error, context = {}) {
    await this.trackEvent('error', {
      error_message: error.message || 'Unknown error',
      error_stack: error.stack || 'No stack trace',
      error_code: error.code || 'UNKNOWN_ERROR',
      context,
    });
  }

  /**
   * Track performance metrics
   */
  async trackPerformance(metric, value, properties = {}) {
    await this.trackEvent('performance', {
      metric_name: metric,
      metric_value: value,
      ...properties,
    });
  }

  /**
   * Track user journey milestone
   */
  async trackMilestone(milestone, properties = {}) {
    await this.trackEvent('milestone', {
      milestone_name: milestone,
      ...properties,
    });
  }

  /**
   * Set user properties
   */
  async setUserProperties(userId, properties = {}) {
    this.userId = userId;

    await this.trackEvent('user_properties_updated', {
      user_id: userId,
      properties,
    });
  }

  /**
   * Track app lifecycle events
   */
  async trackAppLifecycle(event, data = {}) {
    const lifecycleEvents = {
      app_opened: () =>
        this.trackEvent('app_opened', {
          session_id: this.sessionId,
          ...data,
        }),
      app_backgrounded: () =>
        this.trackEvent('app_backgrounded', {
          session_duration: data.sessionDuration,
          ...data,
        }),
      app_crashed: () =>
        this.trackEvent('app_crashed', {
          error_info: data.errorInfo,
          session_id: this.sessionId,
          ...data,
        }),
    };

    const trackingFunction = lifecycleEvents[event];
    if (trackingFunction) {
      await trackingFunction();
    }
  }

  /**
   * Flush events to server
   */
  async flushEvents() {
    if (!this.isEnabled || this.eventQueue.length === 0) {
      return;
    }

    try {
      const eventsToSend = [...this.eventQueue];
      this.eventQueue = [];

      // Send to analytics service
      await apiService.sendAnalyticsEvents(eventsToSend);

      console.log(`📊 Flushed ${eventsToSend.length} analytics events`);
    } catch (error) {
      console.error('Failed to flush analytics events:', error);
      // Re-add events to queue for retry
      this.eventQueue = [...this.eventQueue, ...this.eventQueue];
    }
  }

  /**
   * Start periodic event flushing
   */
  startPeriodicFlush() {
    setInterval(() => {
      this.flushEvents();
    }, this.flushInterval);
  }

  /**
   * Enable/disable analytics
   */
  async setEnabled(enabled) {
    this.isEnabled = enabled;
    await AsyncStorage.setItem('analytics_enabled', enabled.toString());

    if (enabled && !this.isInitialized) {
      await this.initialize(this.userId);
    } else if (!enabled) {
      this.eventQueue = [];
    }
  }

  /**
   * Get analytics status
   */
  getStatus() {
    return {
      isEnabled: this.isEnabled,
      isInitialized: this.isInitialized,
      sessionId: this.sessionId,
      userId: this.userId,
      queueLength: this.eventQueue.length,
    };
  }

  /**
   * Clean up analytics service
   */
  async cleanup() {
    if (!this.isEnabled) {
      return;
    }

    await this.trackEvent('session_end', {
      session_id: this.sessionId,
      timestamp: new Date().toISOString(),
    });

    // Flush remaining events
    await this.flushEvents();

    this.eventQueue = [];
    this.sessionId = null;
    this.isInitialized = false;
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

// Helper hooks for React components
export const useAnalytics = () => {
  return {
    track: analyticsService.trackEvent.bind(analyticsService),
    trackScreen: analyticsService.trackScreen.bind(analyticsService),
    trackAction: analyticsService.trackAction.bind(analyticsService),
    trackBusiness: analyticsService.trackBusinessEvent.bind(analyticsService),
    trackError: analyticsService.trackError.bind(analyticsService),
    trackPerformance: analyticsService.trackPerformance.bind(analyticsService),
    trackMilestone: analyticsService.trackMilestone.bind(analyticsService),
    setUserProperties:
      analyticsService.setUserProperties.bind(analyticsService),
    isEnabled: analyticsService.isEnabled,
  };
};

export default analyticsService;
