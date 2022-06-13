import { Chat } from '../Chat/Chat';
import List from '@mui/material/List';
import { ChatItem } from 'src/default-types';
import { FC } from 'react';

interface MenuProps {
  chats: ChatItem[];
  deleteChat: (chat: ChatItem) => void;
}

export const Selector: FC<MenuProps> = ({ chats, deleteChat }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {chats.map((chat) => (
        <Chat chat={chat} key={chat.id} deleteChat={deleteChat} />
      ))}
    </List>
  );
};
