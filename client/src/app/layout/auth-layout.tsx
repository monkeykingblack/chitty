import { Navigate, Outlet } from 'react-router-dom';

import { GalleryVerticalEnd } from 'lucide-react';

import { useAuthStore } from '../../store/use-auth-store';

export const AuthLayout = () => {
  const { authUser } = useAuthStore();

  if (authUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center gap-2 font-medium">
                <div className="flex items-center justify-center gap-2 rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                  <h3 className="text-base-content font-bold">Chitty</h3>
                </div>
                <span className="sr-only">Acme Inc.</span>
              </div>
              <h1 className="text-lg font-bold md:text-xl">
                Simple chat for simple people
              </h1>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
