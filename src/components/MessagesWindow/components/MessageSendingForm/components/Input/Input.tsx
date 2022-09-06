import style from './Input.module.scss';
import { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';

interface InputProps {
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  setValue: (inputValue: string) => void;
  shouldAutoFocus?: boolean;
}

export const Input: FC<InputProps> = ({
  placeholder = 'Message',
  disabled = false,
  value,
  setValue,
  shouldAutoFocus = true,
}) => {
  const element = useRef<HTMLInputElement>(null);
  const classes = classNames(style.input, {
    [style['input-active']]: !disabled,
  });

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
      className={classes}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      data-testid={'messageSendingFormInput'}
    />
  );
};
