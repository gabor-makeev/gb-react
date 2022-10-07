import React, { FC, useEffect, useState } from 'react';
import style from './MessagesWindow.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { Messages } from 'src/default-types';
import { getUserChatByChatId } from 'src/services/firebase/users';
import {
  addMessage,
  createFirebaseMessageObject,
  subscribeToMessagesByChatId,
} from 'src/services/firebase/messages';
import classNames from 'classnames';
import { MessagesWindowHeader } from 'components/MessagesWindow/components/MessagesWindowHeader/MessagesWindowHeader';
import { UserRepository } from 'src/services/firebase/UserRepository/UserRepository';

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
      getUserChatByChatId(userEmail, chatId).then((data) => {
        setChatName(data ? data.name : chatName);
      });

      return subscribeToMessagesByChatId(chatId, setMessages);
    }
  }, [chatId, chatName, userEmail]);

  if (chatId) {
    getUserChatByChatId(userEmail, chatId).then((data?) => {
      if (!data) {
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
