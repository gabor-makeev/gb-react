import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { firestoreDatabase } from 'src/services/firebase/firebase';
import { IClientUser, IFirebaseUser } from 'src/default-types';

export class UserRepository {
  protected static path = 'users';

  protected static getUserDocRef = (email: string) => {
    return doc(firestoreDatabase, UserRepository.path, email);
  };

  protected static getUsersCollectionRef = () => {
    return collection(firestoreDatabase, UserRepository.path);
  };

  public static getUser = async (userEmail: string): Promise<IFirebaseUser> => {
    const docRef = UserRepository.getUserDocRef(userEmail);
    const doc = await getDoc(docRef);
    const userData = (await doc.data()) as IFirebaseUser;

    return userData;
  };

  public static getUsersByName = async (name: string) => {
    const usersQuery = query(
      UserRepository.getUsersCollectionRef(),
      where('name', '==', name)
    );

    const users: IClientUser[] = [];
    const usersDocs = await getDocs(usersQuery);

    usersDocs.forEach((userDoc) => {
      users.push(
        Object.assign(userDoc.data(), { email: userDoc.id }) as IClientUser
      );
    });

    return users;
  };

  public static subscribeToUser = (
    userEmail: string,
    cb: (userData: IFirebaseUser) => void
  ) => {
    return onSnapshot(UserRepository.getUserDocRef(userEmail), async (doc) => {
      const userData = (await doc.data()) as IFirebaseUser;
      cb(userData);
    });
  };

  public static setUserProperty = async <P extends keyof IFirebaseUser>(
    userEmail: string,
    property: P,
    value: IFirebaseUser[P]
  ) => {
    const docRef = UserRepository.getUserDocRef(userEmail);
    await setDoc(docRef, { [property]: value }, { merge: true });
  };

  public static setUserProperties = async (
    userEmail: string,
    userProperties: IFirebaseUser
  ) => {
    const docRef = UserRepository.getUserDocRef(userEmail);
    await setDoc(docRef, userProperties);
  };
}
