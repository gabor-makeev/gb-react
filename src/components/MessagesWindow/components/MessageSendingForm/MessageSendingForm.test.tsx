import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageSendingForm } from './MessageSendingForm';
import { Provider } from 'react-redux';
import { store } from 'src/store';

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
