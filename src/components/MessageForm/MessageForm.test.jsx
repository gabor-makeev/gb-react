import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageForm } from './MessageForm';
import userEvent from '@testing-library/user-event';

describe('MessageForm', () => {
  it('should render', () => {
    render(<MessageForm />);
  });

  it('should have the button disabled when no input entered', () => {
    render(<MessageForm />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have clear input field after message sent', async () => {
    const mockHandler = jest.fn();
    render(<MessageForm pushMessage={mockHandler} />);
    const input = screen.getByDisplayValue('');

    await userEvent.type(input, 'test');
    await userEvent.click(screen.getByRole('button'));

    expect(input.value).toBe('');
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessageForm border={'2px solid blue'} borderRadius={'25px'} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
