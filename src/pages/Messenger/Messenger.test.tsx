import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Messenger } from './Messenger';
import { AUTHORS, DUMMY_CONTENT } from '../../constants';

const dummyMessage = DUMMY_CONTENT.messages[0];

describe('App', () => {
  it('should test', () => {
    console.log('test');
  });
  // it('should render', () => {
  //   const mockHandler = jest.fn();
  //   render(
  //     <Messenger
  //       messages={{}}
  //       addChat={mockHandler}
  //       chats={[]}
  //       addMessage={mockHandler}
  //     />
  //   );
  // });
  // it('should have the bot respond to user message', async () => {
  //   const mockHandler = jest.fn();
  //   render(
  //     <Messenger
  //       messages={{}}
  //       addChat={mockHandler}
  //       chats={[]}
  //       addMessage={mockHandler}
  //     />
  //   );
  //
  //   const input = screen.getByDisplayValue('');
  //
  //   await userEvent.type(input, dummyMessage.text);
  //   await userEvent.click(screen.getByTestId('message-send-button'));
  //
  //   await waitFor(
  //     () => expect(screen.getByText(AUTHORS.bot)).toBeInTheDocument(),
  //     {
  //       timeout: 1600,
  //     }
  //   );
  // });
});
