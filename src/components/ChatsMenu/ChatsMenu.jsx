import { Menu } from './components/Menu/Menu';
import Container from '@mui/material/Container';

export const ChatsMenu = ({ chats }) => {
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
