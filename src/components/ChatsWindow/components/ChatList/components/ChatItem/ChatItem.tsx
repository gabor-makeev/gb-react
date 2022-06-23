import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface ChatItemProps {
  chatName: string;
  deleteChat: (chatName: string) => void;
}

export const ChatItem: FC<ChatItemProps> = ({ chatName, deleteChat }) => {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <Link to={`/messenger/${chatName}`}>
        <ListItemText primary={chatName} />
      </Link>
      <button onClick={() => deleteChat(chatName)}>x</button>
    </ListItem>
  );
};
