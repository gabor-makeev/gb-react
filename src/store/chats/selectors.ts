import { StoreState } from 'src/store';

export const selectChats = (state: StoreState) => state.chats.content;
