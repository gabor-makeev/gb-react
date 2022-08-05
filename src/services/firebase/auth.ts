import { app } from './firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { addUser } from 'src/services/firebase/users';

export const firebaseAuth = getAuth(app);

export const signUp = async (name: string, email: string, password: string) => {
  await createUserWithEmailAndPassword(firebaseAuth, email, password);

  await addUser(email, name);
};

export const logIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(firebaseAuth, email, password);

export const logOut = async () => await signOut(firebaseAuth);
