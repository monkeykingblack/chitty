import { useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';

import { useChatStore } from '../../store/use-chat-store';
import { ChatForm } from '../components/chat-form';
import { loadChatHistory } from '../loaders/chat-history-loader';

export const ChatPage = () => {
  const navigate = useNavigate();
  const { receiver, sender } = useLoaderData() as Awaited<
    ReturnType<ReturnType<typeof loadChatHistory>>
  >;
  const { setReceiver } = useChatStore();

  useEffect(() => {
    setReceiver(receiver);

    return () => {
      setReceiver(null);
    };
  }, [receiver]);

  return (
    <main className="flex h-full w-full flex-col overflow-hidden">
      <header className="border-base-300 box-border flex h-14 items-center space-x-4 border-b px-4 py-2">
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer md:hidden"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="inline-flex items-center gap-2">
          <div className="">
            <p>{receiver.username}</p>
          </div>
        </div>
      </header>
      <ChatForm sender={sender} receiver={receiver} />
    </main>
  );
};
