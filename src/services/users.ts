import { get, set } from 'firebase/database';
import { usersRef } from 'src/services/refs';

export const createFirebaseEmail = (email: string) => {
  return email.replace(/\./g, '__DOT__');
};

export const addUser = async (userEmail: string) => {
  const getUsersRequest = await get(usersRef);
  const users = await getUsersRequest.val();

  const prevUsers = users ? users : {};
  const nextUsers = Object.assign(prevUsers, {
    [createFirebaseEmail(userEmail)]: {
      isPublic: false,
      createdAt: Date.now(),
    },
  });

  await set(usersRef, nextUsers);
};
