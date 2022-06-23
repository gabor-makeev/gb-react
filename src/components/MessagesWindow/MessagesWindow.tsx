import React, { FC, useState } from 'react';
import { Authors, Message } from 'src/default-types';
import { MUIStyledMessageSectionContainer } from 'components/MUIStyledComponents/MUIStyledMessageSectionContainer';
import { MessageSendingForm } from 'components/MessagesWindow/components/MessageSendingForm/MessageSendingForm';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useParams } from 'react-router-dom';
import { addMessageWithBotReply } from 'store/messages/actions';

interface MessageWindowProps {
  messages: Message[];
}

export const MessagesWindow: FC<MessageWindowProps> = ({ messages }) => {
  const [messageSendingFormInputValue, setMessageSendingFormInputValue] =
    useState('');
  const dispatch = useDispatch<ThunkDispatch<any, void, any>>();
  const { chatId } = useParams();

  const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (chatId) {
      dispatch(
        addMessageWithBotReply(chatId, {
          author: Authors.USER,
          text: messageSendingFormInputValue,
        })
      );
    }

    setMessageSendingFormInputValue('');
  };

  return (
    <MUIStyledMessageSectionContainer>
      <MessageList messages={messages} />
      <MessageSendingForm
        isInputDisabled={!chatId}
        onSendMessage={onSendMessage}
        inputValue={messageSendingFormInputValue}
        setInputValue={setMessageSendingFormInputValue}
      />
    </MUIStyledMessageSectionContainer>
  );
};
