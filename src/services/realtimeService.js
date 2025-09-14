import io from 'socket.io-client';
import { apiService } from './api';

class RealtimeService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
  }

  /**
   * Initialize WebSocket connection
   */
  async connect(userId) {
    try {
      // Get authentication token
      const token = await apiService.getAuthToken();

      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Configure socket connection
      this.socket = io(process.env.WEBSOCKET_URL || 'ws://localhost:5000', {
        auth: {
          token: token,
          userId: userId,
        },
        transports: ['websocket', 'polling'],
        timeout: 10000,
        reconnection: true,
        reconnectionAttempts: this.maxReconnectAttempts,
        reconnectionDelay: this.reconnectDelay,
      });

      // Set up event listeners
      this.setupEventListeners();

      return new Promise((resolve, reject) => {
        this.socket.on('connect', () => {
          console.log('✅ WebSocket connected');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          resolve();
        });

        this.socket.on('connect_error', (error) => {
          console.error('❌ WebSocket connection error:', error);
          reject(error);
        });
      });
    } catch (error) {
      console.error('Failed to initialize WebSocket:', error);
      throw error;
    }
  }

  /**
   * Set up core WebSocket event listeners
   */
  setupEventListeners() {
    if (!this.socket) {
      return;
    }

    // Connection events
    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.isConnected = true;
      this.emit('connection', { status: 'connected' });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.isConnected = false;
      this.emit('connection', { status: 'disconnected', reason });
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('WebSocket reconnected after', attemptNumber, 'attempts');
      this.isConnected = true;
      this.emit('connection', {
        status: 'reconnected',
        attempts: attemptNumber,
      });
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('WebSocket reconnection error:', error);
      this.emit('connection', { status: 'reconnect_error', error });
    });

    // Message events
    this.socket.on('new_message', (data) => {
      console.log('📨 New message received:', data);
      this.emit('message:new', data);
    });

    this.socket.on('message_read', (data) => {
      console.log('✅ Message marked as read:', data);
      this.emit('message:read', data);
    });

    this.socket.on('typing', (data) => {
      this.emit('message:typing', data);
    });

    this.socket.on('stop_typing', (data) => {
      this.emit('message:stop_typing', data);
    });

    // Booking events
    this.socket.on('booking_request', (data) => {
      console.log('🏠 New booking request:', data);
      this.emit('booking:request', data);
    });

    this.socket.on('booking_confirmed', (data) => {
      console.log('✅ Booking confirmed:', data);
      this.emit('booking:confirmed', data);
    });

    this.socket.on('booking_cancelled', (data) => {
      console.log('❌ Booking cancelled:', data);
      this.emit('booking:cancelled', data);
    });

    this.socket.on('booking_modified', (data) => {
      console.log('🔄 Booking modified:', data);
      this.emit('booking:modified', data);
    });

    // Property events
    this.socket.on('property_updated', (data) => {
      console.log('🏠 Property updated:', data);
      this.emit('property:updated', data);
    });

    this.socket.on('availability_changed', (data) => {
      console.log('📅 Availability changed:', data);
      this.emit('property:availability', data);
    });

    // User events
    this.socket.on('user_online', (data) => {
      this.emit('user:online', data);
    });

    this.socket.on('user_offline', (data) => {
      this.emit('user:offline', data);
    });

    // Notification events
    this.socket.on('notification', (data) => {
      console.log('🔔 Real-time notification:', data);
      this.emit('notification', data);
    });

    // Error events
    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    });
  }

  /**
   * Disconnect WebSocket
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.listeners.clear();
      console.log('WebSocket disconnected');
    }
  }

  /**
   * Join a room (e.g., conversation, property updates)
   */
  joinRoom(roomId, roomType = 'conversation') {
    if (!this.isConnected) {
      console.warn('Cannot join room: WebSocket not connected');
      return;
    }

    this.socket.emit('join_room', {
      roomId,
      roomType,
    });

    console.log(`Joined ${roomType} room: ${roomId}`);
  }

  /**
   * Leave a room
   */
  leaveRoom(roomId, roomType = 'conversation') {
    if (!this.isConnected) {
      return;
    }

    this.socket.emit('leave_room', {
      roomId,
      roomType,
    });

    console.log(`Left ${roomType} room: ${roomId}`);
  }

  /**
   * Send a message
   */
  sendMessage(conversationId, message) {
    if (!this.isConnected) {
      throw new Error('WebSocket not connected');
    }

    this.socket.emit('send_message', {
      conversationId,
      message: {
        content: message.content,
        type: message.type || 'text',
        metadata: message.metadata || {},
      },
    });
  }

  /**
   * Mark message as read
   */
  markMessageAsRead(messageId, conversationId) {
    if (!this.isConnected) {
      return;
    }

    this.socket.emit('mark_read', {
      messageId,
      conversationId,
    });
  }

  /**
   * Send typing indicator
   */
  startTyping(conversationId) {
    if (!this.isConnected) {
      return;
    }

    this.socket.emit('typing', { conversationId });
  }

  /**
   * Stop typing indicator
   */
  stopTyping(conversationId) {
    if (!this.isConnected) {
      return;
    }

    this.socket.emit('stop_typing', { conversationId });
  }

  /**
   * Update user online status
   */
  updateOnlineStatus(isOnline = true) {
    if (!this.isConnected) {
      return;
    }

    this.socket.emit('update_status', {
      isOnline,
      lastSeen: new Date().toISOString(),
    });
  }

  /**
   * Subscribe to property updates
   */
  subscribeToProperty(propertyId) {
    this.joinRoom(propertyId, 'property');
  }

  /**
   * Unsubscribe from property updates
   */
  unsubscribeFromProperty(propertyId) {
    this.leaveRoom(propertyId, 'property');
  }

  /**
   * Subscribe to booking updates
   */
  subscribeToBooking(bookingId) {
    this.joinRoom(bookingId, 'booking');
  }

  /**
   * Unsubscribe from booking updates
   */
  unsubscribeFromBooking(bookingId) {
    this.leaveRoom(bookingId, 'booking');
  }

  /**
   * Send booking action (confirm, cancel, modify)
   */
  sendBookingAction(bookingId, action, data = {}) {
    if (!this.isConnected) {
      throw new Error('WebSocket not connected');
    }

    this.socket.emit('booking_action', {
      bookingId,
      action, // 'confirm', 'cancel', 'modify', 'request'
      data,
    });
  }

  /**
   * Update property availability in real-time
   */
  updatePropertyAvailability(propertyId, availability) {
    if (!this.isConnected) {
      return;
    }

    this.socket.emit('update_availability', {
      propertyId,
      availability,
    });
  }

  /**
   * Request live property data
   */
  requestPropertyData(propertyId) {
    if (!this.isConnected) {
      return;
    }

    this.socket.emit('request_property_data', { propertyId });
  }

  /**
   * Generic event listener
   */
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
  }

  /**
   * Remove event listener
   */
  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  /**
   * Emit event to all listeners
   */
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in event listener:', error);
        }
      });
    }
  }

  /**
   * Get connection status
   */
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      socketId: this.socket?.id,
      transport: this.socket?.io?.engine?.transport?.name,
    };
  }

  /**
   * Manually reconnect
   */
  reconnect() {
    if (this.socket) {
      this.socket.connect();
    }
  }

  /**
   * Send custom event
   */
  sendCustomEvent(eventName, data) {
    if (!this.isConnected) {
      throw new Error('WebSocket not connected');
    }

    this.socket.emit(eventName, data);
  }

  /**
   * Listen for custom events
   */
  onCustomEvent(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, callback);
    }
  }

  /**
   * Remove custom event listener
   */
  offCustomEvent(eventName, callback) {
    if (this.socket) {
      this.socket.off(eventName, callback);
    }
  }
}

