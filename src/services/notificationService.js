import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Platform, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mobileApiService from './api';

class NotificationService {
  constructor() {
    this.configure();
    this.lastId = 0;
  }

  configure() {
    // Configure push notifications
    PushNotification.configure({
      // Called when token is generated (iOS and Android)
      onRegister: (token) => {
        console.log('TOKEN:', token);
        this.saveDeviceToken(token);
      },

      // Called when a remote is received or opened, or local notification is opened
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification);

        if (notification.userInteraction) {
          // User tapped on notification
          this.handleNotificationTap(notification);
        }

        // (required) Called when a remote is received or opened, or local notification is opened
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },

      // Called when the user fails to register for remote notifications
      onRegistrationError: (err) => {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: Platform.OS === 'ios',
    });

    // Create default notification channels (Android)
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'booking-updates',
          channelName: 'Booking Updates',
          channelDescription: 'Notifications about your bookings',
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        (created) => console.log(`Booking channel created: ${created}`)
      );

      PushNotification.createChannel(
        {
          channelId: 'messages',
          channelName: 'Messages',
          channelDescription: 'New messages from hosts and guests',
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        (created) => console.log(`Messages channel created: ${created}`)
      );

      PushNotification.createChannel(
        {
          channelId: 'property-updates',
          channelName: 'Property Updates',
          channelDescription: 'Updates about your properties',
          soundName: 'default',
          importance: 3,
          vibrate: true,
        },
        (created) => console.log(`Property channel created: ${created}`)
      );
    }
  }

  async saveDeviceToken(token) {
    try {
      await AsyncStorage.setItem('device_token', JSON.stringify(token));
      
      // Register token with backend
      try {
        await mobileApiService.registerPushToken(token.token, Platform.OS);
        console.log('Device token registered with backend');
      } catch (error) {
        console.log('Failed to register token with backend:', error);
      }
    } catch (error) {
      console.log('Failed to save device token:', error);
    }
  }

  handleNotificationTap(notification) {
    console.log('Notification tapped:', notification);
    
    // Handle different notification types
    if (notification.data) {
      const {type, id} = notification.data;
      
      switch (type) {
        case 'booking_confirmed':
        case 'booking_cancelled':
        case 'booking_updated':
          this.navigateToBooking(id);
          break;
        case 'new_message':
          this.navigateToMessages(id);
          break;
        case 'property_approved':
        case 'property_rejected':
          this.navigateToProperty(id);
          break;
        default:
          // Default action - maybe go to home screen
          break;
      }
    }
  }

  navigateToBooking(bookingId) {
    // This would typically use a navigation service
    // For now, just store the intent
    AsyncStorage.setItem('pending_navigation', JSON.stringify({
      screen: 'BookingDetail',
      params: {bookingId}
    }));
  }

  navigateToMessages(conversationId) {
    AsyncStorage.setItem('pending_navigation', JSON.stringify({
      screen: 'Messages',
      params: {conversationId}
    }));
  }

  navigateToProperty(propertyId) {
    AsyncStorage.setItem('pending_navigation', JSON.stringify({
      screen: 'PropertyDetail',
      params: {propertyId}
    }));
  }

  // Local notifications
  showLocalNotification(title, message, data = {}) {
    const id = ++this.lastId;
    
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: data.channelId || 'default',
      ticker: title,
      showWhen: true,
      autoCancel: true,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      bigText: message,
      color: '#2196F3',
      vibrate: true,
      vibration: 300,
      tag: data.tag,
      group: data.group,
      ongoing: false,

      /* iOS only properties */
      alertAction: 'view',
      category: '',
      userInfo: data,

      /* iOS and Android properties */
      id,
      title,
      message,
      playSound: true,
      soundName: 'default',
      number: 1,
      actions: data.actions,
    });

    return id;
  }

  // Scheduled notifications
  scheduleNotification(title, message, date, data = {}) {
    const id = ++this.lastId;
    
    PushNotification.localNotificationSchedule({
      /* Android Only Properties */
      channelId: data.channelId || 'default',
      ticker: title,
      autoCancel: true,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_notification',
      bigText: message,
      color: '#2196F3',
      vibrate: true,
      vibration: 300,

      /* iOS only properties */
      alertAction: 'view',
      category: '',
      userInfo: data,

      /* iOS and Android properties */
      id,
      title,
      message,
      date,
      playSound: true,
      soundName: 'default',
      number: 1,
    });

    return id;
  }

  // Booking-specific notifications
  scheduleCheckInReminder(booking) {
    const checkInDate = new Date(booking.checkIn);
    const reminderDate = new Date(checkInDate.getTime() - 24 * 60 * 60 * 1000); // 1 day before
    
    return this.scheduleNotification(
      'Check-in Tomorrow',
      `Your stay at ${booking.property.title} begins tomorrow at 3:00 PM`,
      reminderDate,
      {
        channelId: 'booking-updates',
        type: 'check_in_reminder',
        bookingId: booking.id,
      }
    );
  }

  scheduleCheckOutReminder(booking) {
    const checkOutDate = new Date(booking.checkOut);
    const reminderDate = new Date(checkOutDate.getTime() - 2 * 60 * 60 * 1000); // 2 hours before
    
    return this.scheduleNotification(
      'Check-out Reminder',
      `Don't forget to check out of ${booking.property.title} by 11:00 AM`,
      reminderDate,
      {
        channelId: 'booking-updates',
        type: 'check_out_reminder',
        bookingId: booking.id,
      }
    );
  }

  // Host-specific notifications
  showBookingRequestNotification(booking) {
    return this.showLocalNotification(
      'New Booking Request',
      `${booking.guest.name} wants to book ${booking.property.title}`,
      {
        channelId: 'booking-updates',
        type: 'booking_request',
        bookingId: booking.id,
        actions: [
          {
            id: 'approve',
            title: 'Approve',
          },
          {
            id: 'reject',
            title: 'Reject',
          },
        ],
      }
    );
  }

  showMessageNotification(message) {
    return this.showLocalNotification(
      `Message from ${message.sender.name}`,
      message.content,
      {
        channelId: 'messages',
        type: 'new_message',
        conversationId: message.conversationId,
        actions: [
          {
            id: 'reply',
            title: 'Reply',
            textInput: true,
            textInputPlaceholder: 'Type a message...',
          },
        ],
      }
    );
  }

  // Utility methods
  cancelNotification(id) {
    PushNotification.cancelLocalNotifications({id: id.toString()});
  }

  cancelAllNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }

  clearBadge() {
    PushNotification.setApplicationIconBadgeNumber(0);
  }

  setBadgeCount(count) {
    PushNotification.setApplicationIconBadgeNumber(count);
  }

  async checkPermissions() {
    return new Promise((resolve) => {
      PushNotification.checkPermissions((permissions) => {
        resolve(permissions);
      });
    });
  }

  async requestPermissions() {
    return new Promise((resolve) => {
      PushNotification.requestPermissions((permissions) => {
        resolve(permissions);
      });
    });
  }

  async getDeliveredNotifications() {
    return new Promise((resolve) => {
      PushNotification.getDeliveredNotifications((notifications) => {
        resolve(notifications);
      });
    });
  }

  removeDeliveredNotifications(identifiers = []) {
    PushNotification.removeDeliveredNotifications(identifiers);
  }

  // Check if notifications are enabled
  async areNotificationsEnabled() {
    const permissions = await this.checkPermissions();
    return permissions.alert && permissions.badge && permissions.sound;
  }

  // Prompt user to enable notifications
  async promptForPermissions() {
    const enabled = await this.areNotificationsEnabled();
    
    if (!enabled) {
      Alert.alert(
        'Enable Notifications',
        'Stay updated with booking confirmations, messages, and important updates',
        [
          {text: 'Not Now', style: 'cancel'},
          {
            text: 'Enable',
            onPress: async () => {
              const permissions = await this.requestPermissions();
              if (!permissions.alert) {
                Alert.alert(
                  'Notifications Disabled',
                  'To receive important updates, please enable notifications in Settings',
                  [{text: 'OK'}]
                );
              }
            },
          },
        ]
      );
    }
    
    return enabled;
  }

  // Get pending navigation (for handling notification taps when app is closed)
  async getPendingNavigation() {
    try {
      const navigation = await AsyncStorage.getItem('pending_navigation');
      if (navigation) {
        await AsyncStorage.removeItem('pending_navigation');
        return JSON.parse(navigation);
      }
    } catch (error) {
      console.log('Error getting pending navigation:', error);
    }
    return null;
  }
}

// Create singleton instance
const notificationService = new NotificationService();

export default notificationService;