import { FirebaseChat, FirebaseMessage, Message } from 'src/default-types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { onValue, get, push, set, remove } from 'firebase/database';
import {
  chatsRef,
  getChatRefById,
  getMessagesByChatName,
} from 'src/services/refs';

interface ChatsContent {
  [key: string]: {
    messages: Message[];
  };
}

interface ChatsState {
  content: ChatsContent;
}

const initialState: ChatsState = { content: {} };

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatsContent>) => {
      state.content = action.payload;
    },
  },
});

const parseFirebaseMessages = (firebaseMessages: {
  [key: string]: Message;
}) => {
  if (firebaseMessages) {
    return Object.entries(firebaseMessages).map((message: FirebaseMessage) => ({
      id: message[0],
      text: message[1].text,
      userId: message[1].userId,
    }));
  }

  return [];
};

export const addChat = (chatName: string) => async () => {
  const chats = await get(chatsRef);
  const chatsVal = await chats.val();

  const prevChats = chatsVal ? chatsVal : {};
  const nextChats = Object.assign(prevChats, {
    [chatName]: {
      createdAt: Date.now(),
    },
  });

  set(chatsRef, nextChats);
};

export const deleteChat = (chatName: string) => async () => {
  remove(getChatRefById(chatName));
};

export const addMessage = (chatId: string, message: Message) => async () => {
  push(getMessagesByChatName(chatId), message);
};

export const sendMessageWithBotReply = createAction<{
  chatId: string;
  message: Message;
}>('chats/sendMessageWithBotReply');

export const initChatsTracking = () => (dispatch: Dispatch) => {
  onValue(chatsRef, async (snapshot) => {
    const snapshotVal = await snapshot.val();

    if (snapshotVal) {
      const chatsArray: FirebaseChat[] = Object.entries(snapshotVal);
      const chatsObject: ChatsContent = {};

      chatsArray.forEach((chat: FirebaseChat) => {
        chatsObject[chat[0]] = {
          messages: parseFirebaseMessages(chat[1].messages),
        };
      });

      dispatch(chatsSlice.actions.setChats(chatsObject));
    } else {
      dispatch(chatsSlice.actions.setChats({}));
    }
  });
};

export const addMessageWithSaga = createAction<{
  chatName: string;
  message: Message;
}>('chats/addMessageWithSaga');

export const { setChats } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
