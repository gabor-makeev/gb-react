import React, { FC, useEffect, useState } from 'react';
import style from './MessagesWindow.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { Messages } from 'src/default-types';
import {
  addMessage,
  createFirebaseMessageObject,
} from 'src/services/firebase/messages';
import classNames from 'classnames';
import { MessagesWindowHeader } from 'components/MessagesWindow/components/MessagesWindowHeader/MessagesWindowHeader';
import { UserRepository } from 'src/services/firebase/Repository/UserRepository/UserRepository';
import {
  MessageRepository,
  FirebaseMessageType,
} from 'src/services/firebase/Repository/MessageRepository/MessageRepository';

export const MessagesWindow: FC = () => {
  const [messages, setMessages] = useState<Messages>([]);
  const [userName, setUserName] = useState('');
  const [chatName, setChatName] = useState('');
  const [messageSendingFormInputValue, setMessageSendingFormInputValue] =
    useState('');

  const { chatId } = useParams();
  const navigate = useNavigate();
  const userEmail = getAuth().currentUser?.email as string;

  const messagesWindowClasslist = classNames(style['messages-window'], {
    [style['active-messaging__messages-window']]: !!chatId,
  });

  useEffect(() => {
    UserRepository.getUser(userEmail).then((data) => {
      setUserName(data?.name);
    });
  }, []);

  useEffect(() => {
    if (chatId) {
      UserRepository.getUser(userEmail).then(async (userData) => {
        const [chat] = userData.chats.filter((chat) => chat.id === chatId);

        if (chat) {
          setChatName(chat.name);
          return MessageRepository.subscribeToMessagesByProperty(
            FirebaseMessageType.chatId,
            chat.id,
            setMessages
          );
        }
      });
    }
  }, [chatId, chatName, userEmail]);

  if (chatId) {
    UserRepository.getUser(userEmail).then((userData) => {
      const [chat] = userData.chats.filter((chat) => chat.id === chatId);
      if (!chat) {
        navigate('/messenger', { replace: true });
      }
    });
  }

  const onSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chatId) {
      setMessageSendingFormInputValue('');

      await addMessage(
        createFirebaseMessageObject(
          chatId,
          messageSendingFormInputValue,
          userName
        )
      );
    }
  };

  return (
    <div className={messagesWindowClasslist}>
      <div className={style['messages-window__container']}>
        {chatName && <MessagesWindowHeader chatName={chatName} />}
        <MessageList
          messages={messages ? messages : []}
          userEmail={userEmail}
        />
        <MessageSendingForm
          isInputDisabled={!chatId}
          onSendMessage={onSendMessage}
          inputValue={messageSendingFormInputValue}
          setInputValue={setMessageSendingFormInputValue}
        />
      </div>
    </div>
  );
};
