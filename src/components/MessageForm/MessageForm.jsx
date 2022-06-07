import style from './MessageForm.module.scss';
import { AUTHORS, STYLES } from '../../constants';
import { useState } from 'react';

import { Button } from './Button/Button';
import { Input } from './Input/Input';

export const MessageForm = ({
  pushMessage,
  border = STYLES.border,
  borderRadius = STYLES.borderRadius,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputFocus, setInputFocus] = useState(false);

  const messageFormStyle = {
    border: border,
    borderRadius: borderRadius,
  };

  const sendMessage = (e) => {
    e.preventDefault();
    pushMessage({
      text: inputValue,
      author: AUTHORS.user,
    });

    setInputValue('');
    setInputFocus(true);
  };

  return (
    <form
      onSubmit={sendMessage}
      className={style['message-form']}
      style={messageFormStyle}
    >
      <Input
        isFocused={inputFocus}
        value={inputValue}
        setValue={setInputValue}
      />
      <Button disabled={!inputValue} />
    </form>
  );
};
