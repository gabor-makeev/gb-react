import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';
import { FC } from 'react';
import { ChatItem } from 'src/default-types';

interface ChatProps {
  chat: ChatItem;
}

export const Chat: FC<ChatProps> = ({ chat }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemButton>
        <ListItemText primary={chat.name} />
      </ListItemButton>
    </ListItem>
  );
};
