import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageSendingForm } from './MessageSendingForm';
import userEvent from '@testing-library/user-event';

describe('MessageForm', () => {
  it('should render', () => {
    render(<MessageSendingForm />);
  });

  it('should have the button disabled when no input entered', () => {
    render(<MessageSendingForm />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have clear input field after message sent', async () => {
    render(<MessageSendingForm />);
    const input: HTMLInputElement = screen.getByDisplayValue('');

    await userEvent.type(input, 'test');
    await userEvent.click(screen.getByRole('button'));

    expect(input.value).toBe('');
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessageSendingForm border={'2px solid blue'} borderRadius={'25px'} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
