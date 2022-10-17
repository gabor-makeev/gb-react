import { call, takeLatest } from 'redux-saga/effects';
import { Authors, IFirebaseMessage } from '../default-types';
import { sendMessageWithBotReply } from './chats/slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';
import { MessageService } from 'src/services/firebase/Service/MessageService';

export function* addMessageWithBotReply(
  action: PayloadAction<IFirebaseMessage>
) {
  yield call(asyncAddMessageWithBotReply, action.payload);
}

let timeout: NodeJS.Timeout;

const asyncAddMessageWithBotReply = async (message: IFirebaseMessage) => {
  clearTimeout(timeout);

  await MessageService.sendMessage(message);

  if (message.userEmail) {
    timeout = setTimeout(async () => {
      await MessageService.sendMessage({
        createdAt: Timestamp.now().toMillis(),
        body: 'Messaging is not available...',
        chatId: message.chatId,
        userName: Authors.BOT,
        userEmail: '',
      });
    }, 1500);
  }
};

function* mySaga() {
  yield takeLatest(sendMessageWithBotReply.type, addMessageWithBotReply);
}

export default mySaga;
