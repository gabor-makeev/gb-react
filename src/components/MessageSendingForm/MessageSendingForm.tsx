import style from './MessageSendingForm.module.scss';
import { AUTHORS, STYLES } from '../../constants';
import { MessageItem } from 'src/default-types';
import React, { FC, memo, useState } from 'react';

import { Button } from './components/Button/Button';
import { Input } from './components/Input/Input';
import { Container } from '@mui/material';

interface MessageFormProps {
  handleAddMessage: (message: MessageItem) => void;
  isMessageSendingFormActive?: boolean;
  border?: string;
  borderRadius?: string;
}

export const MessageSendingForm: FC<MessageFormProps> = memo(
  ({
    handleAddMessage,
    isMessageSendingFormActive = true,
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

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleAddMessage({
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
          <Input
            isInputActive={isMessageSendingFormActive}
            value={inputValue}
            setValue={setInputValue}
          />
          <Button disabled={!inputValue} />
        </Container>
      </form>
    );
  }
);
