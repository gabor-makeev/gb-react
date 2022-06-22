import React, { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import style from './ChatAddingForm.module.scss';
import { useDispatch } from 'react-redux';
import { addChat } from '../../../../store/messages/actions';

export const ChatAddingForm: FC = () => {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value) {
      dispatch(addChat(value));
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
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type={'submit'}>Add chat</Button>
    </form>
  );
};
