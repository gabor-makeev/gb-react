import style from './ChatList.module.scss';
import { ChatItem } from './components/ChatItem/ChatItem';
import { FC } from 'react';
import { IFirebaseUserChat } from 'src/default-types';

interface ChatListProps {
  chats: IFirebaseUserChat[];
  deleteChat: (chat: IFirebaseUserChat) => void;
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
