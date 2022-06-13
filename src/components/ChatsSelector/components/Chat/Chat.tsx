import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FC } from 'react';
import { ChatItem } from 'src/default-types';
import { Link } from 'react-router-dom';

interface ChatProps {
  chat: ChatItem;
}

export const Chat: FC<ChatProps> = ({ chat }) => {
  return (
    <ListItem alignItems="flex-start">
      <Link to={`/messenger/${chat.name}`}>
        <ListItemText primary={chat.name} />
      </Link>
    </ListItem>
  );
};