// Export singleton instance
export const realtimeService = new RealtimeService();

// Hook for React components
export const useRealtime = () => {
  const [isConnected, setIsConnected] = React.useState(
    realtimeService.isConnected
  );

  React.useEffect(() => {
    const handleConnection = (status) => {
      setIsConnected(
        status.status === 'connected' || status.status === 'reconnected'
      );
    };

    realtimeService.on('connection', handleConnection);

    return () => {
      realtimeService.off('connection', handleConnection);
    };
  }, []);

  return {
    isConnected,
    connect: realtimeService.connect.bind(realtimeService),
    disconnect: realtimeService.disconnect.bind(realtimeService),
    joinRoom: realtimeService.joinRoom.bind(realtimeService),
    leaveRoom: realtimeService.leaveRoom.bind(realtimeService),
    sendMessage: realtimeService.sendMessage.bind(realtimeService),
    markMessageAsRead: realtimeService.markMessageAsRead.bind(realtimeService),
    startTyping: realtimeService.startTyping.bind(realtimeService),
    stopTyping: realtimeService.stopTyping.bind(realtimeService),
    subscribeToProperty:
      realtimeService.subscribeToProperty.bind(realtimeService),
    unsubscribeFromProperty:
      realtimeService.unsubscribeFromProperty.bind(realtimeService),
    subscribeToBooking:
      realtimeService.subscribeToBooking.bind(realtimeService),
    unsubscribeFromBooking:
      realtimeService.unsubscribeFromBooking.bind(realtimeService),
    sendBookingAction: realtimeService.sendBookingAction.bind(realtimeService),
    on: realtimeService.on.bind(realtimeService),
    off: realtimeService.off.bind(realtimeService),
    getConnectionStatus:
      realtimeService.getConnectionStatus.bind(realtimeService),
  };
};

export default realtimeService;
