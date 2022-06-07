import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { userEvent } from '@storybook/testing-library';

import { Button } from './Button';

describe('Button', () => {
  it('should render', () => {
    render(<Button />);
  });

  it('should be disabled', () => {
    render(<Button disabled={true} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render a button element', () => {
    render(<Button />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should get clicked', () => {
    const mockHandler = jest.fn();

    render(<Button />);
    const button = screen.getByRole('button');
    button.onClick = mockHandler();

    userEvent.click(button);
    expect(mockHandler).toBeCalledTimes(1);
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(<Button />);

    expect(asFragment()).toMatchSnapshot();
  });
});
