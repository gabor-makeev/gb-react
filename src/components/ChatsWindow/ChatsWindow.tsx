import React, { FC, useState } from 'react';
import { ChatList } from 'components/ChatsWindow/components/ChatList/ChatList';
import { ChatAddingForm } from 'components/ChatsWindow/components/ChatAddingForm/ChatAddingForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectChats } from 'store/messages/selectors';
import { addChat, deleteChat } from 'store/messages/slice';
import { MUIStyledChatSectionContainer } from '../MUIStyledComponents/MUIStyledChatSectionContainer';

export const ChatsWindow: FC = () => {
  const [chatAddingFormInputValue, setChatAddingFormInputValue] = useState('');
  const dispatch = useDispatch();
  const chats = useSelector(
    selectChats,
    (prev, next) => prev.length === next.length
  );

  const onAddChat = (
    e: React.FormEvent<HTMLFormElement>,
    inputValue: string
  ) => {
    e.preventDefault();

    if (inputValue) {
      dispatch(addChat({ chatName: inputValue }));
    }

    setChatAddingFormInputValue('');
  };

  return (
    <MUIStyledChatSectionContainer>
      <ChatList
        chats={chats}
        deleteChat={(chatName) => dispatch(deleteChat({ chatName }))}
      />
      <ChatAddingForm
        onAddChat={onAddChat}
        inputValue={chatAddingFormInputValue}
        setInputValue={setChatAddingFormInputValue}
      />
    </MUIStyledChatSectionContainer>
  );
};
