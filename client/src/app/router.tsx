import { createBrowserRouter, Navigate } from 'react-router-dom';

import { queryClient } from '../constants';
import { loginAction } from './actions/login-action';
import { HydrationFallback } from './components/hydration-fallback';
import { AuthLayout } from './layout/auth-layout';
import { MainLayout } from './layout/main-layout';
import { loadChatHistory } from './loaders/chat-history-loader';
import { loadOnlineUsers } from './loaders/new-chat-loader';
import { ChatPage } from './pages/chat-page';
import { ErrorPage } from './pages/error-page';
import { HomePage } from './pages/home-page';
import { LoginPage } from './pages/login-page';
import { NewChatPage } from './pages/new-chat-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <HydrationFallback />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/new',
        loader: loadOnlineUsers(queryClient),
        element: <NewChatPage />,
        hydrateFallbackElement: <HydrationFallback />,
      },
      {
        path: '/c/:id',
        loader: loadChatHistory(queryClient),
        element: <ChatPage />,
        hydrateFallbackElement: <HydrationFallback />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" />,
      },
      {
        path: '/auth/login',
        action: loginAction,
        element: <LoginPage />,
      },
    ],
  },
]);
