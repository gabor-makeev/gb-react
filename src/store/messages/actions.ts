import { AddChat, AddMessage, DeleteChat } from './types';
import { Authors, MessageItem } from 'src/default-types';
import { Dispatch } from 'redux';

export const ADD_CHAT = 'MESSAGES::ADD_CHAT';
export const DELETE_CHAT = 'MESSAGES::DELETE_CHAT';
export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';

export const addChat: AddChat = (chatName) => ({
  type: ADD_CHAT,
  chatName,
});

export const deleteChat: DeleteChat = (chatName) => ({
  type: DELETE_CHAT,
  chatName,
});

export const addMessage: AddMessage = (chatName, message) => ({
  type: ADD_MESSAGE,
  chatName,
  message,
});

let timeout: NodeJS.Timeout;

export const addMessageWithBotReply =
  (chatName: string, message: MessageItem) => (dispatch: Dispatch) => {
    dispatch(addMessage(chatName, message));

    if (message.author !== Authors.BOT) {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        dispatch(
          addMessage(chatName, {
            author: Authors.BOT,
            text: 'Bot response',
          })
        );
      }, 1500);
    }
  };
