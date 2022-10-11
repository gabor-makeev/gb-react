import { Chats, FirebaseChats, FirebaseMessage } from 'src/default-types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { onSnapshot } from 'firebase/firestore';
import { getUserDocRef } from 'src/services/firebase/refs';
import { getAuth } from 'firebase/auth';

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
