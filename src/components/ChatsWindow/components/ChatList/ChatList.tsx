import { ChatItem } from './components/ChatItem/ChatItem';
import List from '@mui/material/List';
import { FC } from 'react';

interface ChatListProps {
  chats: string[];
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
          chatName={chat}
          key={chat}
          deleteChat={() => deleteChat(chat)}
        />
      ))}
    </List>
  );
};
