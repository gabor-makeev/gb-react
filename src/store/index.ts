import { combineReducers } from 'redux';
import { profileReducer } from './profile/slice';
import { chatsReducer } from './chats/slice';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';
import { configureStore } from '@reduxjs/toolkit';
import { articlesReducer } from 'store/articles/slice';

export type StoreState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  profile: profileReducer,
  chats: chatsReducer,
  articles: articlesReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);
