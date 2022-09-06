import { FC } from 'react';
import style from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ disabled = false }) => {
  const classes = classNames(style.button, {
    [style['button-active']]: !disabled,
  });

  return (
    <button
      className={classes}
      disabled={disabled}
      type={'submit'}
      data-testid={'messageSendingFormButton'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    </button>
  );
};
