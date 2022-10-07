import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { firestoreDatabase } from 'src/services/firebase/firebase';
import { FirebaseChat, FirebaseMessage, Messages } from 'src/default-types';
import { addUserChat, getUserChatByChatId } from 'src/services/firebase/users';
import { UserRepository } from 'src/services/firebase/UserRepository/UserRepository';

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
  body: string,
  userName: string
): FirebaseMessage => {
  return {
    body,
    chatId,
    userName,
    createdAt: Timestamp.now().toMillis(),
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

export const getMessagesByChatId = async (chatId: string) => {
  const messages: FirebaseMessage[] = [];
  const firestoreMessages = await getDocs(getMessagesQueryByChatId(chatId));

  firestoreMessages.forEach((firestoreMessage) => {
    messages.push(firestoreMessage.data() as FirebaseMessage);
  });

  return messages;
};

export const addMessage = async (message: FirebaseMessage) => {
  const authUserEmail = getAuth().currentUser?.email as string;
  const authUserProperties = await UserRepository.getUser(authUserEmail);
  const chat = await getUserChatByChatId(authUserEmail, message.chatId);

  if (chat && !(await getMessagesByChatId(chat.id)).length) {
    await addUserChat(chat.toUserEmail, {
      name: authUserProperties?.name,
      toUserEmail: authUserEmail,
      createdAt: Timestamp.now().toMillis(),
      id: chat.id,
    });
  }

  await addDoc(messagesRef, message);
};

export const removeMessagesByChat = async (chat: FirebaseChat) => {
  const messages = await getDocs(getMessagesQueryByChatId(chat.id));
  messages.forEach((message) => {
    deleteDoc(message.ref);
  });
};
