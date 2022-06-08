import { Chat } from '../Chat/Chat';
import List from '@mui/material/List';

export const Menu = ({ chats }) => {
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {chats.map((chat) => (
        <Chat chat={chat} key={chat.id} />
      ))}
    </List>
  );
};
