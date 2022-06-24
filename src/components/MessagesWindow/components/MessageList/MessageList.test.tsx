import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AUTHORS, DUMMY_CONTENT } from 'src/constants';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';

describe('MessageList', () => {
  it('should render', () => {
    render(<MessageList messages={DUMMY_CONTENT.messages} />);
  });

  it(`should render ${DUMMY_CONTENT.messages.length} messages`, () => {
    render(<MessageList messages={DUMMY_CONTENT.messages} />);

    expect(screen.getAllByText(AUTHORS.user).length).toBe(
      DUMMY_CONTENT.messages.length
    );
  });

  it('should render without messages passed', () => {
    render(<MessageList messages={[]} />);
  });

  it('should render an 1 unordered list', () => {
    render(<MessageList messages={[]} />);

    expect(screen.getAllByTestId('messageList').length).toBe(1);
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessageList messages={DUMMY_CONTENT.messages} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
