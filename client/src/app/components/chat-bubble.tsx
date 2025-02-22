import { User } from '@nx-chat-assignment/shared-models';
import { format } from 'date-fns';

import { cn } from '../../utils/cn';

type Props = {
  content: string;
  user: User;
  isMe: boolean;
  timestamp: number;
};

export const Chatbubble = (props: Props) => {
  return (
    <div className={cn('chat', props.isMe ? 'chat-start' : 'chat-end')}>
      <div className="chat-bubble">{props.content}</div>
      <div className="chat-footer">
        <time className="text-xs opacity-50">
          {format(props.timestamp, 'HH:mm')}
        </time>
      </div>
    </div>
  );
};
