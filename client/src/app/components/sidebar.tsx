import type { User } from '@nx-chat-assignment/shared-models';
import type { RecentChat } from '../../libs/types';

import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { GalleryVerticalEnd, LogOutIcon, SquarePen } from 'lucide-react';

import { useRecentChats } from '../../hooks/use-recent-chats';
import { useResponsive } from '../../hooks/use-responsive';
import { cn } from '../../utils/cn';
import { formatMessageTime } from '../../utils/format-message-time';
import { Avatar } from './avatar';

export const Sidebar = ({
  user,
  onLogout,
}: {
  user: User;
  onLogout: VoidFunction;
}) => {
  const navigate = useNavigate();
  const { md } = useResponsive();
  const { pathname } = useLocation();

  const { recentChats, onReadChat } = useRecentChats((s) => s);

  const onSelectChat = useCallback((chat: RecentChat) => {
    // TODO: Handle isReadable status
    onReadChat(chat);
    navigate('c/' + chat.user.id);
  }, []);

  return (
    <aside
      className={cn(
        'bg-base-100 flex h-full flex-col overflow-hidden rounded-xl shadow-md transition-all duration-200 lg:w-92',
        {
          'w-full rounded-none': !md,
          hidden: !md && pathname !== '/',
        },
      )}
    >
      <div className="border-base-300 w-full border-b p-4">
        <div className="flex w-full items-center justify-between gap-2">
          <Link to="/" className="flex items-center gap-2">
            <GalleryVerticalEnd className="size-6" />
            <span className="text-base-content hidden font-bold md:block">
              Chitchat
            </span>
          </Link>
          <Link to="/new">
            <SquarePen className="size-6" />
          </Link>
        </div>
      </div>
      <div className="w-full flex-1 overflow-y-auto">
        <ul className="list">
          <li className="p-4 pb-2 text-xs tracking-wide opacity-60">
            Recent chats
          </li>

          {[...Object.values(recentChats)]
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((chat) => (
              <li
                key={chat.user.id}
                className={cn(
                  'list-row hover:bg-base-200 cursor-pointer py-2',
                  { 'bg-base-200': pathname.includes(chat.user.id) },
                )}
                onClick={() => onSelectChat(chat)}
              >
                <div className="self-center">
                  <Avatar user={chat.user} />
                </div>
                <div className="ztext-ellipsis whitespace-nowrap">
                  <div>{chat.user.username}</div>
                  <div className="overflow-hidden text-xs font-semibold text-ellipsis whitespace-nowrap opacity-60">
                    {chat.message}
                  </div>
                </div>
                <div className="items-center gap-2 self-center justify-self-end text-right">
                  {!chat.isReaded && (
                    <div
                      aria-label="status"
                      className="status status-primary"
                    />
                  )}
                  <div className="text-xs opacity-50">
                    {formatMessageTime(chat.timestamp)}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div className="border-base-300 list border-t">
        <div className="list-row">
          <div className="self-center">
            <Avatar user={user} />
          </div>
          <div className="flex flex-col justify-center self-center">
            {user.username}
            <small className="font-medium opacity-60">
              {user.online ? 'ONLINE' : 'OFFLINE'}
            </small>
          </div>
          <div className="self-center justify-self-end">
            <button className="cursor-pointer" onClick={onLogout}>
              <LogOutIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
