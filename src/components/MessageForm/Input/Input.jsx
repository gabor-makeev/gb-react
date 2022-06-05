import style from './Input.module.scss';
import { useEffect, useRef } from 'react';

export const Input = ({ isFocused = false, value, setValue }) => {
  const element = useRef();

  useEffect(() => {
    if (isFocused) {
      element.current.focus();
    }
  });

  return (
    <input
      type="text"
      value={value}
      ref={element}
      className={style.input}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
