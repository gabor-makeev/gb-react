import style from './Input.module.scss';
import { useRef } from 'react';

export const Input = ({ isFocused = false, placeholder, value, setValue }) => {
  const element = useRef();

  if (isFocused) {
    element.current.focus();
  }

  return (
    <input
      type="text"
      value={value}
      ref={element}
      className={style.input}
      placeholder={placeholder}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
