import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MUIStyledMessageSectionContainer } from 'components/MUIStyledComponents/MUIStyledMessageSectionContainer';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { getAuth } from 'firebase/auth';
import { addMessage, getMessagesQueryByChatId } from 'src/services/messages';
import { onSnapshot, Timestamp } from 'firebase/firestore';
import { FirebaseMessage, Messages } from 'src/default-types';

export const MessagesWindow: FC = () => {
  const [messages, setMessages] = useState<Messages>([]);
  const [messageSendingFormInputValue, setMessageSendingFormInputValue] =
    useState('');

  const user = getAuth().currentUser;
  const userName = user?.displayName ? user.displayName : 'Unknown user';

  const { chatId } = useParams();

  useEffect(() => {
    if (chatId) {
      onSnapshot(getMessagesQueryByChatId(chatId), (querySnapshot) => {
        const messages: Messages = [];
        querySnapshot.forEach((message) => {
          const firebaseMessage = message.data() as FirebaseMessage;
          messages.push(Object.assign(firebaseMessage, { id: message.id }));
        });

        setMessages(messages);
      });
    }
  }, [chatId]);

  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chatId && user?.email) {
      addMessage({
        createdAt: Timestamp.now().toMillis(),
        body: messageSendingFormInputValue,
        chatId: chatId,
        userEmail: user.email,
      });
    }

    setMessageSendingFormInputValue('');
  };

  return (
    <MUIStyledMessageSectionContainer>
      <MessageList messages={messages ? messages : []} userName={userName} />
      <MessageSendingForm
        isInputDisabled={!chatId}
        onSendMessage={onSendMessage}
        inputValue={messageSendingFormInputValue}
        setInputValue={setMessageSendingFormInputValue}
      />
    </MUIStyledMessageSectionContainer>
  );
};
