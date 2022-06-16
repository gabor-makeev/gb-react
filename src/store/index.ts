import { createStore } from 'redux';
import { profileReducer } from 'store/profile/reducer';

export const store = createStore(profileReducer);
