import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageList } from './MessageList';
import { AUTHORS, DUMMY_CONTENT } from '../../../../constants';

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
    render(<MessageList />);
  });

  it('should render an 1 unordered list', () => {
    render(<MessageList />);

    expect(screen.getAllByTestId('messageList').length).toBe(1);
  });

  it('should render with default style (messageListStyle) applied', () => {
    render(<MessageList />);

    expect(screen.getByTestId('messageList')).toHaveStyle('gap: 10px');
  });

  it('should render with custom styles passed', () => {
    render(<MessageList messageListStyle={{color: 'red'}} />);

    expect(screen.getByTestId('messageList')).toHaveStyle('color: red');
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessageList messages={DUMMY_CONTENT.messages} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
