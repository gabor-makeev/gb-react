import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Articles } from 'src/pages/Articles/Articles';
import { configureStore } from '@reduxjs/toolkit';
import { articlesReducer } from 'store/articles/slice';

describe('Articles', () => {
  const store = configureStore({
    reducer: { articles: articlesReducer },
  });

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
