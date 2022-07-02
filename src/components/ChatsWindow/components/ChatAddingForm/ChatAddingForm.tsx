import React, { FC } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import style from './ChatAddingForm.module.scss';
import classNames from 'classnames';

interface ChatAddingFormProps {
  onAddChat: (e: React.FormEvent<HTMLFormElement>, inputValue: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  hoverable?: boolean;
  disabledInput?: boolean;
  disabledButton?: boolean;
}

export const ChatAddingForm: FC<ChatAddingFormProps> = ({
  onAddChat,
  inputValue,
  setInputValue,
  hoverable = false,
  disabledInput = false,
  disabledButton = false,
}) => {
  const classes = classNames(style.form, hoverable ? style.hoverable : '');

  return (
    <form onSubmit={(e) => onAddChat(e, inputValue)} className={classes}>
      <TextField
        label={'Chat name'}
        variant="outlined"
        type="text"
        value={inputValue}
        data-testid={'ChatAddingFormTextField'}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={disabledInput}
      />
      <Button
        data-testid={'ChatAddingFormButton'}
        type={'submit'}
        disabled={disabledButton}
      >
        Add chat
      </Button>
    </form>
  );
};
