import React, { FC, useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageSendingForm } from './MessageSendingForm';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from 'store/messages/slice';

describe('MessageForm', () => {
  const storeMock = configureStore({
    reducer: { messages: messagesReducer },
  });

  const mockHandler = jest.fn();

  it('should render', () => {
    render(
      <Provider store={storeMock}>
        <MessageSendingForm
          onSendMessage={mockHandler}
          setInputValue={mockHandler}
        />
      </Provider>
    );
  });

  it('should have the button disabled when no input entered', () => {
    render(
      <Provider store={storeMock}>
        <MessageSendingForm
          onSendMessage={mockHandler}
          setInputValue={mockHandler}
        />
      </Provider>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should call form submit when input entered and "send" button clicked', async () => {
    const onSendMessageMock = jest.fn((e) => e.preventDefault());

    const MessageSendingFormWrapper: FC = () => {
      const [inputValue, setInputValue] = useState('');

      return (
        <Provider store={storeMock}>
          <MessageSendingForm
            onSendMessage={onSendMessageMock}
            setInputValue={setInputValue}
            inputValue={inputValue}
          />
        </Provider>
      );
    };

    render(<MessageSendingFormWrapper />);

    const input: HTMLInputElement = screen.getByRole('textbox');
    await userEvent.type(input, 'test');

    const button = screen.getByTestId('messageSendingFormButton');
    await userEvent.click(button);

    expect(onSendMessageMock).toBeCalledTimes(1);
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <Provider store={storeMock}>
        <MessageSendingForm
          onSendMessage={mockHandler}
          setInputValue={mockHandler}
          borderType={'normal'}
          angleType={'roundish'}
        />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
