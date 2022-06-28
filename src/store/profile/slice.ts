import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  },
});

export const { changeName, togglePublic } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
