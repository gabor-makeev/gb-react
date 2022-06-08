import style from './MessageList.module.scss';
import List from '@mui/material/List';
import { Message } from '../Message/Message';

export const MessageList = ({ messages = [], gap = '10px' }) => {
  const messageListStyle = {
    gap: gap,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
  };

  return (
    <List
      className={style['message_list']}
      sx={messageListStyle}
      data-testid={'messageList'}
    >
      {messages.map((message, idx) => (
        <Message message={message} key={idx} />
      ))}
    </List>
  );
};
