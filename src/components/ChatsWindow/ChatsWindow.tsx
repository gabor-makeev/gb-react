import React, { FC, useEffect, useState } from 'react';

import { ChatList } from 'components/ChatsWindow/components/ChatList/ChatList';
import { ChatAddingForm } from 'components/ChatsWindow/components/ChatAddingForm/ChatAddingForm';
import { MUIStyledChatSectionContainer } from '../MUIStyledComponents/MUIStyledChatSectionContainer';
import { useDispatch, useSelector } from 'react-redux';
import { addChat, deleteChat, initChatsTracking } from 'store/chats/slice';
import { selectChats } from 'store/chats/selectors';
import { Chat } from 'src/default-types';

export const ChatsWindow: FC = () => {
  const [chatAddingFormInputValue, setChatAddingFormInputValue] = useState('');
  const chats = useSelector(selectChats);

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

  const onDeleteChat = (chat: Chat) => {
    dispatch(deleteChat(chat));
  };

  return (
    <MUIStyledChatSectionContainer>
      <ChatList chats={chats} deleteChat={onDeleteChat} />
      <ChatAddingForm
        onAddChat={onAddChat}
        inputValue={chatAddingFormInputValue}
        setInputValue={setChatAddingFormInputValue}
      />
    </MUIStyledChatSectionContainer>
  );
};
