import { getUserDocRef } from 'src/services/refs';
import { setDoc, Timestamp } from 'firebase/firestore';

export const addUser = async (userEmail: string) => {
  await setDoc(getUserDocRef(userEmail), {
    createdAt: Timestamp.now(),
    isPublic: false,
    chats: [],
  });
};
