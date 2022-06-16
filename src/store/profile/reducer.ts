import { Reducer } from 'redux';
import { ProfileActions } from 'store/profile/types';
import { CHANGE_NAME, TOGGLE_PUBLIC } from 'store/profile/actions';

export interface ProfileState {
  user: {
    name: string;
  };
  isPublic: boolean;
}

const initialState: ProfileState = {
  user: {
    name: 'Unknown user',
  },
  isPublic: false,
};

export const profileReducer: Reducer<ProfileState, ProfileActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        user: {
          name: action.payload,
        },
      };
    case TOGGLE_PUBLIC:
      return {
        ...state,
        isPublic: !state.isPublic,
      };
    default:
      return state;
  }
};
