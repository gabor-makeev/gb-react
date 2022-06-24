import {
  ADD_CHAT,
  ADD_MESSAGE,
  addChat,
  addMessage,
  DELETE_CHAT,
  deleteChat,
} from 'store/messages/actions';
import { Authors } from '../../default-types';

describe('messages/actions', () => {
  it('should return AddChat action return object', () => {
    expect(addChat('test')).toStrictEqual({
      type: ADD_CHAT,
      chatName: 'test',
    });
  });

  it('should return DeleteChat action return object', () => {
    expect(deleteChat('test')).toStrictEqual({
      type: DELETE_CHAT,
      chatName: 'test',
    });
  });

  it('should return AddMessage action return object', () => {
    expect(
      addMessage('test chat name', {
        text: 'test message text',
        author: Authors.USER,
      })
    ).toStrictEqual({
      type: ADD_MESSAGE,
      chatName: 'test chat name',
      message: {
        text: 'test message text',
        author: Authors.USER,
      },
    });
  });
});
