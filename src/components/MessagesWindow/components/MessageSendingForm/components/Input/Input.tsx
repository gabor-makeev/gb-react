import style from './Input.module.scss';
import { FC, useEffect, useRef } from 'react';

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
  const element = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldAutoFocus) {
      return element.current?.focus();
    }
  });

  return (
    <input
      type="text"
      value={value}
      disabled={disabled}
      placeholder={placeholder}
      ref={element}
      className={style.input}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      data-testid={'messageSendingFormInput'}
    />
  );
};
