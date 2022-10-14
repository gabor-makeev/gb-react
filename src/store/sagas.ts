import { call, takeLatest } from 'redux-saga/effects';
import { Authors, FirebaseMessage } from '../default-types';
import { sendMessageWithBotReply } from './chats/slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';
import { MessageService } from 'src/services/firebase/Service/MessageService/MessageService';

export function* addMessageWithBotReply(
  action: PayloadAction<FirebaseMessage>
) {
  yield call(asyncAddMessageWithBotReply, action.payload);
}

let timeout: NodeJS.Timeout;

const asyncAddMessageWithBotReply = async (message: FirebaseMessage) => {
  clearTimeout(timeout);

  await MessageService.sendMessage(message);

  if (message.userEmail) {
    timeout = setTimeout(async () => {
      await MessageService.sendMessage({
        createdAt: Timestamp.now().toMillis(),
        body: 'Messaging is not available...',
        chatId: message.chatId,
        userName: Authors.BOT,
      });
    }, 1500);
  }
};

function* mySaga() {
  yield takeLatest(sendMessageWithBotReply.type, addMessageWithBotReply);
}

export default mySaga;
