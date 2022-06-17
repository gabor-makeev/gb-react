import { CHANGE_NAME, TOGGLE_PUBLIC } from 'store/profile/actions';

export type ProfileActions = ChangeName | TogglePublic;

export interface ChangeName {
  type: typeof CHANGE_NAME;
  payload: string;
}

export interface TogglePublic {
  type: typeof TOGGLE_PUBLIC;
}
