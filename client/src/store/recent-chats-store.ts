import { ChatMessage } from '@nx-chat-assignment/shared-models';
import localforage from 'localforage';
import { createStore } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { RecentChat } from '../libs/types';
import { useChatStore } from './use-chat-store';

export interface RecentChatProps {
  recentChats: Record<string, RecentChat>;
}

export interface RecentChatsState extends RecentChatProps {
  setRecentChats: (chat: ChatMessage) => void;
  onReadChat: (chat: RecentChat) => void;
}

export type RecentChatStore = ReturnType<typeof createRecentChatsStore>;

export const createRecentChatsStore = (userId: string) =>
  createStore<RecentChatsState>()(
    persist(
      (set, get) => ({
        recentChats: {},

        setRecentChats: (chat) => {
          const { sender, receiver } = chat;
          const { receiver: currentChat } = useChatStore.getState();
          const { recentChats } = get();
          const user = receiver.id === userId ? sender : receiver;

          recentChats[user.id] = {
            ...chat,
            user,
            isReaded: receiver.id === currentChat?.id,
          };

          set({ recentChats: { ...recentChats } });
        },

        onReadChat: ({ user }: RecentChat) => {
          const { recentChats } = get();
          const chat = recentChats[user.id];
          if (!chat) {
            return;
          }

          chat.isReaded = true;

          set({ recentChats: { ...recentChats } });
        },
      }),
      {
        name: userId,
        storage: createJSONStorage(() => localforage),
      },
    ),
  );
