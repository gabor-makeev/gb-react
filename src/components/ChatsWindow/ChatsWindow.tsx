import React, { FC, useEffect, useState } from 'react';
import { onValue, set, remove } from 'firebase/database';
import { chatsRef, getChatRefById } from 'src/services/firebase';
import { Chat, FirebaseChats } from 'src/default-types';
import { nanoid } from 'nanoid';

import { ChatList } from 'components/ChatsWindow/components/ChatList/ChatList';
import { ChatAddingForm } from 'components/ChatsWindow/components/ChatAddingForm/ChatAddingForm';
import { MUIStyledChatSectionContainer } from '../MUIStyledComponents/MUIStyledChatSectionContainer';

export const ChatsWindow: FC = () => {
  const [chatAddingFormInputValue, setChatAddingFormInputValue] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);

  const setFirebaseChats = (
    prevFirebaseChats: FirebaseChats,
    newChatName: string
  ) => {
    set(chatsRef, {
      ...prevFirebaseChats,
      [newChatName]: {
        createdAt: Date.now(),
      },
    });
  };

  const getFirebaseChatsObjectFromChats = (): FirebaseChats => {
    const firebaseChatsObject: FirebaseChats = {};

    chats.forEach((chat) => {
      firebaseChatsObject[chat.name] = {
        createdAt: chat.id,
      };
      if (chat.messages) {
        firebaseChatsObject[chat.name].messages = chat.messages;
      }
    });

    return firebaseChatsObject;
  };

  useEffect(() => {
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      if (snapshot.val()) {
        const firebaseChatsData = Object.entries(snapshot.val());

        const chatsArray = firebaseChatsData.map((chat: any) => ({
          name: chat[0],
          messages: chat[1].messages,
          id: nanoid(),
        }));

        setChats(chatsArray);
      } else {
        setChats([]);
      }
    });

    return unsubscribe;
  }, []);

  const onAddChat = (
    e: React.FormEvent<HTMLFormElement>,
    inputValue: string
  ) => {
    e.preventDefault();

    if (inputValue) {
      setFirebaseChats(getFirebaseChatsObjectFromChats(), inputValue);
    }

    setChatAddingFormInputValue('');
  };

  const onDeleteChat = (chatName: string) => {
    remove(getChatRefById(chatName));
  };

  return (
    <MUIStyledChatSectionContainer>
      <ChatList chats={chats} deleteChat={(chatId) => onDeleteChat(chatId)} />
      <ChatAddingForm
        onAddChat={onAddChat}
        inputValue={chatAddingFormInputValue}
        setInputValue={setChatAddingFormInputValue}
      />
    </MUIStyledChatSectionContainer>
  );
};
