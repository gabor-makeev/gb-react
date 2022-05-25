import './App.css';
import {Message} from "./components/Message";

function App() {
  const messageContent = 'The content of a message'

  return (
    <div className="App">
      <Message content={messageContent} />
    </div>
  );
}

export default App;
