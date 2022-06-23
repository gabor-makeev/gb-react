import React, { FC } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import style from './ChatAddingForm.module.scss';

interface ChatAddingFormProps {
  onAddChat: (e: React.FormEvent<HTMLFormElement>, inputValue: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

export const ChatAddingForm: FC<ChatAddingFormProps> = ({
  onAddChat,
  inputValue,
  setInputValue,
}) => {
  return (
    <form onSubmit={(e) => onAddChat(e, inputValue)} className={style.form}>
      <TextField
        label={'Chat name'}
        variant="outlined"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type={'submit'}>Add chat</Button>
    </form>
  );
};
