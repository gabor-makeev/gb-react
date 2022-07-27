import {
  Chat,
  Chats,
  FirebaseChat,
  FirebaseChats,
  Message,
} from 'src/default-types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { push } from 'firebase/database';
import { onSnapshot, Timestamp } from 'firebase/firestore';
import { getMessagesByChatName, getUserDocRef } from 'src/services/refs';
import { getAuth } from 'firebase/auth';
import { nanoid } from 'nanoid';
import { addUserChat, removeUserChat } from 'src/services/users';

interface ChatsState {
  content: Chats;
}

const initialState: ChatsState = { content: [] };

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<FirebaseChats>) => {
      state.content = action.payload;
    },
  },
});

const createFirebaseChatObject = (chatName: string): FirebaseChat => {
  return {
    name: chatName,
    createdAt: Timestamp.now().toMillis(),
    id: nanoid(),
  };
};

export const addChat = (chatName: string) => async () => {
  const user = getAuth().currentUser;
  const newChat = createFirebaseChatObject(chatName);

  if (user?.email) {
    await addUserChat(user.email, newChat);
  }
};

export const deleteChat = (chat: Chat) => async () => {
  const user = getAuth().currentUser;

  if (user?.email) {
    await removeUserChat(user?.email, chat);
  }
};

export const addMessage = (chatId: string, message: Message) => async () => {
  push(getMessagesByChatName(chatId), message);
};

export const sendMessageWithBotReply = createAction<{
  chatId: string;
  message: Message;
}>('chats/sendMessageWithBotReply');

export const initChatsTracking = () => (dispatch: Dispatch) => {
  const user = getAuth().currentUser;

  if (user?.email) {
    onSnapshot(getUserDocRef(user?.email), async (doc) => {
      const dataSnapshot = await doc.data();

      if (dataSnapshot) {
        dispatch(chatsSlice.actions.setChats(dataSnapshot.chats));
      }
    });
  }
};

export const addMessageWithSaga = createAction<{
  chatName: string;
  message: Message;
}>('chats/addMessageWithSaga');

export const { setChats } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
