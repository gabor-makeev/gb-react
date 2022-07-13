import React, { FC, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName } from 'store/profile/selectors';
import { selectChats } from 'store/chats/selectors';
import { initProfileTracking } from 'store/profile/slice';
import { initChatsTracking, sendMessageWithBotReply } from 'store/chats/slice';
import { MUIStyledMessageSectionContainer } from 'components/MUIStyledComponents/MUIStyledMessageSectionContainer';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';

export const MessagesWindow: FC = () => {
  const [messageSendingFormInputValue, setMessageSendingFormInputValue] =
    useState('');

  const chats = useSelector(selectChats);
  const userName = useSelector(selectUserName);

  const dispatch = useDispatch() as any;
  const { chatId } = useParams();

  useEffect(() => {
    dispatch(initProfileTracking());
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
