import { StoreState } from 'src/store';

export const selectIsAuth = (state: StoreState) => state.auth.isAuth;
export const selectIsAuthLoading = (state: StoreState) => state.auth.isLoading;
