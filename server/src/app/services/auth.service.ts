import { User } from '@nx-chat-assignment/shared-models';
import { v4 as uuidv4 } from 'uuid';

import { ChatRepository } from '../repositories/chat.repository';

export const AuthService = {
  login: (username: string): User | null => {
    const existingUser = ChatRepository.getUsers().find(
      (u) => u.username === username,
    );

    if (existingUser && existingUser.online) {
      return null;
    }

    if (existingUser) {
      return existingUser;
    }

    const newUser: User = { id: uuidv4(), username, online: false };
    ChatRepository.addUser(newUser);
    return newUser;
  },

  logout: (userId: string) => {
    const user = ChatRepository.getUsers().find((u) => u.id === userId);

    if (!user) {
      return { error: 'User not found' };
    }

    user.online = false;
    return { message: 'User logged out' };
  },
};
