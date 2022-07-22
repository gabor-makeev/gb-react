import { call, takeLatest } from 'redux-saga/effects';
import { Authors, Message } from '../default-types';
import { addMessage, sendMessageWithBotReply } from './chats/slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { store } from 'store/index';

export function* addMessageWithBotReply(
  action: PayloadAction<{ chatId: string; message: Message }>
) {
  yield call(
    asyncAddMessageWithBotReply,
    action.payload.chatId,
    action.payload.message
  );
}

let timeout: NodeJS.Timeout;

const asyncAddMessageWithBotReply = async (
  chatId: string,
  message: Message
) => {
  clearTimeout(timeout);

  store.dispatch(addMessage(chatId, message));

  if (message.userId !== Authors.BOT) {
    timeout = setTimeout(
      () =>
        store.dispatch(
          addMessage(chatId, {
            userId: Authors.BOT,
            text: 'Bot response',
          })
        ),
      1500
    );
  }
};

function* mySaga() {
  yield takeLatest(sendMessageWithBotReply.type, addMessageWithBotReply);
}

export default mySaga;
