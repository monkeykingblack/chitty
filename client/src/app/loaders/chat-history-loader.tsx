import type { ChatHistory, User } from '@nx-chat-assignment/shared-models';
import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';

import { queryOptions } from '@tanstack/react-query';

import { axios } from '../../constants';
import { QueryKeys } from '../../constants/query-keys';
import { useAuthStore } from '../../store/use-auth-store';

export const chatHistoryQuery = (senderId: string, receiverId: string) => {
  return queryOptions({
    queryKey: QueryKeys.chatHistory(senderId, receiverId),
    queryFn: () =>
      axios
        .get<ChatHistory>(`/messages/history/${senderId}/${receiverId}`)
        .then(({ data }) => {
          console.log(data);
          return data;
        }),
  });
};

export const loadChatHistory =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;
    if (!id) {
      throw new Error('No userID provided');
    }
    const { authUser } = useAuthStore.getState();

    if (!authUser) {
      throw new Error('Unauthorized');
    }

    const receiver = await queryClient.fetchQuery({
      queryKey: QueryKeys.userInfo(authUser.id),
      queryFn: () => axios.get<User>('/users/' + id).then(({ data }) => data),
    });

    if (!receiver) {
      throw new Error('User not online or not existed');
    }

    await queryClient.ensureQueryData(chatHistoryQuery(authUser.id, id));

    return { receiver, sender: authUser };
  };
