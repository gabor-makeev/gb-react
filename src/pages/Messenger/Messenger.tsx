import style from './Messenger.module.scss';
import { FC, useState } from 'react';

import { MessagesWindow } from 'components/MessagesWindow/MessagesWindow';
import { ChatsWindow } from 'components/Chats/ChatsWindow/ChatsWindow';
import { ChatsAddingForm } from 'components/Chats/ChatsAddingForm/ChatsAddingForm';

export const Messenger: FC = () => {
  const [isChatsAddingFormVisible, setIsChatsAddingFormVisible] =
    useState(false);

  const toggleIsChatsAddingFormVisible = () => {
    setIsChatsAddingFormVisible(!isChatsAddingFormVisible);
  };

  return (
    <div className={style.app}>
      {isChatsAddingFormVisible && (
        <ChatsAddingForm
          toggleIsChatsAddingFormVisible={toggleIsChatsAddingFormVisible}
        />
      )}
      <ChatsWindow
        toggleIsChatsAddingFormVisible={toggleIsChatsAddingFormVisible}
      />
      <MessagesWindow />
    </div>
  );
};
