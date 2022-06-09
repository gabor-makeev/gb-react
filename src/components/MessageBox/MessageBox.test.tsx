import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageBox } from './MessageBox';
import { DUMMY_CONTENT, STYLES } from '../../constants';

describe('MessageBox', () => {
  it('should render', () => {
    render(<MessageBox messages={DUMMY_CONTENT.messages} />);
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessageBox messages={DUMMY_CONTENT.messages} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with default style from messageBoxStyle prop', () => {
    render(<MessageBox messages={DUMMY_CONTENT.messages} />);

    expect(screen.getByTestId('messageBox')).toHaveStyle(
      `background-color: ${STYLES.color.primary}`
    );
  });

  it('should render with custom border radius style from borderRadius prop', () => {
    render(
      <MessageBox messages={DUMMY_CONTENT.messages} borderRadius={'100px'} />
    );

    expect(screen.getByTestId('messageBox')).toHaveStyle(
      'border-radius: 100px'
    );
  });
});
