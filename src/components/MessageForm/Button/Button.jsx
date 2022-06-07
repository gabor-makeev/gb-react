import style from './Button.module.scss';

export const Button = ({ disabled }) => {
  return (
    <button className={style.button} disabled={disabled}>
      Send
    </button>
  );
};
