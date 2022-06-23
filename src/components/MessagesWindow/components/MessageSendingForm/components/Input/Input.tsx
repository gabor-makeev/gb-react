import style from './Input.module.scss';
import { FC, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';

interface InputProps {
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  setValue: (inputValue: string) => void;
  shouldAutoFocus?: boolean;
}

export const Input: FC<InputProps> = ({
  placeholder,
  disabled = false,
  value,
  setValue,
  shouldAutoFocus = true,
}) => {
  const element = useRef<HTMLInputElement | undefined>();

  useEffect(() => {
    if (shouldAutoFocus) {
      return element.current?.focus();
    }
  });

  return (
    <TextField
      label={'Message'}
      variant="outlined"
      type="text"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      inputRef={element}
      className={style.input}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
