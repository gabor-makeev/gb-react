import style from './Messenger.module.scss';
import { FC } from 'react';

import { MessagesWindow } from 'components/MessagesWindow/MessagesWindow';
import { Navigate, useParams } from 'react-router-dom';
import { ChatsWindow } from 'components/ChatsWindow/ChatsWindow';
import { getMessagesByChatName } from 'src/services/firebase';

export const Messenger: FC = () => {
  const { chatId } = useParams();

  if (chatId && !getMessagesByChatName(chatId)) {
    return <Navigate to="/messenger" replace />;
  }

  return (
    <div className={style.app}>
      <ChatsWindow />
      <MessagesWindow />
    </div>
  );
};
