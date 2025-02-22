import { format, formatDistanceToNow, isToday } from 'date-fns';

export function formatMessageTime(timestamp: number) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.valueOf() - date.valueOf()) / 1000);

  if (diffInSeconds < 3600) {
    return formatDistanceToNow(date, { addSuffix: true });
  }

  if (isToday(date)) {
    return format(date, 'HH:mm');
  }

  return format(date, 'HH:mm dd/MM/yyyy');
}
