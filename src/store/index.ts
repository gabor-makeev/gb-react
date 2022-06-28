import { combineReducers } from 'redux';
import { profileReducer } from './profile/reducer';
import { messagesReducer } from './messages/reducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';
import { configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist/es/constants';

export type StoreState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(mySaga);

export const persistor = persistStore(store);
