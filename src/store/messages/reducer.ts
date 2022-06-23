import { Reducer } from 'redux';
import { MessagesActions } from './types';
import { ADD_CHAT, ADD_MESSAGE, DELETE_CHAT } from './actions';
import { nanoid } from 'nanoid';
import { Message } from '../../default-types';

type MessageItemWithId = { id: string } & Message;

export interface MessageState {
  [key: string]: MessageItemWithId[];
}

const initialState: MessageState = {};

export const messagesReducer: Reducer<MessageState, MessagesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_CHAT:
      return {
        ...state,
        [action.chatName]: [],
      };
    case DELETE_CHAT: {
      const messages = { ...state };
      delete messages[action.chatName];
      return messages;
    }
    case ADD_MESSAGE:
      return {
        ...state,
        [action.chatName]: [
          ...state[action.chatName],
          {
            id: nanoid(),
            author: action.message.author,
            text: action.message.text,
          },
        ],
      };
    default:
      return state;
  }
};
