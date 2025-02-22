import { ChatRepository } from '../repositories/chat.repository';

export const UsersService = {
  getOnlineUsers: () => {
    return ChatRepository.getUsers().filter((user) => user.online);
  },
};
