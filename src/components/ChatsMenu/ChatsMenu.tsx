import { Menu } from './components/Menu/Menu';
import Container from '@mui/material/Container';
import { FC } from 'react';
import { ChatItem } from 'src/default-types';

interface ChatsMenuProps {
  chats: ChatItem[];
}

export const ChatsMenu: FC<ChatsMenuProps> = ({ chats }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Menu chats={chats} />
    </Container>
  );
};
