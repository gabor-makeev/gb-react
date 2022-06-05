import style from './MessageList.module.scss';
import { Message } from '../Message/Message';

export const MessageList = ({
  messages,
  messageListStyle = { gap: '10px' },
}) => {
  return (
    <ul className={style['message_list']} style={messageListStyle}>
      {messages.map((message, idx) => (
        <Message message={message} key={idx} />
      ))}
    </ul>
  );
};
