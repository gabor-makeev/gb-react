import style from './Input.module.scss';
import {useRef} from 'react';

export const Input = ({isFocused = false, placeholder, value, setValue}) => {
  const element = useRef();

  if (isFocused) {
    element.current.focus();
  }

  return (
    <>
      <label className={style.label} htmlFor="input">Message field</label>
      <input
        type="text"
        value={value}
        ref={element}
        className={style.input}
        placeholder={placeholder}
        id={'input'}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </>
  );
};
