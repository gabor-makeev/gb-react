import style from './MessageItem.module.scss';
import { FC } from 'react';
import { MUIStyledMessageListItem } from 'components/MUIStyledComponents/MUIStyledMessageListItem';
import classNames from 'classnames';
import { Authors, Message } from 'src/default-types';

interface MessageItemProps {
  message: Message;
  variant?: string;
  userName: string;
}

export const MessageItem: FC<MessageItemProps> = ({
  message,
  variant = 'medium',
  userName,
}) => {
  let MessageListItemClasses = classNames(style[`message__type-${variant}`]);

  if (!message.userEmail) {
    MessageListItemClasses += ` ${style['message__system-background']}`;
  } else {
    MessageListItemClasses += ` ${style['message__user-background']}`;
  }

  return (
    <MUIStyledMessageListItem
      className={MessageListItemClasses}
      disablePadding={true}
      data-testid={'messageItem'}
    >
      {message.body}
      <span className={style['message__author-sign']}>
        {message.userEmail ? userName : Authors.BOT}
      </span>
    </MUIStyledMessageListItem>
  );
};
