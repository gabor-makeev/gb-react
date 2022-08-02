import {
  query,
  collection,
  where,
  addDoc,
  orderBy,
  getDocs,
  deleteDoc,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { firestoreDatabase } from 'src/services/firebase/firebase';
import { FirebaseChat, FirebaseMessage, Messages } from 'src/default-types';
import { getAuth } from 'firebase/auth';

export const messagesRef = collection(firestoreDatabase, 'messages');

export const getMessagesQueryByChatId = (chatId: string) => {
  return query(
    messagesRef,
    orderBy('createdAt'),
    where('chatId', '==', chatId)
  );
};

export const createFirebaseMessageObject = (
  chatId: string,
  messageBody: string
): FirebaseMessage => {
  return {
    createdAt: Timestamp.now().toMillis(),
    body: messageBody,
    chatId: chatId,
    userEmail: getAuth().currentUser?.email as string,
  };
};

export const subscribeToMessagesByChatId = (
  chatId: string,
  cb: (messages: Messages) => void
) => {
  return onSnapshot(getMessagesQueryByChatId(chatId), (querySnapshot) => {
    const messages: Messages = [];
    querySnapshot.forEach((message) => {
      const firebaseMessage = message.data() as FirebaseMessage;
      messages.push(Object.assign(firebaseMessage, { id: message.id }));
    });

    cb(messages);
  });
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
