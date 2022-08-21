import style from './ChatList.module.scss';
import { ChatItem } from './components/ChatItem/ChatItem';
import { FC } from 'react';
import { Chat, Chats } from 'src/default-types';

interface ChatListProps {
  chats: Chats;
  deleteChat: (chat: Chat) => void;
}

export const ChatList: FC<ChatListProps> = ({ chats, deleteChat }) => {
  return (
    <ul className={style.list}>
      {chats.map((chat) => (
        <ChatItem
          chat={chat}
          key={chat.id}
          deleteChat={() => deleteChat(chat)}
        />
      ))}
    </ul>
  );
};
