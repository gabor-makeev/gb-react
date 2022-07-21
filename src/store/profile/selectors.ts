import { StoreState } from 'src/store';

export const selectIsAuth = (state: StoreState) => state.auth.isAuth;
