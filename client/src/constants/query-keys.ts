export const QueryKeys = {
  onlineUsers: (userId?: string) =>
    userId
      ? (['online-users', 'list', userId] as const)
      : (['online-users', 'list'] as const),
  chatHistory: (senderId?: string, receiverId?: string) =>
    ['chat-history', senderId, receiverId] as const,

  userInfo: (userId: string) => ['user-info', userId] as const,
};
