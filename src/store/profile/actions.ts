import { ChangeName, TogglePublic } from 'store/profile/types';

export const CHANGE_NAME = 'PROFILE::CHANGE_NAME';
export const TOGGLE_PUBLIC = 'PROFILE::TOGGLE_PUBLIC';

export const changeName = (name: string): ChangeName => ({
  type: CHANGE_NAME,
  payload: name,
});

export const togglePublic = (): TogglePublic => ({
  type: TOGGLE_PUBLIC,
});
