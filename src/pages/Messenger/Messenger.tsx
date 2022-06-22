import style from './Messenger.module.scss';
import { FC } from 'react';

import { MessageSendingForm } from 'components/MessageSendingForm/MessageSendingForm';
import { ChatsSelector } from 'components/ChatsSelector/ChatsSelector';
import { Container } from '@mui/material';
import { MessageSectionContainer } from 'components/StyledMUIComponents/MessageSectionContainer';
import { MessagesWindow } from 'components/MessagesWindow/MessagesWindow';
import { Navigate, useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { selectMessages } from '../../store/messages/selectors';

export const Messenger: FC = () => {
  const { chatId } = useParams();
  const messages = useSelector(selectMessages, shallowEqual);

  // The following function will be recreated within the next lesson:
  // useEffect(() => {
  //   if (
  //     chatId &&
  //     messages[chatId]?.length > 0 &&
  //     messages[chatId][messages[chatId].length - 1].author === AUTHORS.user
  //   ) {
  //     const timeout = setTimeout(() => {
  //       addMessage(chatId, {
  //         text: 'robot responses ',
  //         author: AUTHORS.bot,
  //       });
  //     }, 1500);
  //
  //     return () => clearTimeout(timeout);
  //   }
  // }, [chatId, messages]);

  if (chatId && !messages[chatId]) {
    return <Navigate to="/messenger" replace />;
  }

  return (
    <div className={style.app}>
      <Container>
        <ChatsSelector />
      </Container>
      <MessageSectionContainer>
        <MessagesWindow messages={chatId ? messages[chatId] : []} />
        <MessageSendingForm />
      </MessageSectionContainer>
    </div>
  );
};
