import { combineReducers } from 'redux';
import { profileReducer } from './profile/slice';
import { messagesReducer } from './messages/slice';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';
import { configureStore } from '@reduxjs/toolkit';
import { articlesReducer } from 'store/articles/slice';

export type StoreState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
  articles: articlesReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

// TODO: saga disabled until adjusted to work with firebase, has to be covered
// sagaMiddleware.run(mySaga);
