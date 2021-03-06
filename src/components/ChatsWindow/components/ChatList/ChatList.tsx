import { ChatItem } from './components/ChatItem/ChatItem';
import List from '@mui/material/List';
import { FC } from 'react';
import { Chat, Chats } from 'src/default-types';

interface ChatListProps {
  chats: Chats;
  deleteChat: (chat: Chat) => void;
}

export const ChatList: FC<ChatListProps> = ({ chats, deleteChat }) => {
  return (
    <List
      sx={{
        width: '300px',
        flex: '0 1 300px',
        maxWidth: 360,
        bgcolor: 'background.paper',
        padding: '25px',
      }}
    >
      {chats.map((chat) => (
        <ChatItem
          chat={chat}
          key={chat.id}
          deleteChat={() => deleteChat(chat)}
        />
      ))}
    </List>
  );
};
