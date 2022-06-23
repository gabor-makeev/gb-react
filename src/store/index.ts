import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { profileReducer } from './profile/reducer';
import { messagesReducer } from './messages/reducer';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

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

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
