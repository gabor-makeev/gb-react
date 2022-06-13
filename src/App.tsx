import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BasePageTemplate } from 'src/templates/BasePageTemplate/BasePageTemplate';
import { Main } from 'src/pages/Main/Main';
import { Profile } from 'src/pages/Profile/Profile';
import { Messenger } from 'src/pages/Messenger/Messenger';
import { FC, useMemo, useState } from 'react';
import { ChatItem, MessageItem, MessageList } from 'src/default-types';
import { nanoid } from 'nanoid';

export const App: FC = () => {
  const [messeges, setMesseges] = useState<MessageList>({});

  const chats = useMemo(() => {
    return Object.keys(messeges).map((chatName) => ({
      id: nanoid(),
      name: chatName,
    }));
  }, [Object.keys(messeges).length]);

  const addChat = (chat: ChatItem) => {
    setMesseges({
      ...messeges,
      [chat.name]: [],
    });
  };

  const addMessage = (chatId: string, message: MessageItem) => {
    setMesseges({
      ...messeges,
      [chatId]: [...messeges[chatId], message],
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasePageTemplate />}>
          <Route index element={<Main />} />
          <Route path="profile" element={<Profile />} />
          <Route path="messenger">
            <Route
              index
              element={
                <Messenger
                  chats={chats}
                  addChat={addChat}
                  messages={messeges}
                  addMessage={addMessage}
                />
              }
            />
            <Route
              path=":chatId"
              element={
                <Messenger
                  chats={chats}
                  addChat={addChat}
                  messages={messeges}
                  addMessage={addMessage}
                  isMessageSendingActive={true}
                />
              }
            />
          </Route>
        </Route>
        <Route path="*" element={<h2>404</h2>} />
      </Routes>
    </BrowserRouter>
  );
};
