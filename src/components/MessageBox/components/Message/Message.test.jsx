import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Message } from './Message';
import { DUMMY_CONTENT, STYLES } from '../../../../constants';

const dummyMessage = DUMMY_CONTENT.messages[0];

describe('Message', () => {
  it('should render', () => {
    render(<Message message={dummyMessage} />);
  });

  it('should render text in <li>-tag', () => {
    render(<Message message={dummyMessage} />);
    expect(screen.getByText(dummyMessage.text)).toBeInTheDocument();
  });

  it('should render text in <span>-tag', () => {
    render(<Message message={dummyMessage} />);
    expect(screen.getByText(dummyMessage.author)).toBeInTheDocument();
  });

  it('should use default messageStyle property when such not passed', () => {
    render(<Message message={dummyMessage} />);
    expect(screen.getByText(dummyMessage.text)).toHaveStyle(
      `background-color: ${STYLES.color.secondary}`
    );
  });

  it('should use style passed in messageStyle prop', () => {
    render(
      <Message
        message={dummyMessage}
        messageStyle={{ backgroundColor: 'red' }}
      />
    );

    expect(screen.getByText(dummyMessage.text)).toHaveStyle(
      'background-color: red'
    );
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(<Message message={dummyMessage} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
