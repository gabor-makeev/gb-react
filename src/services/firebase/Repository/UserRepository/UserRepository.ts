import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { firestoreDatabase } from 'src/services/firebase/firebase';
import { FirebaseChats } from 'src/default-types';
import { UserProperties as IUserProperties } from 'src/default-types';

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

  protected static getUserDocRef = (email: string) => {
    return doc(firestoreDatabase, UserRepository.path, email);
  };

  protected static getUsersCollectionRef = () => {
    return collection(firestoreDatabase, UserRepository.path);
  };

  public static getUser = async (
    userEmail: string
  ): Promise<IUserProperties> => {
    const docRef = UserRepository.getUserDocRef(userEmail);
    const doc = await getDoc(docRef);
    const userData = (await doc.data()) as IUserProperties;

    return userData;
  };

  public static getUsersByName = async (name: string) => {
    const usersQuery = query(
      UserRepository.getUsersCollectionRef(),
      where('name', '==', name)
    );

    const users: IUserProperties[] = [];
    const usersDocs = await getDocs(usersQuery);

    usersDocs.forEach((userDoc) => {
      users.push(
        Object.assign(userDoc.data(), { email: userDoc.id }) as IUserProperties
      );
    });

    return users;
  };

  public static subscribeToUser = (
    userEmail: string,
    cb: (userData: IUserProperties) => void
  ) => {
    return onSnapshot(UserRepository.getUserDocRef(userEmail), async (doc) => {
      const userData = (await doc.data()) as IUserProperties;
      cb(userData);
    });
  };

  public static setUserProperty = async <P extends keyof UserProperties>(
    userEmail: string,
    property: P,
    value: UserProperties[P]
  ) => {
    const docRef = UserRepository.getUserDocRef(userEmail);
    await setDoc(docRef, { [property]: value }, { merge: true });
  };

  public static setUserProperties = async (
    userEmail: string,
    userProperties: UserProperties
  ) => {
    const docRef = UserRepository.getUserDocRef(userEmail);
    await setDoc(docRef, userProperties);
  };
}
