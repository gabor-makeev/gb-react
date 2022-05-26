import style from './App.module.scss'
import {Message} from "./components/Message/Message"
import {ContactList} from "./components/ContactList/ContactList";
import {Header} from "./components/Header/Header";

function App() {
  const messageContent = 'The content of a message'
  const contacts = [
    'John',
    'Sam',
    'Carl',
    'Lisa'
  ]

  return (
    <div className={style.App}>
      <Header />
      <Message content={messageContent} />
      <ContactList contacts={contacts}/>
    </div>
  );
}

export default App
