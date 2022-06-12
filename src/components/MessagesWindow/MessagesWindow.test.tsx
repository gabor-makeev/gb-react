import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessagesWindow } from './MessagesWindow';
import { AUTHORS, DUMMY_CONTENT } from '../../constants';

describe('MessageList', () => {
  it('should render', () => {
    render(<MessagesWindow messages={DUMMY_CONTENT.messages} />);
  });

  it(`should render ${DUMMY_CONTENT.messages.length} messages`, () => {
    render(<MessagesWindow messages={DUMMY_CONTENT.messages} />);

    expect(screen.getAllByText(AUTHORS.user).length).toBe(
      DUMMY_CONTENT.messages.length
    );
  });

  it('should render without messages passed', () => {
    render(<MessagesWindow />);
  });

  it('should render an 1 unordered list', () => {
    render(<MessagesWindow />);

    expect(screen.getAllByTestId('messageList').length).toBe(1);
  });

  // the code displayed below has to be deleted as soon as there is no way to test non-inline styles with jest:

  // it('should render with default style applied', () => {
  //   const messageWindow = render(<MessagesWindow />);
  //
  //   console.log(messageWindow.classes);
  //   expect(screen.getByTestId('messageList')).toHaveStyle('gap: 10px');
  // });

  // the code displayed below has to be deleted as soon as there is no way to test non-inline styles with jest:

  // it('should render with "small" gap type argument passed', () => {
  //   render(<MessagesWindow gapType={'small'} />);
  //
  //   expect(screen.getByTestId('messageList')).toHaveStyle('gap: 5px');
  // });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessagesWindow messages={DUMMY_CONTENT.messages} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
