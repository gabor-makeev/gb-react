import { delay, put, takeLatest } from 'redux-saga/effects';
import { Authors } from '../default-types';
import { ADD_MESSAGE_WITH_BOT_REPLY, addMessage } from './messages/actions';
import { AddMessage } from './messages/types';

export function* addMessageWithBotReply(action: ReturnType<AddMessage>) {
  yield put(addMessage(action.chatName, action.message));

  if (action.message.author !== Authors.BOT) {
    yield delay(1500);

    yield put(
      addMessage(action.chatName, {
        author: Authors.BOT,
        text: 'Bot response',
      })
    );
  }
}

function* mySaga() {
  yield takeLatest(ADD_MESSAGE_WITH_BOT_REPLY, addMessageWithBotReply);
}

export default mySaga;
