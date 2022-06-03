import style from './MessageBox.module.scss';

export const MessageBox = ({ messageList }) => {
  return (
    <div className={style['message-box']}>
      <ul className={style['message-box__list']}>
        {messageList.map((message, idx) => (
          <li className={style['message-box__item']} key={idx}>
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
