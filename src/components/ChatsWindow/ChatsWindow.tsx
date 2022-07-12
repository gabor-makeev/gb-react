import React, { FC, useEffect, useState } from 'react';
import { remove } from 'firebase/database';
import { getChatRefById } from 'src/services/firebase';

import { ChatList } from 'components/ChatsWindow/components/ChatList/ChatList';
import { ChatAddingForm } from 'components/ChatsWindow/components/ChatAddingForm/ChatAddingForm';
import { MUIStyledChatSectionContainer } from '../MUIStyledComponents/MUIStyledChatSectionContainer';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat, initChatsTracking } from 'store/chats/slice';
import { selectChats } from 'store/chats/selectors';

export const ChatsWindow: FC = () => {
  const [chatAddingFormInputValue, setChatAddingFormInputValue] = useState('');
  const chats = Object.keys(useSelector(selectChats));

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(initChatsTracking());
  }, []);

  const onAddChat = (
    e: React.FormEvent<HTMLFormElement>,
    inputValue: string
  ) => {
    e.preventDefault();

    if (inputValue) {
      dispatch(addChat(inputValue));
    }

    setChatAddingFormInputValue('');
  };

  const onDeleteChat = (chatName: string) => {
    dispatch(deleteChat(chatName));
  };

  return (
    <MUIStyledChatSectionContainer>
      <ChatList chats={chats} deleteChat={(chatId) => onDeleteChat(chatId)} />
      <ChatAddingForm
        onAddChat={onAddChat}
        inputValue={chatAddingFormInputValue}
        setInputValue={setChatAddingFormInputValue}
      />
    </MUIStyledChatSectionContainer>
  );
};
