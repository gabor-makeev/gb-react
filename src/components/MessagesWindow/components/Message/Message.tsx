import style from './Message.module.scss';
import ListItem from '@mui/material/ListItem';
import { AUTHORS, STYLES } from '../../../../constants';
import { FC } from 'react';
import { MessageItem } from 'src/default-types';

interface MessageProps {
  message: MessageItem;
  padding?: string;
  maxWidth?: string;
}

export const Message: FC<MessageProps> = ({
  message,
  padding = '15px 15px',
  maxWidth = '275px',
}) => {
  const messageStyle = {
    backgroundColor:
      message.author === AUTHORS.bot
        ? STYLES.color.system
        : STYLES.color.secondary,
    maxWidth: maxWidth,
    padding: padding,
    boxSizing: 'border-box',
    position: 'relative',
    justifyContent: 'flex-end',
    borderRadius: '20px',
    listStyleType: 'none',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
  };

  return (
    <ListItem sx={messageStyle} className={style.message}>
      {message.text}
      <span className={style['message__author-sign']}>{message.author}</span>
    </ListItem>
  );
};
