import { FC } from 'react';
import style from './Button.module.scss';

interface ButtonProps {
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ disabled = false }) => {
  return (
    <button
      className={style.button}
      disabled={disabled}
      type={'submit'}
      data-testid={'messageSendingFormButton'}
    >
      Send
    </button>
  );
};
