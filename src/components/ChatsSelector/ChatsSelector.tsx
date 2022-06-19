import { Selector } from './components/Selector/Selector';
import Container from '@mui/material/Container';
import { FC } from 'react';
import { ChatAddingForm } from 'components/ChatsSelector/components/ChatAddingForm/ChatAddingForm';

export const ChatsSelector: FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
      }}
    >
      <Selector />
      <ChatAddingForm />
    </Container>
  );
};
