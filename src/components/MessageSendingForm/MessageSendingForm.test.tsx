import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageSendingForm } from './MessageSendingForm';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from 'src/store';

describe('MessageForm', () => {
  it('should render', () => {
    render(
      <Provider store={store}>
        <MessageSendingForm />
      </Provider>
    );
  });

  it('should have the button disabled when no input entered', () => {
    render(
      <Provider store={store}>
        <MessageSendingForm />
      </Provider>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should have clear input field after message sent', async () => {
    render(
      <Provider store={store}>
        <MessageSendingForm />
      </Provider>
    );
    const input: HTMLInputElement = screen.getByDisplayValue('');

    await userEvent.type(input, 'test');
    await userEvent.click(screen.getByRole('button'));

    expect(input.value).toBe('');
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MessageSendingForm border={'2px solid blue'} borderRadius={'25px'} />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
