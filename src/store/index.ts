import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { profileReducer } from './profile/reducer';
import { messagesReducer } from './messages/reducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import mySaga from 'store/sagas';

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(mySaga);

export const persistor = persistStore(store);
