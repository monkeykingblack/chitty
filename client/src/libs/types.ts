import {
  ChatMessage,
  OnlineUsers,
  User,
} from '@nx-chat-assignment/shared-models';

export type Payload<T = unknown> = {
  event: string;
} & T;

export interface ErrorPayload extends Payload {
  message: string;
}

export interface UsersOnlinePayload extends Payload {
  event: 'usersOnline';
  data: OnlineUsers;
}

export interface ReceiveMessagePayload extends Payload {
  event: 'message:receive';
  data: ChatMessage;
}

export interface SendMessagePayload extends Payload {
  event: 'message:send';
  data: {
    receiver: User;
    message: string;
  };
}

export interface RecentChat {
  // sender: User;
  // receiver: User;
  user: User;
  message: string;
  timestamp: number;
  isReaded: boolean;
}
