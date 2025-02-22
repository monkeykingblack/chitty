import type { OnlineUsers, User } from '@nx-chat-assignment/shared-models';
import type { Socket } from 'socket.io-client';

import { io } from 'socket.io-client';
import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { axios, BACKEND_URL } from '../constants';
import { HttpError } from '../libs/http-error';
import { ErrorPayload, RecentChat, UsersOnlinePayload } from '../libs/types';

export interface AuthStoreProps {
  authUser: User | null;
  socket: Socket | null;
  isLoggedIn: boolean;
  onlineUsers: OnlineUsers;
  recentChats: RecentChat[];
}

export interface AuthStoreState extends AuthStoreProps {
  login: (data: { username: string }) => Promise<void>;
  logout: () => Promise<void>;
  connectSocket: VoidFunction;
  disconnectSocket: VoidFunction;
  loginWithSocket: VoidFunction;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      authUser: null,
      isLoggedIn: false,
      socket: null,
      onlineUsers: [],
      recentChats: [],

      login: async (data) => {
        try {
          const res = await axios
            .post<User>('/auth/login', data)
            .then(({ data }) => data);

          if (res === null) {
            throw new HttpError(`Username has been taken`, 400);
          }

          set({ authUser: res });
          get().connectSocket();
        } catch (err) {
          const error = err as HttpError;
          toast.error(error.message);
          set({ authUser: null });
        }
      },

      logout: async () => {
        try {
          const user = get().authUser;
          if (!user) {
            return;
          }
          get().disconnectSocket();
          await axios.post('/auth/logout', { userId: user.id });
          set({ authUser: null });
          toast.success('Logged out successfully');
        } catch (err) {
          const error = err as HttpError;
          toast.error(error.message);
        }
      },

      connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BACKEND_URL, {
          autoConnect: true,
        });

        socket.on('error', (payload: ErrorPayload) => {
          toast.error(payload.message);
        });

        socket.on('usersOnline', ({ data }: UsersOnlinePayload) => {
          set({ onlineUsers: data.filter((i) => i.id !== get().authUser?.id) });
        });

        socket.emit('user:login', authUser.username);

        set({
          socket,
          isLoggedIn: true,
          authUser: {
            ...authUser,
            online: true,
          },
        });
      },

      disconnectSocket: () => {
        const socket = get().socket;

        if (socket && socket.connected) {
          socket.close();
        }
        set({ socket: null, isLoggedIn: false });
      },

      loginWithSocket: () => {
        const { authUser, isLoggedIn } = get();
        if (isLoggedIn || !authUser) {
          return;
        }
        get().connectSocket();
      },
    }),
    {
      name: 'app-user',
      partialize(state) {
        return {
          authUser: state.authUser,
        };
      },
      onRehydrateStorage: () => (state) => {
        const { authUser, login } = state ?? {};
        if (authUser && login) {
          login({ username: authUser.username });
        }
      },
    },
  ),
);
