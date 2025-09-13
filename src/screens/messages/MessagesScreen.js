import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import {COLORS, SPACING, TYPOGRAPHY} from '../../shared/constants';
import {apiService} from '../../services/api';

const MessagesScreen = ({navigation}) => {
  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const response = await apiService.getConversations();
      setConversations(response.data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to load conversations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadConversations();
    setIsRefreshing(false);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
      return diffInMinutes <= 1 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return messageTime.toLocaleDateString();
    }
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredConversations = conversations.filter(conversation =>
    conversation.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.property?.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderConversationItem = ({item}) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => navigation.navigate('ChatDetail', {
        conversationId: item.id,
        otherUser: item.otherUser,
        property: item.property,
      })}
    >
      <View style={styles.avatarContainer}>
        {item.otherUser.profilePicture ? (
          <Image 
            source={{uri: item.otherUser.profilePicture}} 
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {getInitials(item.otherUser.name)}
            </Text>
          </View>
        )}
        {item.otherUser.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.userName} numberOfLines={1}>
            {item.otherUser.name}
          </Text>
          <Text style={styles.timestamp}>
            {formatTimestamp(item.lastMessage.createdAt)}
          </Text>
        </View>

        {item.property && (
          <Text style={styles.propertyTitle} numberOfLines={1}>
            📍 {item.property.title}
          </Text>
        )}

        <View style={styles.messagePreview}>
          <Text 
            style={[
              styles.lastMessage,
              item.unreadCount > 0 && styles.unreadMessage
            ]} 
            numberOfLines={2}
          >
            {item.lastMessage.senderId === 'currentUser' && 'You: '}
            {item.lastMessage.content}
          </Text>
        </View>
      </View>

      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadCount}>
            {item.unreadCount > 99 ? '99+' : item.unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>💬</Text>
      <Text style={styles.emptyStateTitle}>No messages yet</Text>
      <Text style={styles.emptyStateText}>
        Start a conversation with a host or guest to see your messages here.
      </Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.browseButtonText}>Browse Properties</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {/* TODO: Implement search functionality */}}
        >
          <Text style={styles.searchIcon}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={COLORS.textSecondary}
        />
      </View>

      <FlatList
        data={filteredConversations}
        renderItem={renderConversationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContainer,
          filteredConversations.length === 0 && styles.emptyListContainer
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// Mock data for development
const mockConversations = [
  {
    id: '1',
    otherUser: {
      id: 'user1',
      name: 'Ahmed Al-Thani',
      profilePicture: null,
      isOnline: true,
      isHost: true,
    },
    property: {
      id: 'prop1',
      title: 'Luxury Villa in The Pearl',
    },
    lastMessage: {
      id: 'msg1',
      content: 'Thank you for your interest! The villa is available for your dates.',
      senderId: 'user1',
      createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    },
    unreadCount: 2,
  },
  {
    id: '2',
    otherUser: {
      id: 'user2',
      name: 'Sarah Johnson',
      profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      isHost: false,
    },
    property: {
      id: 'prop2',
      title: 'Modern Apartment in West Bay',
    },
    lastMessage: {
      id: 'msg2',
      content: 'Hi! I have a question about the parking situation.',
      senderId: 'user2',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    unreadCount: 0,
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
  headerTitle: {
    ...TYPOGRAPHY.h1,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 20,
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
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
  listContainer: {
    paddingHorizontal: SPACING.lg,
  },
  emptyListContainer: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  userName: {
    ...TYPOGRAPHY.body,
    fontWeight: '600',
    flex: 1,
  },
  timestamp: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  propertyTitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    marginBottom: 4,
  },
  messagePreview: {
    flex: 1,
  },
  lastMessage: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  unreadMessage: {
    color: COLORS.text,
    fontWeight: '500',
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  unreadCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyStateIcon: {
    fontSize: 80,
    marginBottom: SPACING.lg,
  },
  emptyStateTitle: {
    ...TYPOGRAPHY.h2,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptyStateText: {
    ...TYPOGRAPHY.bodySmall,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: SPACING.xl,
  },
  browseButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  browseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MessagesScreen;