import { Reducer } from 'redux';
import { MessagesActions } from './types';
import { ADD_CHAT, ADD_MESSAGE, DELETE_CHAT } from './actions';
import { nanoid } from 'nanoid';
import { AUTHORS } from '../../constants';
import { Authors } from '../../default-types';

export interface MessageItem {
  id: string;
  text: string;
  author: Authors;
}

export interface MessageState {
  [key: string]: MessageItem[];
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
            author: AUTHORS.user,
            text: action.text,
          },
        ],
      };
    default:
      return state;
  }
};
