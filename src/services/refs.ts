import { app } from './firebase';
import { getDatabase, ref } from 'firebase/database';
import { createFirebaseEmail } from 'src/services/users';

export const database = getDatabase(app);

// Chats

export const chatsRef = ref(database, 'chats');

export const getChatRefById = (chatName: string) =>
  ref(database, `chats/${chatName}`);

export const getMessagesByChatName = (chatName: string) =>
  ref(database, `chats/${chatName}/messages`);

// Profile

export const profileRef = ref(database, 'profile');

export const getProfileChildRef = (child: string) =>
  ref(database, `profile/${child}`);

// Users

export const usersRef = ref(database, 'users');

export const getUserPropertiesByEmail = (email: string) =>
  ref(database, `users/${createFirebaseEmail(email)}`);

export const getUserPropertyByEmailAndPropertyName = (
  email: string,
  property: string
) => ref(database, `users/${createFirebaseEmail(email)}/${property}`);
