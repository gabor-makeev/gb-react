import { FC, useEffect, useState } from 'react';
import style from './ChatItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { EFirebaseUserProperty, IFirebaseUserChat } from 'src/default-types';
import { BASE_URL } from 'src/constants';
import { UserRepository } from 'src/services/firebase/Repository/UserRepository';
import { setActiveChatName } from 'store/chats/slice';
import { useDispatch } from 'react-redux';

interface ChatItemProps {
  chat: IFirebaseUserChat;
  deleteChat: () => void;
}

export const ChatItem: FC<ChatItemProps> = ({ chat, deleteChat }) => {
  const [toUserName, setToUserName] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return UserRepository.subscribeToUser(chat.toUserEmail, (userData) => {
      setToUserName(userData[EFirebaseUserProperty.name]);
    });
  }, []);

  const handleOnClick = () => {
    dispatch(setActiveChatName(toUserName));
    navigate(`${BASE_URL}messenger/${chat.id}`, { replace: true });
  };

  return (
    <div className={style['contact-card']}>
      <button
        className={style['contact-card__link']}
        onClick={() => handleOnClick()}
      >
        <div className={style['contact-card__link__user-icon']}>
          {toUserName[0]}
        </div>
        <span className={style['contact-card__link__user-name']}>
          {toUserName}
        </span>
      </button>
      <button
        className={style['contact-card__delete-button']}
        onClick={deleteChat}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 4.3276C10 4.1726 10.214 3.9996 10.5 3.9996H13.5C13.786 3.9996 14 4.1726 14 4.3276V5.9996H10V4.3276ZM21 5.9996H20H16V4.3276C16 3.0436 14.879 1.9996 13.5 1.9996H10.5C9.121 1.9996 8 3.0436 8 4.3276V5.9996H4H3C2.45 5.9996 2 6.4506 2 6.9996C2 7.5496 2.45 7.9996 3 7.9996H4V18.9996C4 20.6546 5.346 21.9996 7 21.9996H17C18.654 21.9996 20 20.6546 20 18.9996V7.9996H21C21.55 7.9996 22 7.5496 22 6.9996C22 6.4506 21.55 5.9996 21 5.9996Z"
          />
        </svg>
      </button>
    </div>
  );
};
