import style from './App.module.scss';
import { AUTHORS, DUMMY_CHATS } from './constants';
import { FC, useEffect, useState } from 'react';

import { MessageBox } from 'components/MessageBox/MessageBox';
import { MessageForm } from 'components/MessageForm/MessageForm';
import { ChatsMenu } from 'components/ChatsMenu/ChatsMenu';
import { Container } from '@mui/material';
import { MessageContainer } from 'components/StyledMUIComponents/MessageContainer';
import { MessageItem } from './default-types';

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
        <ChatsMenu chats={DUMMY_CHATS} />
      </Container>
      <MessageContainer>
        <MessageBox messages={messageList} />
        <MessageForm
          setMessageList={setMessageList}
          messageList={messageList}
        />
      </MessageContainer>
    </div>
  );
};
