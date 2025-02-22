import type { OnlineUsers } from '@nx-chat-assignment/shared-models';
import type { QueryClient } from '@tanstack/react-query';

import { queryOptions } from '@tanstack/react-query';

import { axios } from '../../constants';
import { QueryKeys } from '../../constants/query-keys';
import { useAuthStore } from '../../store/use-auth-store';

export const getOnlineUsers = (userId?: string) => {
  return queryOptions({
    queryKey: QueryKeys.onlineUsers(userId),
    queryFn: () =>
      axios
        .get<OnlineUsers>('/users/online')
        .then(({ data }) => data.filter((user) => user.id !== userId)),
  });
};

export const loadOnlineUsers = (queryClient: QueryClient) => async () => {
  const { authUser } = useAuthStore.getState();
  await queryClient.ensureQueryData(getOnlineUsers(authUser?.id));

  return { userId: authUser?.id };
};
