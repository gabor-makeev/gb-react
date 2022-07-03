import { ChatItem } from './components/ChatItem/ChatItem';
import List from '@mui/material/List';
import { FC } from 'react';
import { Chat } from 'src/default-types';

interface ChatListProps {
  chats: Chat[];
  deleteChat: (chatId: string) => void;
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
          chatName={chat.name}
          key={chat.id}
          deleteChat={() => deleteChat(chat.name)}
        />
      ))}
    </List>
  );
};
