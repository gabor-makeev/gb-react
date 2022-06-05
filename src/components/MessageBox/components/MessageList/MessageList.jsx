import style from './MessageList.module.scss';
import { Message } from 'components/MessageBox/components/Message/Message';

export const MessageList = ({ messages }) => {
  return (
    <ul className={style['message_list']}>
      {messages.map((message, idx) => (
        <Message message={message} key={idx} />
      ))}
    </ul>
  );
};
