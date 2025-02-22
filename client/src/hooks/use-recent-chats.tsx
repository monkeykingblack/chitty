import { useContext } from 'react';

import { shallow } from 'zustand/shallow';
import { useStoreWithEqualityFn } from 'zustand/traditional';

import { RecentChatsContext } from '../app/context/recent-chats-context';
import { RecentChatsState } from '../store/recent-chats-store';

export function useRecentChats<T>(selector: (state: RecentChatsState) => T): T {
  const store = useContext(RecentChatsContext);
  if (!store) throw new Error('Missing BearContext.Provider in the tree');
  return useStoreWithEqualityFn(store, selector, shallow);
}
