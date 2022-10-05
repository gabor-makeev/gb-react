import { app } from './firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { UserRepository } from 'src/services/firebase/UserRepository/UserRepository';
import { Timestamp } from 'firebase/firestore';

export const firebaseAuth = getAuth(app);

export const signUp = async (name: string, email: string, password: string) => {
  await createUserWithEmailAndPassword(firebaseAuth, email, password);

  await UserRepository.setUserProperties(email, {
    name,
    createdAt: Timestamp.now(),
    isPublic: false,
    chats: [],
  });
};

export const logIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(firebaseAuth, email, password);

export const logOut = async () => await signOut(firebaseAuth);
