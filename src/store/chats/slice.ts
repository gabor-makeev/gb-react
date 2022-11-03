import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { getAuth } from 'firebase/auth';
import { IClientUserChat, IFirebaseMessage } from 'src/default-types';
import { UserService } from 'src/services/firebase/Service/UserService';

interface ChatsState {
  content: IClientUserChat[];
}

const initialState: ChatsState = { content: [] };

export const chatsSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<IClientUserChat[]>) => {
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
    return UserService.subscribeToChats(user?.email, (chats) => {
      dispatch(chatsSlice.actions.setChats(chats));
    });
  }
};

export const { setChats } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
