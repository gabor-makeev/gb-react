import style from './Message.module.scss';
import { STYLES } from '../../../../constants';

export const Message = ({
  message,
  messageStyle = {
    backgroundColor: STYLES.color.secondary,
  },
}) => {
  return (
    <li className={style.message} style={messageStyle}>
      {message.text}
      <span className={style['message__author-sign']}>{message.author}</span>
    </li>
  );
};
