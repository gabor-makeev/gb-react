import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MUIStyledMessageSectionContainer } from 'components/MUIStyledComponents/MUIStyledMessageSectionContainer';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { getAuth } from 'firebase/auth';
import {
  createFirebaseMessageObject,
  subscribeToMessagesByChatId,
} from 'src/services/firebase/messages';
import { Messages } from 'src/default-types';
import {
  getUserChatByChatId,
  getUserProperties,
} from 'src/services/firebase/users';
import { sendMessageWithBotReply } from 'store/chats/slice';
import { useDispatch } from 'react-redux';

export const MessagesWindow: FC = () => {
  const [messages, setMessages] = useState<Messages>([]);
  const [userName, setUserName] = useState<string>('');
  const [messageSendingFormInputValue, setMessageSendingFormInputValue] =
    useState('');

  const userEmail = getAuth().currentUser?.email as string;
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUserProperties(userEmail).then((data) => {
      setUserName(data?.name);
    });
  }, []);

  useEffect(() => {
    if (chatId) {
      return subscribeToMessagesByChatId(chatId, setMessages);
    }
  }, [chatId]);

  if (chatId) {
    getUserChatByChatId(userEmail, chatId).then((data?) => {
      if (!data) {
        navigate('/messenger', { replace: true });
      }
    });
  }

  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chatId) {
      dispatch(
        sendMessageWithBotReply(
          createFirebaseMessageObject(chatId, messageSendingFormInputValue)
        )
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
