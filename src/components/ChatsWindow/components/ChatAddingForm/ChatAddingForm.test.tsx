import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatAddingForm } from 'components/ChatsWindow/components/ChatAddingForm/ChatAddingForm';
import userEvent from '@testing-library/user-event';

describe('ChatAddingForm', () => {
  it('should render', () => {
    const onAddChatmockHandler = jest.fn((e) => e.preventDefault());
    const mockHandler = jest.fn();

    render(
      <ChatAddingForm
        onAddChat={onAddChatmockHandler}
        inputValue={''}
        setInputValue={mockHandler}
      />
    );
  });
  it('should call onAddChat property function on form submission', async () => {
    const onAddChatmockHandler = jest.fn((e) => e.preventDefault());
    const mockHandler = jest.fn();

    render(
      <ChatAddingForm
        onAddChat={onAddChatmockHandler}
        inputValue={''}
        setInputValue={mockHandler}
      />
    );
    const button: HTMLButtonElement = screen.getByTestId(
      'ChatAddingFormButton'
    );
    await userEvent.click(button);

    expect(onAddChatmockHandler).toBeCalledTimes(1);
  });

  it('should have input filled in if inputValue property passed', async () => {
    const onAddChatmockHandler = jest.fn((e) => e.preventDefault());
    const mockHandler = jest.fn();

    render(
      <ChatAddingForm
        onAddChat={onAddChatmockHandler}
        inputValue={'test'}
        setInputValue={mockHandler}
      />
    );

    const input: HTMLInputElement = screen.getByRole('textbox');

    expect(input.value).toBe('test');
  });

  it('should call setInputValue property function on input change', async () => {
    const onAddChatmockHandler = jest.fn((e) => e.preventDefault());
    const mockHandler = jest.fn();

    render(
      <ChatAddingForm
        onAddChat={onAddChatmockHandler}
        inputValue={'test'}
        setInputValue={mockHandler}
      />
    );

    const input: HTMLInputElement = screen.getByRole('textbox');

    await userEvent.type(input, 'test');

    expect(mockHandler).toBeCalledTimes(4);
  });
});
