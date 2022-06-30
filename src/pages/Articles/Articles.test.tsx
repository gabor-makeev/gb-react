import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Articles } from 'src/pages/Articles/Articles';
import { store } from 'src/store';

describe('Articles', () => {
  it('should render', () => {
    render(
      <Provider store={store}>
        <Articles />
      </Provider>
    );
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Articles />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
