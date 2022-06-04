import style from './MessageForm.module.scss';
import { AUTHORS, STYLES } from '../../constants';
import { useRef, useState } from 'react';

export const MessageForm = ({
  pushMessage,
  border = STYLES.border,
  borderRadius = STYLES.borderRadius,
}) => {
  const [messageContent, setMessageContent] = useState('');

  const messageFormStyle = {
    border: border,
    borderRadius: borderRadius,
  };

  const input = useRef();

  const sendMessage = (e) => {
    e.preventDefault();
    pushMessage({
      text: messageContent,
      author: AUTHORS.user,
    });

    setMessageContent('');
    input.current.focus();
  };

  return (
    <form
      onSubmit={sendMessage}
      className={style['message-form']}
      style={messageFormStyle}
    >
      <input
        type="text"
        value={messageContent}
        ref={input}
        className={style['message-form__input']}
        onChange={(e) => {
          setMessageContent(e.target.value);
        }}
      />
      <button
        className={style['message-form__button']}
        disabled={!messageContent}
      >
        Send
      </button>
    </form>
  );
};
