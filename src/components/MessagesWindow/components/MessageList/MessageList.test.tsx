import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { AUTHORS, DUMMY_CONTENT } from 'src/constants';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { Authors } from 'src/default-types';

describe('MessageList', () => {
  it('should render', () => {
    render(
      <MessageList messages={DUMMY_CONTENT.messages} userName={Authors.USER} />
    );
  });

  it(`should render ${DUMMY_CONTENT.messages.length} messages`, () => {
    render(
      <MessageList messages={DUMMY_CONTENT.messages} userName={Authors.USER} />
    );

    expect(screen.getAllByText(Authors.USER).length).toBe(
      DUMMY_CONTENT.messages.length
    );
  });

  it('should render without messages passed', () => {
    render(<MessageList messages={[]} userName={Authors.USER} />);
  });

  it('should render an 1 unordered list', () => {
    render(<MessageList messages={[]} userName={Authors.USER} />);

    expect(screen.getAllByTestId('messageList').length).toBe(1);
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessageList messages={DUMMY_CONTENT.messages} userName={Authors.USER} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
