import style from './Messenger.module.scss';
import { FC } from 'react';

import { MessagesWindow } from 'components/MessagesWindow/MessagesWindow';
import { ChatsWindow } from 'components/ChatsWindow/ChatsWindow';

export const Messenger: FC = () => {
  return (
    <div className={style.app}>
      <ChatsWindow />
      <MessagesWindow />
    </div>
  );
};
