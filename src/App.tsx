import style from './App.module.scss';
import { AUTHORS, DUMMY_CHATS } from './constants';
import { FC, useEffect, useState } from 'react';

import { MessageSendingForm } from 'components/MessageSendingForm/MessageSendingForm';
import { ChatsSelector } from 'components/ChatsSelector/ChatsSelector';
import { Container } from '@mui/material';
import { MessageSectionContainer } from 'components/StyledMUIComponents/MessageSectionContainer';
import { MessageItem } from './default-types';
import { MessagesWindow } from 'components/MessagesWindow/MessagesWindow';

export const App: FC = () => {
  const [messageList, setMessageList] = useState<MessageItem[]>([]);

  useEffect(() => {
    if (
      messageList.length > 0 &&
      messageList[messageList.length - 1].author === AUTHORS.user
    ) {
      const timeout = setTimeout(() => {
        setMessageList([
          ...messageList,
          {
            text: 'robot responses ',
            author: AUTHORS.bot,
          },
        ]);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [messageList, setMessageList]);

  return (
    <div className={style.app}>
      <Container>
        <ChatsSelector chats={DUMMY_CHATS} />
      </Container>
      <MessageSectionContainer>
        <MessagesWindow messages={messageList} />
        <MessageSendingForm
          setMessageList={setMessageList}
          messageList={messageList}
        />
      </MessageSectionContainer>
    </div>
  );
};
