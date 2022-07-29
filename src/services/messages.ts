import { query, collection, where, addDoc, orderBy } from 'firebase/firestore';
import { firestoreDatabase } from 'src/services/firebase';
import { FirebaseMessage } from 'src/default-types';

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
