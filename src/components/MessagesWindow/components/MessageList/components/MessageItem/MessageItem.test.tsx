import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageItem } from './MessageItem';
import { DUMMY_CONTENT } from 'src/constants';
import { Authors, Message } from 'src/default-types';

const dummyMessage = DUMMY_CONTENT.messages[0];

describe('Message', () => {
  it('should render', () => {
    render(<MessageItem message={dummyMessage} userName={'Test user'} />);
  });

  it('should render text in <li>-tag', () => {
    render(<MessageItem message={dummyMessage} userName={'Test user'} />);
    expect(screen.getByText(dummyMessage.text)).toBeInTheDocument();
  });

  it('should render text in <span>-tag', () => {
    render(<MessageItem message={dummyMessage} userName={'Test user'} />);
    expect(screen.getByText('Test user')).toBeInTheDocument();
  });

  it('should have system message classname applied for bot message', () => {
    const message: Message = {
      author: Authors.BOT,
      text: 'test',
    };

    render(<MessageItem message={message} userName={'Test user'} />);

    const messageItem = screen.getByTestId('messageItem');

    expect(messageItem).toHaveClass('message__system-background');
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessageItem message={dummyMessage} userName={'Test user'} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
