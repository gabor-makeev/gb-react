import React, { FC, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectChats } from 'store/chats/selectors';
import { initChatsTracking, sendMessageWithBotReply } from 'store/chats/slice';
import { MUIStyledMessageSectionContainer } from 'components/MUIStyledComponents/MUIStyledMessageSectionContainer';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { getAuth } from 'firebase/auth';

export const MessagesWindow: FC = () => {
  const [messageSendingFormInputValue, setMessageSendingFormInputValue] =
    useState('');

  const chats = useSelector(selectChats);
  const user = getAuth().currentUser;
  const userName = user?.displayName ? user.displayName : 'Unknown user';

  const dispatch = useDispatch() as any;
  const { chatId } = useParams();

  useEffect(() => {
    if (chatId) {
      dispatch(initChatsTracking());
    }
  }, [chatId]);

  if (chatId && !chats[chatId]) {
    return <Navigate to="/messenger" replace />;
  }

  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chatId) {
      dispatch(
        sendMessageWithBotReply({
          chatId,
          message: {
            author: userName,
            text: messageSendingFormInputValue,
          },
        })
      );
    }

    setMessageSendingFormInputValue('');
  };

  return (
    <MUIStyledMessageSectionContainer>
      <MessageList
        messages={chatId ? chats[chatId].messages : []}
        userName={userName}
      />
      <MessageSendingForm
        isInputDisabled={!chatId}
        onSendMessage={onSendMessage}
        inputValue={messageSendingFormInputValue}
        setInputValue={setMessageSendingFormInputValue}
      />
    </MUIStyledMessageSectionContainer>
  );
};
