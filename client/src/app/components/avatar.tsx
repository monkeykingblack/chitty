import { User } from '@nx-chat-assignment/shared-models';

import { cn } from '../../utils/cn';

export const Avatar = ({
  user,
  size = 'sm',
  className,
}: {
  user: User;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}) => {
  return (
    <div
      className={cn(
        'avatar avatar-placeholder',
        user.online ? 'avatar-online' : 'avatar-offline',
        className,
      )}
    >
      <div
        className={cn('bg-neutral text-neutral-content rounded-full', {
          'w-24': size === 'xl',
          'w-16': size === 'lg',
          'w-12': size === 'md',
          'w-8': size === 'sm',
        })}
      >
        <span
          className={cn('uppercase', {
            'text-3xl': size === 'xl',
            'text-xl': size === 'lg',
            'text-base': size === 'md',
            'text-xs': size === 'sm',
          })}
        >
          {user.username[0]}
        </span>
      </div>
    </div>
  );
};
