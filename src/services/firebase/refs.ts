import { firestoreDatabase, realtimeDatabase } from './firebase';
import { ref } from 'firebase/database';
import { doc } from 'firebase/firestore';

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

export const getUserDocRef = (userEmail: string) => {
  return doc(firestoreDatabase, 'users', userEmail);
};
