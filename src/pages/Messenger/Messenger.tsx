import style from './Messenger.module.scss';
import { FC } from 'react';

import { MessagesWindow } from 'components/MessagesWindow/MessagesWindow';
import { Navigate, useParams } from 'react-router-dom';
import { ChatsWindow } from 'components/ChatsWindow/ChatsWindow';
import { getMessagesByChatName } from 'src/services/firebase';

interface MessengerProps {
  userName: string;
}

export const Messenger: FC<MessengerProps> = ({ userName }) => {
  const { chatId } = useParams();

  if (chatId && !getMessagesByChatName(chatId)) {
    return <Navigate to="/messenger" replace />;
  }

  return (
    <div className={style.app}>
      <ChatsWindow />
      <MessagesWindow userName={userName} />
    </div>
  );
};
