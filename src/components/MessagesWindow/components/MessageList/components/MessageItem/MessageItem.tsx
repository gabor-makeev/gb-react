import { FC } from 'react';
import classNames from 'classnames';
import style from './MessageItem.module.scss';
import { Message } from 'src/default-types';

interface MessageItemProps {
  userEmail: string;
  message: Message;
  variant?: string;
}

export const MessageItem: FC<MessageItemProps> = ({
  userEmail,
  message,
  variant = 'medium',
}) => {
  const MessageListItemClasses = classNames(
    style[`message__type-${variant}`],
    style.message,
    {
      [style['message__system-background']]: !message.userEmail,
      [style['message__user-background']]: message.userEmail,
      [style['message__other-user']]:
        message.userEmail && message.userEmail !== userEmail,
    }
  );

  return (
    <li className={MessageListItemClasses} data-testid={'messageItem'}>
      {message.body}
      <span className={style['message__author-sign']}>{message.userName}</span>
    </li>
  );
};
