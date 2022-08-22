import React, { FC, useEffect, useState } from 'react';
import style from './MessagesWindow.module.scss';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { Messages } from 'src/default-types';
import {
  getUserChatByChatId,
  getUserProperties,
} from 'src/services/firebase/users';
import {
  addMessage,
  createFirebaseMessageObject,
  subscribeToMessagesByChatId,
} from 'src/services/firebase/messages';
import classNames from 'classnames';

export const MessagesWindow: FC = () => {
  const [messages, setMessages] = useState<Messages>([]);
  const [userName, setUserName] = useState<string>('');
  const [messageSendingFormInputValue, setMessageSendingFormInputValue] =
    useState('');

  const { chatId } = useParams();
  const navigate = useNavigate();
  const userEmail = getAuth().currentUser?.email as string;

  const messagesWindowClasslist = classNames(style['messages-window'], {
    [style['active-messaging__messages-window']]: !!chatId,
  });

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
        <NavLink
          to={'/messenger'}
          className={style['messages-window__backward-link']}
        >
          back
        </NavLink>
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
