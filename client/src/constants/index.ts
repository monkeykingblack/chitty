import { createAxios } from './axios';
import { createQueryClient } from './query-client';

export * from './query-keys';

export const BACKEND_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:4000' : '/';

export const axios = createAxios();
export const queryClient = createQueryClient();
