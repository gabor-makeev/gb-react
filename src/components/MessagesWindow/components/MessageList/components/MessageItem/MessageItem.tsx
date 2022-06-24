import style from './MessageItem.module.scss';
import { AUTHORS } from '../../../../../../constants';
import { FC } from 'react';
import { MUIStyledMessageListItem } from '../../../../../MUIStyledComponents/MUIStyledMessageListItem';
import classNames from 'classnames';
import { Message } from 'src/default-types';

interface MessageItemProps {
  message: Message;
  variant?: string;
}

export const MessageItem: FC<MessageItemProps> = ({
  message,
  variant = 'medium',
}) => {
  let MessageListItemClasses = classNames(style[`message__type-${variant}`]);

  if (message.author === AUTHORS.bot) {
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
      <span className={style['message__author-sign']}>{message.author}</span>
    </MUIStyledMessageListItem>
  );
};
