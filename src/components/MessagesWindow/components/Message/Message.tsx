import style from './Message.module.scss';
import { AUTHORS } from '../../../../constants';
import { FC } from 'react';
import { MessageItem } from 'src/default-types';
import { MessageListItem } from '../../../StyledMUIComponents/MessageListItem';
import classNames from 'classnames';

interface MessageProps {
  message: MessageItem;
  variant?: string;
}

export const Message: FC<MessageProps> = ({ message, variant = 'medium' }) => {
  let MessageListItemClasses = classNames(style[`message__type-${variant}`]);

  if (message.author === AUTHORS.bot) {
    MessageListItemClasses += ` ${style['message__system-background']}`;
  } else {
    MessageListItemClasses += ` ${style['message__user-background']}`;
  }

  return (
    <MessageListItem className={MessageListItemClasses} disablePadding={true}>
      {message.text}
      <span className={style['message__author-sign']}>{message.author}</span>
    </MessageListItem>
  );
};
