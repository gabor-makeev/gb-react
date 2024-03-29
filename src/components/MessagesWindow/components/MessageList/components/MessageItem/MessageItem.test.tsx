import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageItem } from './MessageItem';
import { DUMMY_CONTENT } from 'src/constants';
import { Authors, IClientMessage } from 'src/default-types';

const dummyMessage = DUMMY_CONTENT.messages[0];
const testUserEmail = 'test@test.com';

describe('Message', () => {
  it('should render', () => {
    render(<MessageItem message={dummyMessage} userEmail={testUserEmail} />);
  });

  it('should render text in <li>-tag', () => {
    render(<MessageItem message={dummyMessage} userEmail={testUserEmail} />);
    expect(screen.getByText(dummyMessage.body)).toBeInTheDocument();
  });

  it('should have system message classname applied for bot message', () => {
    const message: IClientMessage = {
      body: 'test',
      id: '1',
      chatId: '1',
      createdAt: 1,
      userName: Authors.BOT,
      userEmail: '',
    };

    render(<MessageItem message={message} userEmail={testUserEmail} />);

    const messageItem = screen.getByTestId('messageItem');

    expect(messageItem).toHaveClass('message__system-background');
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessageItem message={dummyMessage} userEmail={testUserEmail} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
