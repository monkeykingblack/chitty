import { Link } from 'react-router-dom';

import { SquarePen } from 'lucide-react';

import { useResponsive } from '../../hooks/use-responsive';
import { useAuthStore } from '../../store/use-auth-store';

export const HomePage = () => {
  const { authUser } = useAuthStore();
  const { md } = useResponsive();

  if (!md) {
    return null;
  }

  return (
    <main className="flex h-full w-full flex-col items-center justify-center space-y-4 p-4">
      <h2 className="text-2xl font-medium">Welcome {authUser?.username}!</h2>
      <p className="text-base opacity-60">Start your conversation now</p>
      <Link to="/new">
        <SquarePen className="size-6" />
      </Link>
    </main>
  );
};
