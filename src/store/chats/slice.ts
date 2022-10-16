import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { getAuth } from 'firebase/auth';
import { UserRepository } from 'src/services/firebase/Repository/UserRepository/UserRepository';
import { IFirebaseMessage, IFirebaseUserChat } from 'src/default-types';

interface ChatsState {
  content: IFirebaseUserChat[];
}

const initialState: ChatsState = { content: [] };

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IFirebaseUserChat[]>) => {
      state.content = action.payload;
    },
  },
});

export const sendMessageWithBotReply = createAction<IFirebaseMessage>(
  'chats/sendMessageWithBotReply'
);

export const initChatsTracking = () => (dispatch: Dispatch) => {
  const user = getAuth().currentUser;

  if (user?.email) {
    UserRepository.subscribeToUser(user?.email, (userData) => {
      dispatch(chatsSlice.actions.setChats(userData.chats));
    });
  }
};

export const { setChats } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
