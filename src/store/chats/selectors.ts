import { StoreState } from 'src/store';

export const selectChats = (state: StoreState) => state.chats.content;
export const selectActiveChatName = (state: StoreState) =>
  state.chats.activeChatName;
