import style from './App.module.scss';
import { AUTHORS } from './constants';
import { useEffect, useState } from 'react';

import { MessageBox } from './components/MessageBox/MessageBox';
import { MessageForm } from './components/MessageForm/MessageForm';

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

  return (
    <div className={style.App}>
      <MessageBox messageList={messageList} />
      <MessageForm pushMessage={pushMessage} />
    </div>
  );
};
