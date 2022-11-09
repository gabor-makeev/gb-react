import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { getAuth } from 'firebase/auth';
import {
  EFirebaseUserProperty,
  IFirebaseMessage,
  IFirebaseUserChat,
} from 'src/default-types';
import { UserRepository } from 'src/services/firebase/Repository/UserRepository';

interface ChatsState {
  content: IFirebaseUserChat[];
  activeChatName: string;
}

const initialState: ChatsState = { content: [], activeChatName: '' };

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IFirebaseUserChat[]>) => {
      state.content = action.payload;
    },
    setActiveChatName: (state, action: PayloadAction<string>) => {
      state.activeChatName = action.payload;
    },
  },
});

export const sendMessageWithBotReply = createAction<IFirebaseMessage>(
  'chats/sendMessageWithBotReply'
);

export const initChatsTracking = () => (dispatch: Dispatch) => {
  const user = getAuth().currentUser;

  if (user?.email) {
    return UserRepository.subscribeToUser(user?.email, (chats) => {
      dispatch(chatsSlice.actions.setChats(chats[EFirebaseUserProperty.chats]));
    });
  }
};

export const { setChats, setActiveChatName } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
