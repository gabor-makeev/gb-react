import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageForm } from './MessageForm';
import userEvent from '@testing-library/user-event';

describe('MessageForm', () => {
  const mockHandler = jest.fn();
  it('should render', () => {
    render(<MessageForm messageList={[]} setMessageList={mockHandler} />);
  });

  it('should have the button disabled when no input entered', () => {
    render(<MessageForm messageList={[]} setMessageList={mockHandler} />);

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have clear input field after message sent', async () => {
    const mockHandler = jest.fn();
    render(<MessageForm messageList={[]} setMessageList={mockHandler} />);
    const input: HTMLInputElement = screen.getByDisplayValue('');

    await userEvent.type(input, 'test');
    await userEvent.click(screen.getByRole('button'));

    expect(input.value).toBe('');
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <MessageForm
        messageList={[]}
        setMessageList={mockHandler}
        border={'2px solid blue'}
        borderRadius={'25px'}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
