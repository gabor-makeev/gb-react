import { StoreState } from 'src/store';
import { nanoid } from 'nanoid';

export const selectChats = (state: StoreState) =>
  Object.keys(state.messages).map((chatName) => ({
    id: nanoid(),
    name: chatName,
  }));

export const selectMessages = (state: StoreState) => state.messages;
