import {
  AddChat,
  AddMessage,
  AddMessageWithBotReply,
  DeleteChat,
} from './types';

export const ADD_CHAT = 'MESSAGES::ADD_CHAT';
export const DELETE_CHAT = 'MESSAGES::DELETE_CHAT';
export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';
export const ADD_MESSAGE_WITH_BOT_REPLY =
  'MESSAGES::ADD_MESSAGE_WITH_BOT_REPLY';

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

export const addMessageWithBotReply: AddMessageWithBotReply = (
  chatName,
  message
) => ({
  type: ADD_MESSAGE_WITH_BOT_REPLY,
  chatName,
  message,
});
