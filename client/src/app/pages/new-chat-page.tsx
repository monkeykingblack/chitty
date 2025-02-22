import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { OnlineUsers, User } from '@nx-chat-assignment/shared-models';
import debounce from 'lodash.debounce';
import { ArrowLeft, XIcon } from 'lucide-react';

import { useAuthStore } from '../../store/use-auth-store';
import { useChatStore } from '../../store/use-chat-store';
import { cn } from '../../utils/cn';
import { Avatar } from '../components/avatar';
import { ChatForm } from '../components/chat-form';

export const NewChatPage = () => {
  const navigate = useNavigate();
  const { onlineUsers, authUser } = useAuthStore();
  const { receiver, setReceiver } = useChatStore();

  const handleSend = useCallback(() => {
    if (!receiver) {
      return;
    }
    navigate('/c/' + receiver?.id);
  }, [receiver]);

  useEffect(() => {
    return () => {
      if (receiver) {
        setReceiver(null);
      }
    };
  }, []);

  return (
    <main className="flex h-full w-full flex-col overflow-hidden">
      <header className="border-base-300 flex items-center gap-2 border-b px-4 py-3">
        <button
          onClick={() => navigate('/')}
          className="cursor-pointer md:hidden"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h3 className="text-sm opacity-50 md:text-base">To</h3>
        {receiver ? (
          <button className="btn btn-sm" onClick={() => setReceiver(null)}>
            <p className="inline-block max-w-30 overflow-hidden text-sm text-ellipsis whitespace-nowrap">
              {receiver.username}
            </p>
            <XIcon className="size-3" />
          </button>
        ) : (
          <SearchUserOnline onlineUsers={onlineUsers} onSelect={setReceiver} />
        )}
      </header>
      {receiver && authUser && (
        <ChatForm sender={authUser} receiver={receiver} onSend={handleSend} />
      )}
    </main>
  );
};

const SearchUserOnline = ({
  onlineUsers,
  onSelect,
}: {
  onlineUsers: OnlineUsers;
  onSelect: (user: User) => void;
}) => {
  const [list, setList] = useState<OnlineUsers>([]);

  const handleSearch = useCallback(
    debounce((value: string) => {
      const regex = new RegExp(value, 'gis');
      setList(onlineUsers.filter((user) => regex.test(user.username)));
    }, 0),
    [onlineUsers],
  );

  useEffect(() => {
    setList(onlineUsers);
  }, [onlineUsers]);

  return (
    <div className="relative w-full md:w-sm">
      <label className="input input-sm w-full">
        <input type="search" onChange={(e) => handleSearch(e.target.value)} />
      </label>
      <div className="absolute right-0 left-0 flex pt-4">
        <ul
          className={cn(
            'list bg-base-100 rounded-box max-h-[300px] w-full overflow-y-auto shadow-lg',
          )}
        >
          {list.length > 0 ? (
            onlineUsers.map((user) => (
              <li
                key={user.id}
                className="list-row hover:bg-base-300 hover:cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(user);
                }}
              >
                <div>
                  <Avatar user={user} />
                </div>
                <div className="self-center">
                  <div>{user.username}</div>
                </div>
              </li>
            ))
          ) : (
            <li className="self-center p-4 text-xs tracking-wide opacity-60">
              No user online
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
