import { FC } from 'react';
import classNames from 'classnames';
import style from './MessageItem.module.scss';
import { Message } from 'src/default-types';

interface MessageItemProps {
  userEmail: string;
  message: Message;
}

export const MessageItem: FC<MessageItemProps> = ({ userEmail, message }) => {
  const date = new Date();
  const messageDate = new Date(message.createdAt);

  const isSameYear = date.getFullYear() === messageDate.getFullYear();
  const isSameMonth = date.getMonth() === messageDate.getMonth();
  const isSameDay = date.getDate() === messageDate.getDate();

  const getDayOrMonthWithZero = (dayOrMonth: number): string => {
    return dayOrMonth.toString().length === 1
      ? `0${dayOrMonth}`
      : dayOrMonth.toString();
  };

  const getMessageDateString = () => {
    const messageDateDayWithZero = getDayOrMonthWithZero(messageDate.getDate());
    const messageDateMonthWithZero = getDayOrMonthWithZero(
      messageDate.getMonth() + 1
    );

    if (isSameYear) {
      if (isSameDay) {
        return 'Today';
      } else if (isSameMonth && messageDate.getDate() === date.getDate() - 1) {
        return 'Yesterday';
      }

      return `${messageDateDayWithZero}/${messageDateMonthWithZero}`;
    }

    return `${messageDateDayWithZero}/${messageDateMonthWithZero}/${messageDate.getFullYear()}`;
  };

  const MessageListItemClasses = classNames(style.message, {
    [style['message__system-background']]: !message.userEmail,
    [style['message__auth-user']]:
      message.userEmail && message.userEmail === userEmail,
    [style['message__other-user']]:
      message.userEmail && message.userEmail !== userEmail,
  });

  return (
    <li className={MessageListItemClasses} data-testid={'messageItem'}>
      <span className={style['message__content']}>{message.body}</span>
    </li>
  );
};
