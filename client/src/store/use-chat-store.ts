import type { User } from '@nx-chat-assignment/shared-models';
import type { ReceiveMessagePayload, SendMessagePayload } from '../libs/types';

import { create } from 'zustand';

import { useAuthStore } from './use-auth-store';

export interface ChatStoreProps {
  receiver: User | null;
}

export interface ChatStoreState extends ChatStoreProps {
  setReceiver: (user: User | null) => void;
  sendMessage: (message: string, receiver?: User) => void;
  subcribeToMessage: (
    listener: (data: ReceiveMessagePayload) => void,
  ) => VoidFunction;
}

export const useChatStore = create<ChatStoreState>()((set, get) => ({
  receiver: null,

  setReceiver: (user) => {
    set({ receiver: user });
  },

  sendMessage: (message, receiver) => {
    const { socket } = useAuthStore.getState();
    const user = receiver || get().receiver;

    if (!socket || !user) {
      return;
    }

    message = message.trim();

    if (message === '') {
      return;
    }

    socket.emit('message:send', {
      receiver: user,
      message,
    } as SendMessagePayload['data']);
  },

  subcribeToMessage: (listner) => {
    const { socket } = useAuthStore.getState();

    socket?.on('message:receive', listner);

    return () => {
      socket?.off('message:receive', listner);
    };
  },
}));
