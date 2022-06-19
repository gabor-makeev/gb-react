import style from './MessageSendingForm.module.scss';
import { STYLES } from '../../constants';
import React, { FC, memo, useState } from 'react';

import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMessage } from '../../store/messages/actions';

interface MessageFormProps {
  border?: string;
  borderRadius?: string;
}

export const MessageSendingForm: FC<MessageFormProps> = memo(
  ({ border = STYLES.border, borderRadius = STYLES.borderRadius }) => {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const { chatId } = useParams();

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

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (chatId) {
        dispatch(addMessage(chatId, inputValue));
      }

      setInputValue('');
    };

    return (
      <form
        onSubmit={sendMessage}
        className={style['message-form']}
        style={{ width: '100%' }}
      >
        <Container sx={formContainerStyle}>
          <Input
            disabled={!chatId}
            value={inputValue}
            setValue={setInputValue}
          />
          <Button disabled={!inputValue} />
        </Container>
      </form>
    );
  }
);
