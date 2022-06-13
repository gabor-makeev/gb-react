import { ChatItem } from 'src/default-types';
import React, { FC, useState } from 'react';
import { nanoid } from 'nanoid';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import style from './ChatAddingForm.module.scss';

interface ChatAddingFormProps {
  addChat: (chat: ChatItem) => void;
}

export const ChatAddingForm: FC<ChatAddingFormProps> = ({ addChat }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value) {
      addChat({
        id: nanoid(),
        name: value,
      });
    }
    setValue('');
  };

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <TextField
        label={'Chat name'}
        variant="outlined"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <Button type={'submit'}>Add chat</Button>
    </form>
  );
};
