import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { app } from 'src/services/firebase/firebase';
import { UserRepository } from 'src/services/firebase/Repository/UserRepository';
import { Timestamp } from 'firebase/firestore';

export class AuthService {
  public static firebaseAuth = getAuth(app);

  public static signUp = async (
    name: string,
    email: string,
    password: string
  ) => {
    await createUserWithEmailAndPassword(
      AuthService.firebaseAuth,
      email,
      password
    );

    await UserRepository.setUserProperties(email, {
      name,
      createdAt: Timestamp.now(),
      isPublic: false,
      chats: [],
    });
  };

  public static logIn = async (email: string, password: string) =>
    await signInWithEmailAndPassword(AuthService.firebaseAuth, email, password);

  public static logOut = async () => await signOut(AuthService.firebaseAuth);
}
