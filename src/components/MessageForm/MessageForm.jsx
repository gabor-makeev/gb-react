import style from './MessageForm.module.scss';
import {useRef, useState} from 'react';

export const MessageForm = ({ pushMessage }) => {
  const [messageContent, setMessageContent] = useState('');
  const input = useRef();

  const sendMessage = (e) => {
    e.preventDefault();
    pushMessage({
      text: messageContent,
      author: 'Gabor',
    });

    setMessageContent('');
    input.current.focus();
  };

  return (
    <form onSubmit={sendMessage} className={style['message-form']}>
      <input
        type="text"
        value={messageContent}
        ref={input}
        className={style['message-form__input']}
        onChange={(e) => {
          setMessageContent(e.target.value);
        }}
      />
      <button className={style['message-form__button']}>Send</button>
    </form>
  );
}