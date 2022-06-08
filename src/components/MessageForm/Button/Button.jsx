import style from './Button.module.scss';
import MaterialButton from '@mui/material/Button';

export const Button = ({ disabled }) => {
  return (
    <MaterialButton
      className={style.button}
      disabled={disabled}
      type={'submit'}
    >
      Send
    </MaterialButton>
  );
};
