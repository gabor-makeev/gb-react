import style from './App.module.scss';
import { AUTHORS } from './constants';
import { useEffect, useState } from 'react';

import { MessageBox } from './components/MessageBox/MessageBox';
import { MessageForm } from './components/MessageForm/MessageForm';
import { Container } from '@mui/material';

export const App = () => {
  const [messageList, setMessageList] = useState([]);

  const pushMessage = (message) => {
    setMessageList([...messageList, message]);
  };

  useEffect(() => {
    if (
      messageList.length > 0 &&
      messageList[messageList.length - 1].author === AUTHORS.user
    ) {
      const timeout = setTimeout(() => {
        pushMessage({
          text: 'robot responses ',
          author: AUTHORS.bot,
        });
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [messageList, pushMessage]);

  const appStyle = {
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    margin: '0',
    width: '100%',
  };

  return (
    <div className={style.App}>
      <Container sx={appStyle}>
        <MessageBox messages={messageList} />
        <MessageForm pushMessage={pushMessage} />
      </Container>
    </div>
  );
};
