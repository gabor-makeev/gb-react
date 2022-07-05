import React, { FC, useEffect, useState } from 'react';
import { MUIStyledMessageSectionContainer } from 'components/MUIStyledComponents/MUIStyledMessageSectionContainer';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { useParams } from 'react-router-dom';
import { onValue, push } from 'firebase/database';
import { getMessagesByChatName } from 'src/services/firebase';
import { Message } from 'src/default-types';

interface MessagesWindowProps {
  userName: string;
}

export const MessagesWindow: FC<MessagesWindowProps> = ({ userName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageSendingFormInputValue, setMessageSendingFormInputValue] =
    useState('');
  const { chatId } = useParams();

  useEffect(() => {
    if (chatId) {
      const unsubscribe = onValue(getMessagesByChatName(chatId), (snapshot) => {
        if (snapshot.val()) {
          const firebaseMessagesData = Object.entries(snapshot.val());

          const messagesArray = firebaseMessagesData.map((message: any) => ({
            id: message[0],
            text: message[1].text,
            author: message[1].author,
          }));

          setMessages(messagesArray);
        } else {
          setMessages([]);
        }
      });

      return unsubscribe;
    }
  }, [chatId]);

  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chatId) {
      push(getMessagesByChatName(chatId), {
        text: messageSendingFormInputValue,
        author: userName,
      });
    }

    setMessageSendingFormInputValue('');
  };

  return (
    <MUIStyledMessageSectionContainer>
      <MessageList messages={messages} userName={userName} />
      <MessageSendingForm
        isInputDisabled={!chatId}
        onSendMessage={onSendMessage}
        inputValue={messageSendingFormInputValue}
        setInputValue={setMessageSendingFormInputValue}
      />
    </MUIStyledMessageSectionContainer>
  );
};
