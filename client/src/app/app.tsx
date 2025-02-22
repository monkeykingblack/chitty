// Uncomment this line to use CSS modules
// import styles from './app.module.css';

import { RouterProvider } from 'react-router-dom';

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '../constants';
import { useResponsive } from '../hooks/use-responsive';
import { useAppStore } from '../store/use-app-store';
import { Toaster } from './components/toaster';
import { router } from './router';

export function App() {
  const { md } = useResponsive();
  const { theme } = useAppStore();

  return (
    <div data-theme={theme}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position={!md ? 'top-center' : 'top-right'} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
