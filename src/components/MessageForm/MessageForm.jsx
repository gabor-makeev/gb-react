import style from './MessageForm.module.scss';
import { AUTHORS, STYLES } from '../../constants';
import { useState } from 'react';

import { Button } from './Button/Button';
import { Input } from './Input/Input';
import { Container } from '@mui/material';

export const MessageForm = ({
  pushMessage,
  border = STYLES.border,
  borderRadius = STYLES.borderRadius,
}) => {
  const [inputValue, setInputValue] = useState('');

  const formContainerStyle = {
    border: border,
    borderRadius: borderRadius,
    backgroundColor: '#CCCCCC',
    width: '300px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0 5px 15px',
    padding: '20px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
    margin: '0',
  };

  const sendMessage = (e) => {
    e.preventDefault();
    pushMessage({
      text: inputValue,
      author: AUTHORS.user,
    });

    setInputValue('');
  };

  return (
    <form
      onSubmit={sendMessage}
      className={style['message-form']}
      style={{ width: '100%' }}
    >
      <Container sx={formContainerStyle}>
        <Input value={inputValue} setValue={setInputValue} />
        <Button disabled={!inputValue} />
      </Container>
    </form>
  );
};
