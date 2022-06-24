import { FC } from 'react';
import style from './Button.module.scss';
import MaterialButton from '@mui/material/Button';

interface ButtonProps {
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ disabled = false }) => {
  return (
    <MaterialButton
      className={style.button}
      disabled={disabled}
      type={'submit'}
      data-testid={'messageSendingFormButton'}
    >
      Send
    </MaterialButton>
  );
};
