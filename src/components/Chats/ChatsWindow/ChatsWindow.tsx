import React, { FC, useEffect } from 'react';
import style from './ChatsWindow.module.scss';
import { ChatList } from 'components/Chats/ChatsWindow/components/ChatList/ChatList';
import { useDispatch, useSelector } from 'react-redux';
import { initChatsTracking } from 'store/chats/slice';
import { selectChats } from 'store/chats/selectors';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { getAuth } from 'firebase/auth';
import { UserService } from 'src/services/firebase/Service/UserService';
import { BASE_URL } from 'src/constants';
import { IFirebaseUserChat } from 'src/default-types';

interface ChatsWindowProps {
  toggleIsChatsAddingFormVisible: () => void;
}

export const ChatsWindow: FC<ChatsWindowProps> = ({
  toggleIsChatsAddingFormVisible,
}) => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const chats = useSelector(selectChats);
  const containerClasslist = classNames(style.container, {
    [style['active-messaging__container']]: !!chatId,
  });

  const onDeleteChat = (chat: IFirebaseUserChat) => {
    const userEmail = getAuth().currentUser?.email as string;
    UserService.removeChat(userEmail, chat);
    if (chat.id === chatId) {
      navigate(`${BASE_URL}messenger`, { replace: true });
    }
  };

  useEffect(() => {
    return dispatch(initChatsTracking());
  }, []);

  return (
    <div className={containerClasslist}>
      <h2 className={style.title}>Contacts</h2>
      <ChatList chats={chats} deleteChat={onDeleteChat} />
      <button className={style.button} onClick={toggleIsChatsAddingFormVisible}>
        Add contact
      </button>
    </div>
  );
};
