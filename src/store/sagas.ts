import { delay, put, takeLatest } from 'redux-saga/effects';
import { Authors, Message } from '../default-types';
import { addMessage, addMessageWithSaga } from './messages/slice';
import { PayloadAction } from '@reduxjs/toolkit';

export function* addMessageWithBotReply(
  action: PayloadAction<{ chatName: string; message: Message }>
) {
  yield put(
    addMessage({
      chatName: action.payload.chatName,
      message: action.payload.message,
    })
  );

  if (action.payload.message.author !== Authors.BOT) {
    yield delay(1500);

    yield put(
      addMessage({
        chatName: action.payload.chatName,
        message: {
          author: Authors.BOT,
          text: 'Bot response',
        },
      })
    );
  }
}

function* mySaga() {
  yield takeLatest(addMessageWithSaga.type, addMessageWithBotReply);
}

export default mySaga;
