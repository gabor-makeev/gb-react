import style from './MessageBox.module.scss';
import { STYLES } from '../../constants';

export const MessageBox = ({
  messageList,
  primaryColor = STYLES.color.primary,
  secondaryColor = STYLES.color.secondary,
}) => {
  const messageBoxStyle = {
    backgroundColor: primaryColor,
  };

  const messageBoxItemStyle = {
    backgroundColor: secondaryColor,
  };

  return (
    <div className={style['message-box']} style={messageBoxStyle}>
      <ul className={style['message-box__list']}>
        {messageList.map((message, idx) => (
          <li
            className={style['message-box__item']}
            key={idx}
            style={messageBoxItemStyle}
          >
            {message.text}
            <span className={style['message-box__item__author']}>
              {message.author}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
