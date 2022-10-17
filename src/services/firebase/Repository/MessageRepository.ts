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
  writeBatch,
} from 'firebase/firestore';
import { firestoreDatabase } from 'src/services/firebase/firebase';
import {
  EFirebaseMessageProperty,
  IClientMessage,
  IFirebaseMessage,
} from 'src/default-types';

export class MessageRepository {
  protected static path = 'messages';

  protected static getWriteBatch = () => {
    return writeBatch(firestoreDatabase);
  };

  protected static getMessagesCollection = () => {
    return collection(firestoreDatabase, MessageRepository.path);
  };

  protected static getMessagesQuery = (...constraints: QueryConstraint[]) => {
    return query(
      MessageRepository.getMessagesCollection(),
      ...[orderBy(EFirebaseMessageProperty.createdAt), ...constraints]
    );
  };

  protected static getMessagesFromMessagesQuerySnapshot = (
    firebaseMessages: QuerySnapshot
  ) => {
    const messages: IClientMessage[] = [];

    firebaseMessages.forEach((firebaseMessage) =>
      messages.push(
        Object.assign(firebaseMessage.data() as IFirebaseMessage, {
          id: firebaseMessage.id,
        })
      )
    );

    return messages;
  };

  public static getMessagesByProperty = async <
    P extends keyof IFirebaseMessage
  >(
    property: P,
    value: IFirebaseMessage[P]
  ) => {
    const query = MessageRepository.getMessagesQuery(
      where(property, '==', value)
    );

    return MessageRepository.getMessagesFromMessagesQuerySnapshot(
      await getDocs(query)
    );
  };

  public static subscribeToMessagesByProperty = async <
    P extends keyof IFirebaseMessage
  >(
    property: P,
    value: IFirebaseMessage[P],
    cb: (messages: IClientMessage[]) => void
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

  public static addMessage = async (message: IFirebaseMessage) => {
    await addDoc(MessageRepository.getMessagesCollection(), message);
  };

  public static removeMessagesByProperty = async <
    P extends keyof IFirebaseMessage
  >(
    property: P,
    value: IFirebaseMessage[P]
  ) => {
    const batch = MessageRepository.getWriteBatch();
    const query = await MessageRepository.getMessagesQuery(
      where(property, '==', value)
    );
    const messagesSnapshot = await getDocs(query);

    messagesSnapshot.forEach((messageSnapshot) =>
      batch.delete(messageSnapshot.ref)
    );

    await batch.commit();
  };
}
