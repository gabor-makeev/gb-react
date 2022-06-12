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

  // the code displayed below has to be deleted as soon as there is no way to test non-inline styles with jest:

  // it('should use default messageStyle property when such not passed', () => {
  //   render(<Message message={dummyMessage} />);
  //   expect(screen.getByText(dummyMessage.text)).toHaveStyle(
  //     `background-color: ${STYLES.color.secondary}`
  //   );
  // });

  // the code displayed below has to be deleted as soon as there is no way to test non-inline styles with jest:

  // it('should use padding style passed in padding prop', () => {
  //   render(<Message message={dummyMessage} padding={'100px 100px'} />);
  //
  //   expect(screen.getByText(dummyMessage.text)).toHaveStyle(
  //     'padding: 100px 100px'
  //   );
  // });

  it('should render with snapshot', () => {
    const { asFragment } = render(<Message message={dummyMessage} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
