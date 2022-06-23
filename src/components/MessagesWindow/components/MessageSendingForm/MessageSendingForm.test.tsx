import React, { FC, useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageSendingForm } from './MessageSendingForm';
import { Provider } from 'react-redux';
import { store } from 'src/store';
import userEvent from '@testing-library/user-event';

describe('MessageForm', () => {
  it('should render', () => {
    const mockHandler = jest.fn();
    render(
      <Provider store={store}>
        <MessageSendingForm
          onSendMessage={mockHandler}
          setInputValue={mockHandler}
        />
      </Provider>
    );
  });

  it('should have the button disabled when no input entered', () => {
    const mockHandler = jest.fn();
    render(
      <Provider store={store}>
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
        <Provider store={store}>
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
    const mockHandler = jest.fn();
    const { asFragment } = render(
      <Provider store={store}>
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
