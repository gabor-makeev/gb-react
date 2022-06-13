import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FC } from 'react';
import { ChatItem } from 'src/default-types';
import { Link } from 'react-router-dom';

interface ChatProps {
  chat: ChatItem;
  deleteChat: (chat: ChatItem) => void;
}

export const Chat: FC<ChatProps> = ({ chat, deleteChat }) => {
  return (
    <ListItem alignItems="flex-start">
      <Link to={`/messenger/${chat.name}`}>
        <ListItemText primary={chat.name} />
      </Link>
      <button onClick={() => deleteChat(chat)}>x</button>
    </ListItem>
  );
};
