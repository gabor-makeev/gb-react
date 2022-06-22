import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ChatProps {
  chatName: string;
  deleteChat: (chatName: string) => void;
}

export const Chat: FC<ChatProps> = ({ chatName, deleteChat }) => {
  return (
    <ListItem alignItems="flex-start">
      <Link to={`/messenger/${chatName}`}>
        <ListItemText primary={chatName} />
      </Link>
      <button onClick={() => deleteChat(chatName)}>x</button>
    </ListItem>
  );
};
