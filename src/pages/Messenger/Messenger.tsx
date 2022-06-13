import style from './Messenger.module.scss';
import { AUTHORS } from '../../constants';
import { FC, useCallback, useEffect } from 'react';

import { MessageSendingForm } from 'components/MessageSendingForm/MessageSendingForm';
import { ChatsSelector } from 'components/ChatsSelector/ChatsSelector';
import { Container } from '@mui/material';
import { MessageSectionContainer } from 'components/StyledMUIComponents/MessageSectionContainer';
import { MessagesWindow } from 'components/MessagesWindow/MessagesWindow';
import { ChatItem, MessageItem, MessageList } from 'src/default-types';
import { Navigate, useParams } from 'react-router-dom';

interface MessengerProps {
  chats: ChatItem[];
  addChat: (chat: ChatItem) => void;
  messages: MessageList;
  addMessage: (chatId: string, messege: MessageItem) => void;
  isMessageSendingActive?: boolean;
}

export const Messenger: FC<MessengerProps> = ({
  chats,
  addChat,
  messages,
  addMessage,
  isMessageSendingActive = false,
}) => {
  const { chatId } = useParams();

  useEffect(() => {
    if (
      chatId &&
      messages[chatId]?.length > 0 &&
      messages[chatId][messages[chatId].length - 1].author === AUTHORS.user
    ) {
      const timeout = setTimeout(() => {
        addMessage(chatId, {
          text: 'robot responses ',
          author: AUTHORS.bot,
        });
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [chatId, messages]);

  const handleAddMessage = useCallback(
    (message: MessageItem) => {
      if (chatId) {
        addMessage(chatId, message);
      }
    },
    [chatId, addMessage]
  );

  // the code below doesn't work:
  if (chatId && !messages[chatId]) {
    return <Navigate to="/messenger" replace />;
  }

  return (
    <div className={style.app}>
      <Container>
        <ChatsSelector chats={chats} addChat={addChat} />
      </Container>
      <MessageSectionContainer>
        <MessagesWindow messages={chatId ? messages[chatId] : []} />
        <MessageSendingForm
          handleAddMessage={handleAddMessage}
          isMessageSendingFormActive={isMessageSendingActive}
        />
      </MessageSectionContainer>
    </div>
  );
};
