import type { User } from '@nx-chat-assignment/shared-models';
import type { ReceiveMessagePayload } from '../../libs/types';

import React, { useEffect } from 'react';

import {
  createRecentChatsStore,
  RecentChatStore,
} from '../../store/recent-chats-store';
import { useChatStore } from '../../store/use-chat-store';

export const RecentChatsContext = React.createContext<RecentChatStore | null>(
  null,
);

export const RencetChatsProvider = ({
  children,
  user,
}: React.PropsWithChildren<{ user: User }>) => {
  const store = React.useRef(createRecentChatsStore(user.id)).current;
  const { subcribeToMessage } = useChatStore();

  useEffect(() => {
    function onReceiveMessage(payload: ReceiveMessagePayload) {
      store.getState().setRecentChats(payload.data);
    }
    const unsubcribe = subcribeToMessage(onReceiveMessage);
    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <RecentChatsContext.Provider value={store}>
      {children}
    </RecentChatsContext.Provider>
  );
};
