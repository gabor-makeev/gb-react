import style from './App.module.scss'
import {Message} from "./components/Message/Message"

function App() {
  const messageContent = 'The content of a message'

  return (
    <div className={style.App}>
      <Message content={messageContent} />
    </div>
  );
}

export default App
