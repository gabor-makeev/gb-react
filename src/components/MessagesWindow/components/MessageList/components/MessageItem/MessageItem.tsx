import { FC } from 'react';
import classNames from 'classnames';
import style from './MessageItem.module.scss';
import { DateTimeFormatter } from 'src/utils/DateTimeFormatter/DateTimeFormatter';
import { IClientMessage } from 'src/default-types';

interface MessageItemProps {
  userEmail: string;
  message: IClientMessage;
}

export const MessageItem: FC<MessageItemProps> = ({ userEmail, message }) => {
  const messageDateFormatter = new DateTimeFormatter(message.createdAt);

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
      <span className={style['message__date-time']}>
        {messageDateFormatter.formattedDate},{' '}
        {messageDateFormatter.amPmTimeString}
      </span>
    </li>
  );
};
