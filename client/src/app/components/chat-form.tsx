import type { ChatMessage, User } from '@nx-chat-assignment/shared-models';

import React, { useEffect, useRef, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { LucideSendHorizontal } from 'lucide-react';

import { QueryKeys } from '../../constants';
import { ReceiveMessagePayload } from '../../libs/types';
import { useChatStore } from '../../store/use-chat-store';
import { cn } from '../../utils/cn';
import { chatHistoryQuery } from '../loaders/chat-history-loader';
import { ChatSkeleton } from './chat-skeleton';

export type Props = {
  onSend?: () => void;
  sender: User;
  receiver: User;
};

export const ChatForm = ({ onSend, sender, receiver }: Props) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage, subcribeToMessage } = useChatStore();
  const [receiveMessages, setReceiveMessages] = useState<ChatMessage[]>([]);
  const queryClient = useQueryClient();

  const handleSubmit = React.useCallback(
    (formData: FormData) => {
      const message = formData.get('message') as string | null;
      if (message) {
        sendMessage(message, receiver);
        onSend?.();
      }
    },
    [receiver],
  );

  const { data: chatHistory = [], isFetching } = useQuery(
    chatHistoryQuery(sender.id, receiver.id),
  );

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, receiveMessages]);

  useEffect(() => {
    function onReceiveMessage({ data }: ReceiveMessagePayload) {
      setReceiveMessages((oldValue) => [...oldValue, data]);
    }

    const unsubcriber = subcribeToMessage(onReceiveMessage);
    return () => {
      unsubcriber();
    };
  }, []);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({
        queryKey: QueryKeys.chatHistory(sender.id, receiver.id),
      });
    };
  }, []);

  return (
    <React.Fragment>
      <section className="flex grow flex-col overflow-y-auto p-4">
        {isFetching ? (
          <ChatSkeleton />
        ) : (
          [...chatHistory, ...receiveMessages]
            .sort((a, b) => a.timestamp - b.timestamp)
            .map(({ id, sender, message, timestamp }) => (
              <div
                key={id}
                className={cn(
                  'chat',
                  sender.id === receiver.id ? 'chat-start' : 'chat-end',
                )}
                ref={messageEndRef}
              >
                <div className="chat-bubble">{message}</div>
                <div className="chat-footer">
                  <time className="text-xs opacity-50">
                    {format(timestamp, 'HH:mm')}
                  </time>
                </div>
              </div>
            ))
        )}
      </section>
      <div className="border-base-300 border-t px-4 py-2">
        <form className="flex gap-4" action={handleSubmit}>
          <input
            name="message"
            className="input w-full rounded"
            placeholder="Aa"
            type="text"
            autoComplete="off"
            defaultValue=""
          />
          <button className="btn text-primary" type="submit">
            <LucideSendHorizontal />
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
