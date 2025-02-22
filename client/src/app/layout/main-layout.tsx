import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../../store/use-auth-store';
import { Sidebar } from '../components/sidebar';
import { RencetChatsProvider } from '../context/recent-chats-context';

export const MainLayout = () => {
  const { authUser, logout } = useAuthStore();

  if (authUser === null) {
    return <Navigate to="/auth" />;
  }

  return (
    <RencetChatsProvider user={authUser}>
      <div className="bg-base-300 h-screen overflow-hidden">
        <div className="flex h-full md:space-x-4 md:p-4">
          <Sidebar user={authUser} onLogout={logout} />
          <div className="bg-base-100 flex-1 shadow-md md:rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </RencetChatsProvider>
  );
};
