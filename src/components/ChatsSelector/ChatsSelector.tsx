import { Selector } from './components/Selector/Selector';
import Container from '@mui/material/Container';
import { FC } from 'react';
import { ChatItem } from 'src/default-types';

interface ChatsMenuProps {
  chats: ChatItem[];
}

export const ChatsSelector: FC<ChatsMenuProps> = ({ chats }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Selector chats={chats} />
    </Container>
  );
};
