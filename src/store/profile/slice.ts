import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileState {
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
    changeName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    togglePublic: (state) => {
      state.isPublic = !state.isPublic;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
});

export const { changeName, togglePublic, setAuth } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
