import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { onValue, set } from 'firebase/database';
import { getProfileChildRef, profileRef } from 'src/services/firebase';
import { Dispatch } from 'redux';

interface ProfileState {
  user: {
    name: string;
  };
  isPublic: boolean;
  isAuth: boolean;
}

const initialState: ProfileState = {
  user: {
    name: 'Unknown user',
  },
  isPublic: false,
  isAuth: false,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setProfile: (state, action) => {
      state.user = action.payload.user;
      state.isPublic = action.payload.isPublic;
    },
  },
});

export const changeUserNameWithFirebase = (newUserName: string) => async () => {
  set(getProfileChildRef('user'), {
    name: newUserName,
  });
};

export const setIsPublicWithFirebase = (isPublic: boolean) => async () => {
  set(getProfileChildRef('isPublic'), isPublic);
};

export const initProfileTracking = () => (dispatch: Dispatch) => {
  onValue(profileRef, async (snapshot) => {
    const snapshotVal = await snapshot.val();

    if (!snapshotVal) {
      set(profileRef, {
        user: initialState.user,
        isPublic: initialState.isPublic,
      });

      return;
    }

    dispatch(profileSlice.actions.setProfile(snapshotVal));
  });
};

export const { setAuth } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
