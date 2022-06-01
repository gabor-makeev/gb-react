import style from './App.module.scss';
import { useState } from 'react';

import { MessageBox } from './components/MessageBox/MessageBox';

function App() {
  const [messageList] = useState([]);

  return (
    <div className={style.App}>
      <MessageBox messageList={messageList} />
    </div>
  );
}

export default App;
