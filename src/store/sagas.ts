import { call, takeLatest } from 'redux-saga/effects';
import { FirebaseMessage } from '../default-types';
import { sendMessageWithBotReply } from './chats/slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { addMessage } from 'src/services/firebase/messages';
import { Timestamp } from 'firebase/firestore';

export function* addMessageWithBotReply(
  action: PayloadAction<FirebaseMessage>
) {
  yield call(asyncAddMessageWithBotReply, action.payload);
}

let timeout: NodeJS.Timeout;

const asyncAddMessageWithBotReply = async (message: FirebaseMessage) => {
  clearTimeout(timeout);

  await addMessage(message);

  if (message.userEmail) {
    timeout = setTimeout(async () => {
      await addMessage({
        createdAt: Timestamp.now().toMillis(),
        body: 'Messaging is not available...',
        chatId: message.chatId,
      });
    }, 1500);
  }
};

function* mySaga() {
  yield takeLatest(sendMessageWithBotReply.type, addMessageWithBotReply);
}

export default mySaga;
