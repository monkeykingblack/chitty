import { useContext } from 'react';

import { useStore } from 'zustand';

import { RecentChatsContext } from '../app/context/recent-chats-context';
import { RecentChatsState } from '../store/recent-chats-store';

export function useRecentChats<T>(selector: (state: RecentChatsState) => T): T {
  const store = useContext(RecentChatsContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree');
  return useStore(store, selector);
}
