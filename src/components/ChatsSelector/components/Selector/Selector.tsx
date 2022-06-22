import { Chat } from '../Chat/Chat';
import List from '@mui/material/List';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChats } from '../../../../store/messages/selectors';
import { deleteChat } from '../../../../store/messages/actions';

export const Selector: FC = () => {
  const dispatch = useDispatch();
  const chats = useSelector(
    selectChats,
    (prev, next) => prev.length === next.length
  );

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {chats.map((chat) => (
        <Chat
          chatName={chat.name}
          key={chat.id}
          deleteChat={(chatName: string) => dispatch(deleteChat(chatName))}
        />
      ))}
    </List>
  );
};
