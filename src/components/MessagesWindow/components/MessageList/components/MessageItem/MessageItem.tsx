import style from './MessageItem.module.scss';
import { AUTHORS } from 'src/constants';
import { FC } from 'react';
import { MUIStyledMessageListItem } from 'components/MUIStyledComponents/MUIStyledMessageListItem';
import classNames from 'classnames';
import { Message } from 'src/default-types';

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
  let isBotMessage = false;
  let MessageListItemClasses = classNames(style[`message__type-${variant}`]);

  if (message.userId === AUTHORS.bot) {
    isBotMessage = !isBotMessage;
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
      {message.text}
      <span className={style['message__author-sign']}>
        {isBotMessage ? message.userId : userName}
      </span>
    </MUIStyledMessageListItem>
  );
};
