import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { firestoreDatabase } from 'src/services/firebase/firebase';
import { FirebaseChats } from 'src/default-types';

export enum UserPropertyType {
  chats = 'chats',
  createdAt = 'createdAt',
  isPublic = 'isPublic',
  name = 'name',
}

type UserProperties = {
  [UserPropertyType.chats]: FirebaseChats;
  [UserPropertyType.createdAt]: Timestamp;
  [UserPropertyType.isPublic]: boolean;
  [UserPropertyType.name]: string;
};

export class UserRepository {
  protected static path = 'users';

  protected static getDocRef = (email: string) => {
    return doc(firestoreDatabase, UserRepository.path, email);
  };

  public static setUserProperty = async <P extends keyof UserProperties>(
    userEmail: string,
    property: P,
    value: UserProperties[P]
  ) => {
    const docRef = UserRepository.getDocRef(userEmail);
    await setDoc(docRef, { [property]: value }, { merge: true });
  };

  public static setUserProperties = async (
    userEmail: string,
    userProperties: UserProperties
  ) => {
    const docRef = UserRepository.getDocRef(userEmail);
    await setDoc(docRef, userProperties);
  };

  public static getUser = async (userEmail: string) => {
    const docRef = UserRepository.getDocRef(userEmail);
    const doc = await getDoc(docRef);
    const userData = await doc.data();

    return userData;
  };
}
