import { StoreState } from 'src/store';

export const selectIsPublic = (state: StoreState) => state.profile.isPublic;

export const selectUserName = (state: StoreState) => state.profile.user.name;

export const selectIsAuth = (state: StoreState) => state.profile.isAuth;
