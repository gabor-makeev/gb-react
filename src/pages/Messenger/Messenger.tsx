import style from './Messenger.module.scss';
import { FC } from 'react';

import { MessagesWindow } from 'components/MessagesWindow/MessagesWindow';
import { Navigate, useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { selectMessages } from '../../store/messages/selectors';
import { ChatsWindow } from 'components/ChatsWindow/ChatsWindow';

export const Messenger: FC = () => {
  const { chatId } = useParams();
  const messages = useSelector(selectMessages, shallowEqual);

  if (chatId && !messages[chatId]) {
    return <Navigate to="/messenger" replace />;
  }

  return (
    <div className={style.app}>
      <ChatsWindow />
      <MessagesWindow messages={chatId ? messages[chatId] : []} />
    </div>
  );
};
