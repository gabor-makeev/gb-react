import { combineReducers, compose, createStore } from 'redux';
import { profileReducer } from './profile/reducer';
import { messagesReducer } from './messages/reducer';

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type StoreState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  profile: profileReducer,
  messages: messagesReducer,
});

export const store = createStore(rootReducer, composeEnhancers());
