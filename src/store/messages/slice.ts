import { Message } from 'src/default-types';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

type MessageItemWithId = { id: string } & Message;

export interface MessagesState {
  [key: string]: MessageItemWithId[];
}

const initialState: MessagesState = {};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<{ chatName: string }>) => {
      state[action.payload.chatName] = [];
    },
    deleteChat: (state, action: PayloadAction<{ chatName: string }>) => {
      delete state[action.payload.chatName];
    },
    addMessage: (
      state,
      action: PayloadAction<{ chatName: string; message: Message }>
    ) => {
      state[action.payload.chatName].push({
        id: nanoid(),
        author: action.payload.message.author,
        text: action.payload.message.text,
      });
    },
  },
});

export const addMessageWithSaga = createAction<{
  chatName: string;
  message: Message;
}>('messages/addMessageWithSaga');

export const { addChat, deleteChat, addMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
