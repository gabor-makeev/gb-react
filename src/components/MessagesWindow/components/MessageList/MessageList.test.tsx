import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { DUMMY_CONTENT } from 'src/constants';
import { MessageList } from 'components/MessagesWindow/components/MessageList/MessageList';
import { Authors } from 'src/default-types';

const testUserEmail = 'test@test.com';

describe('MessageList', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
  it('should render', () => {
    render(
      <MessageList
        messages={DUMMY_CONTENT.messages}
        userEmail={testUserEmail}
      />
    );
  });

  it(`should render ${DUMMY_CONTENT.messages.length} messages`, () => {
    render(
      <MessageList
        messages={DUMMY_CONTENT.messages}
        userEmail={testUserEmail}
      />
    );

    expect(screen.getAllByText(Authors.USER).length).toBe(
      DUMMY_CONTENT.messages.length
    );
  });

  it('should render without messages passed', () => {
    render(<MessageList messages={[]} userEmail={testUserEmail} />);
  });

  it('should render an 1 unordered list', () => {
    render(<MessageList messages={[]} userEmail={testUserEmail} />);

    expect(screen.getAllByTestId('messageList').length).toBe(1);
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessageList
        messages={DUMMY_CONTENT.messages}
        userEmail={testUserEmail}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
