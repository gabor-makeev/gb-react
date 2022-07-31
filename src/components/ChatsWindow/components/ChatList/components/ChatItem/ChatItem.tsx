import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Chat } from 'src/default-types';

interface ChatItemProps {
  chat: Chat;
  deleteChat: () => void;
}

export const ChatItem: FC<ChatItemProps> = ({ chat, deleteChat }) => {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Link to={`/messenger/${chat.id}`}>
        <ListItemText primary={chat.name} />
      </Link>
      <button onClick={deleteChat}>x</button>
    </ListItem>
  );
};
