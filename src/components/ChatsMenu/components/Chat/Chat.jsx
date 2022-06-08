import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemButton } from '@mui/material';

export const Chat = ({ chat }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemButton>
        <ListItemText primary={chat.name} />
      </ListItemButton>
    </ListItem>
  );
};
