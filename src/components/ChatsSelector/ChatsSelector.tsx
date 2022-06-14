import { Selector } from './components/Selector/Selector';
import Container from '@mui/material/Container';
import { FC } from 'react';
import { ChatItem } from 'src/default-types';
import { ChatAddingForm } from 'components/ChatsSelector/components/ChatAddingForm/ChatAddingForm';

interface ChatsMenuProps {
  chats: ChatItem[];
  addChat: (chat: ChatItem) => void;
  deleteChat: (chat: ChatItem) => void;
}

export const ChatsSelector: FC<ChatsMenuProps> = ({
  chats,
  addChat,
  deleteChat,
}) => {
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
      <Selector chats={chats} deleteChat={deleteChat} />
      <ChatAddingForm addChat={addChat} />
    </Container>
  );
};
