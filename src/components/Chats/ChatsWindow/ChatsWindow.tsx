import React, { FC, useEffect } from 'react';
import style from './ChatsWindow.module.scss';
import { ChatList } from 'components/Chats/ChatsWindow/components/ChatList/ChatList';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChat, initChatsTracking } from 'store/chats/slice';
import { selectChats } from 'store/chats/selectors';
import { Chat } from 'src/default-types';

interface ChatsWindowProps {
  toggleIsChatsAddingFormVisible: () => void;
}

export const ChatsWindow: FC<ChatsWindowProps> = ({
  toggleIsChatsAddingFormVisible,
}) => {
  const chats = useSelector(selectChats);

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(initChatsTracking());
  }, []);

  const onDeleteChat = (chat: Chat) => {
    dispatch(deleteChat(chat));
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Contacts</h2>
      <ChatList chats={chats} deleteChat={onDeleteChat} />
      <button className={style.button} onClick={toggleIsChatsAddingFormVisible}>
        Add contact
      </button>
    </div>
  );
};
