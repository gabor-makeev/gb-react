import React, { FC, useEffect, useState } from 'react';
import style from './MessagesWindow.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { EFirebaseMessageProperty, IClientMessage } from 'src/default-types';
import classNames from 'classnames';
import { MessagesWindowHeader } from 'components/MessagesWindow/components/MessagesWindowHeader/MessagesWindowHeader';
import { UserRepository } from 'src/services/firebase/Repository/UserRepository';
import { MessageRepository } from 'src/services/firebase/Repository/MessageRepository';
import { Timestamp } from 'firebase/firestore';
import { MessageService } from 'src/services/firebase/Service/MessageService';
import { BASE_URL } from 'src/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveChatName, selectChats } from 'store/chats/selectors';
import { setActiveChatName } from 'store/chats/slice';

export const MessagesWindow: FC = () => {
  const [messages, setMessages] = useState<IClientMessage[]>([]);
  const [userName, setUserName] = useState('');
  const [messageSendingFormInputValue, setMessageSendingFormInputValue] =
    useState('');

  const { chatId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userEmail = getAuth().currentUser?.email as string;
  const chats = useSelector(selectChats);
  const chatName = useSelector(selectActiveChatName);

  const messagesWindowClasslist = classNames(style['messages-window'], {
    [style['active-messaging__messages-window']]: !!chatId,
  });

  useEffect(() => {
    UserRepository.getUser(userEmail).then((data) => {
      setUserName(data?.name);
    });

    return () => {
      dispatch(setActiveChatName(''));
    };
  }, []);

  useEffect(() => {
    if (chatId) {
      const [chat] = chats.filter((chat) => chat.id === chatId);
      if (chat) {
        const subscribeToMessages = async () => {
          return await MessageRepository.subscribeToMessagesByProperty(
            EFirebaseMessageProperty.chatId,
            chat.id,
            setMessages
          );
        };

        subscribeToMessages();
      }
    }
  }, [chatId, chats]);

  if (chatId) {
    UserRepository.getUser(userEmail).then((userData) => {
      const [chat] = userData.chats.filter((chat) => chat.id === chatId);
      if (!chat) {
        navigate(`${BASE_URL}messenger`, { replace: true });
      }
    });
  }

  const onSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chatId) {
      setMessageSendingFormInputValue('');

      await MessageService.sendMessage({
        chatId,
        body: messageSendingFormInputValue,
        userName,
        createdAt: Timestamp.now().toMillis(),
        userEmail,
      });
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
