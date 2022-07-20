import { app } from './firebase';
import { getDatabase, ref } from 'firebase/database';

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
