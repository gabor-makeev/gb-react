import { ADD_CHAT, DELETE_CHAT, ADD_MESSAGE } from './actions';
import { MessageItem } from 'src/default-types';

export type MessagesActions =
  | ReturnType<AddChat>
  | ReturnType<DeleteChat>
  | ReturnType<AddMessage>;

export type AddChat = (chatName: string) => {
  type: typeof ADD_CHAT;
  chatName: string;
};

export type DeleteChat = (chatName: string) => {
  type: typeof DELETE_CHAT;
  chatName: string;
};

export type AddMessage = (
  chatName: string,
  message: MessageItem
) => {
  type: typeof ADD_MESSAGE;
  chatName: string;
  message: MessageItem;
};
