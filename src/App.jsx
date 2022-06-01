import style from './App.module.scss';
import { useState } from 'react';

import { MessageBox } from './components/MessageBox/MessageBox';
import { MessageForm } from './components/MessageForm/MessageForm';

function App() {
  const [messageList, setMessageList] = useState([]);

  const pushMessage = (message) => {
    setMessageList([...messageList, message]);
  };

  return (
    <div className={style.App}>
      <MessageBox messageList={messageList} />
      <MessageForm pushMessage={pushMessage} />
    </div>
  );
}

export default App;
