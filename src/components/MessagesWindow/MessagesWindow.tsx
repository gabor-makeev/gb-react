import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MUIStyledMessageSectionContainer } from 'components/MUIStyledComponents/MUIStyledMessageSectionContainer';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { getAuth } from 'firebase/auth';
import { getMessagesQueryByChatId } from 'src/services/firebase/messages';
import { onSnapshot, Timestamp } from 'firebase/firestore';
import { FirebaseMessage, Messages } from 'src/default-types';
import { getUserChatByChatId } from 'src/services/firebase/users';
import { sendMessageWithBotReply } from 'store/chats/slice';
import { useDispatch } from 'react-redux';

export const MessagesWindow: FC = () => {
  const [messages, setMessages] = useState<Messages>([]);
  const [messageSendingFormInputValue, setMessageSendingFormInputValue] =
    useState('');

  const user = getAuth().currentUser;
  const userName = user?.displayName ? user.displayName : 'Unknown user';

  const { chatId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (chatId) {
      const unsubscribe = onSnapshot(
        getMessagesQueryByChatId(chatId),
        (querySnapshot) => {
          const messages: Messages = [];
          querySnapshot.forEach((message) => {
            const firebaseMessage = message.data() as FirebaseMessage;
            messages.push(Object.assign(firebaseMessage, { id: message.id }));
          });

          setMessages(messages);
        }
      );

      return unsubscribe;
    }
  }, [chatId]);

  if (user?.email && chatId) {
    getUserChatByChatId(user.email, chatId).then((data) => {
      if (!data) {
        navigate('/messenger', { replace: true });
      }
    });
  }

  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chatId && user?.email) {
      dispatch(
        sendMessageWithBotReply({
          createdAt: Timestamp.now().toMillis(),
          body: messageSendingFormInputValue,
          chatId: chatId,
          userEmail: user.email,
        })
      );
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
