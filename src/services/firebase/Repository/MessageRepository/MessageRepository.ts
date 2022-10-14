import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  QueryConstraint,
  where,
  addDoc,
} from 'firebase/firestore';
import { firestoreDatabase } from 'src/services/firebase/firebase';
import { FirebaseMessage, Message } from 'src/default-types';

export enum FirebaseMessageType {
  body = 'body',
  chatId = 'chatId',
  createdAt = 'createdAt',
  userEmail = 'userEmail',
  userName = 'userName',
}

type FirebaseMessageProperties = {
  [FirebaseMessageType.body]: string;
  [FirebaseMessageType.chatId]: string;
  [FirebaseMessageType.createdAt]: number;
  [FirebaseMessageType.userEmail]: string;
  [FirebaseMessageType.userName]: string;
};

export class MessageRepository {
  protected static path = 'messages';

  protected static getMessagesCollection = () => {
    return collection(firestoreDatabase, MessageRepository.path);
  };

  protected static getMessagesQuery = (...constraints: QueryConstraint[]) => {
    return query(
      MessageRepository.getMessagesCollection(),
      ...[orderBy(FirebaseMessageType.createdAt), ...constraints]
    );
  };

  protected static getMessagesFromMessagesQuerySnapshot = (
    firebaseMessages: QuerySnapshot
  ) => {
    const messages: Message[] = [];

    firebaseMessages.forEach((firebaseMessage) =>
      messages.push(
        Object.assign(firebaseMessage.data() as FirebaseMessage, {
          id: firebaseMessage.id,
        })
      )
    );

    return messages;
  };

  public static getMessagesByProperty = async <
    P extends keyof FirebaseMessageProperties
  >(
    property: P,
    value: FirebaseMessageProperties[P]
  ) => {
    const query = MessageRepository.getMessagesQuery(
      where(property, '==', value)
    );

    return MessageRepository.getMessagesFromMessagesQuerySnapshot(
      await getDocs(query)
    );
  };

  public static subscribeToMessagesByProperty = async <
    P extends keyof FirebaseMessageProperties
  >(
    property: P,
    value: FirebaseMessageProperties[P],
    cb: (messages: Message[]) => void
  ) => {
    const query = MessageRepository.getMessagesQuery(
      where(property, '==', value)
    );

    onSnapshot(query, (messagesQuerySnapshot) => {
      cb(
        MessageRepository.getMessagesFromMessagesQuerySnapshot(
          messagesQuerySnapshot
        )
      );
    });
  };

  public static addMessage = async (message: FirebaseMessage) => {
    await addDoc(MessageRepository.getMessagesCollection(), message);
  };
}
