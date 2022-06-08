import style from './Input.module.scss';
import { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';

export const Input = ({
  placeholder,
  value,
  setValue,
  shouldAutoFocused = true,
}) => {
  const element = useRef();

  useEffect(() => {
    if (shouldAutoFocused) {
      return element.current.focus();
    }
  });

  return (
    <TextField
      label={'Message field'}
      variant="outlined"
      type="text"
      value={value}
      placeholder={placeholder}
      inputRef={element}
      className={style.input}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
