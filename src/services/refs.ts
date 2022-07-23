import { realtimeDatabase } from './firebase';
import { ref } from 'firebase/database';
import { createFirebaseEmail } from 'src/services/users';

// Chats

export const chatsRef = ref(realtimeDatabase, 'chats');

export const getChatRefById = (chatName: string) =>
  ref(realtimeDatabase, `chats/${chatName}`);

export const getMessagesByChatName = (chatName: string) =>
  ref(realtimeDatabase, `chats/${chatName}/messages`);

// Profile

export const profileRef = ref(realtimeDatabase, 'profile');

export const getProfileChildRef = (child: string) =>
  ref(realtimeDatabase, `profile/${child}`);

// Users

export const usersRef = ref(realtimeDatabase, 'users');

export const getUserPropertiesByEmail = (email: string) =>
  ref(realtimeDatabase, `users/${createFirebaseEmail(email)}`);

export const getUserPropertyByEmailAndPropertyName = (
  email: string,
  property: string
) => ref(realtimeDatabase, `users/${createFirebaseEmail(email)}/${property}`);
