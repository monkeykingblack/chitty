import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppStoreProps {
  theme: 'light' | 'dark';
}

export interface AppStoreState extends AppStoreProps {
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useAppStore = create<AppStoreState>()(
  persist(
    (set) => ({
      theme:
        (localStorage.getItem('app-theme') as AppStoreProps['theme']) ||
        'light',
      setTheme(theme) {
        localStorage.setItem('app-them', theme);
        set({ theme });
      },
    }),
    {
      name: 'app-config',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
);
