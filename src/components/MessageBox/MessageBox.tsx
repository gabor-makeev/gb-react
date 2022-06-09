import style from './MessageBox.module.scss';
import { STYLES } from '../../constants';

import { MessageList } from './components/MessageList/MessageList';
import { Container } from '@mui/material';
import { MessageItem } from 'src/default-types';
import { FC } from 'react';

interface MessageBoxProps {
  messages: MessageItem[];
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
}

export const MessageBox: FC<MessageBoxProps> = ({
  messages,
  backgroundColor = STYLES.color.primary,
  borderRadius = '15px',
  padding = '20px',
}) => {
  const messageBoxStyle = {
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    flex: '0 1 300px',
    maxWidth: '300px',
    border: '1px solid black',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0 5px 15px',
    padding: padding,
    marginLeft: 'unset',
  };

  return (
    <Container
      className={style['message-box']}
      sx={messageBoxStyle}
      data-testid={'messageBox'}
      maxWidth={false}
    >
      <MessageList messages={messages} />
    </Container>
  );
};
