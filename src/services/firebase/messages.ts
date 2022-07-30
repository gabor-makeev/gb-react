import {
  query,
  collection,
  where,
  addDoc,
  orderBy,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { firestoreDatabase } from 'src/services/firebase/firebase';
import { FirebaseChat, FirebaseMessage } from 'src/default-types';

export const messagesRef = collection(firestoreDatabase, 'messages');

export const getMessagesQueryByChatId = (chatId: string) => {
  return query(
    messagesRef,
    orderBy('createdAt'),
    where('chatId', '==', chatId)
  );
};

export const addMessage = async (message: FirebaseMessage) => {
  await addDoc(messagesRef, message);
};

export const removeMessagesByChat = async (chat: FirebaseChat) => {
  const messages = await getDocs(getMessagesQueryByChatId(chat.id));
  messages.forEach((message) => {
    deleteDoc(message.ref);
  });
};
