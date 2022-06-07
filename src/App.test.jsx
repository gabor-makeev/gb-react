import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { App } from './App';
import { AUTHORS, DUMMY_CONTENT } from './constants';

const dummyMessage = DUMMY_CONTENT.messages[0];

describe('App', () => {
  it('should render', () => {
    render(<App />);
  });

  it('should have the bot respond to user message', async () => {
    render(<App />);
    const input = screen.getByDisplayValue('');

    await userEvent.type(input, dummyMessage.text);
    await userEvent.click(screen.getByRole('button'));

    await waitFor(
      () => expect(screen.getByText(AUTHORS.bot)).toBeInTheDocument(),
      {
        timeout: 1600,
      }
    );
  });
});
