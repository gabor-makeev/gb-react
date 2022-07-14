import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Main } from 'src/pages/Main/Main';
import { configureStore } from '@reduxjs/toolkit';
import { articlesReducer } from 'store/articles/slice';

describe('Articles', () => {
  const store = configureStore({
    reducer: { articles: articlesReducer },
  });

  it('should render', () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
  });

  it('should render with snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
