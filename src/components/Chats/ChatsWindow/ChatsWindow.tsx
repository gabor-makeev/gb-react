import React, { FC, useEffect } from 'react';

import { ChatList } from 'components/Chats/ChatsWindow/components/ChatList/ChatList';
import { MUIStyledChatSectionContainer } from '../../MUIStyledComponents/MUIStyledChatSectionContainer';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChat, initChatsTracking } from 'store/chats/slice';
import { selectChats } from 'store/chats/selectors';
import { Chat } from 'src/default-types';
import { Button } from '@mui/material';

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
    <MUIStyledChatSectionContainer>
      <ChatList chats={chats} deleteChat={onDeleteChat} />
      <Button onClick={toggleIsChatsAddingFormVisible}>Add contact</Button>
    </MUIStyledChatSectionContainer>
  );
};
