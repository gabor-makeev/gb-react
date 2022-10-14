import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { firestoreDatabase } from 'src/services/firebase/firebase';
import { FirebaseChat, FirebaseMessage } from 'src/default-types';
import { UserRepository } from 'src/services/firebase/Repository/UserRepository/UserRepository';
import { UserService } from 'src/services/firebase/Service/UserService/UserService';
import {
  MessageRepository,
  FirebaseMessageType,
} from 'src/services/firebase/Repository/MessageRepository/MessageRepository';

export const messagesRef = collection(firestoreDatabase, 'messages');

export const getMessagesQueryByChatId = (chatId: string) => {
  return query(
    messagesRef,
    orderBy('createdAt'),
    where('chatId', '==', chatId)
  );
};

export const addMessage = async (message: FirebaseMessage) => {
  const authUserEmail = getAuth().currentUser?.email as string;
  const authUserProperties = await UserRepository.getUser(authUserEmail);
  const [chat] = authUserProperties.chats.filter(
    (chat) => chat.id === message.chatId
  );

  if (
    chat &&
    !(
      await MessageRepository.getMessagesByProperty(
        FirebaseMessageType.chatId,
        chat.id
      )
    ).length
  ) {
    await UserService.addChat(chat.toUserEmail, {
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
