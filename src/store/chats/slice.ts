import {
  Chat,
  Chats,
  FirebaseChat,
  FirebaseChats,
  FirebaseMessage,
} from 'src/default-types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { onSnapshot } from 'firebase/firestore';
import { getUserDocRef } from 'src/services/firebase/refs';
import { getAuth } from 'firebase/auth';
import { addUserChat, removeUserChat } from 'src/services/firebase/users';

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

export const addChat = (chat: FirebaseChat) => async () => {
  const user = getAuth().currentUser;

  if (user?.email) {
    await addUserChat(user.email, chat);
  }
};

export const deleteChat = (chat: Chat) => async () => {
  const user = getAuth().currentUser;

  if (user?.email) {
    await removeUserChat(user?.email, chat);
  }
};

export const sendMessageWithBotReply = createAction<FirebaseMessage>(
  'chats/sendMessageWithBotReply'
);

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

export const { setChats } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
