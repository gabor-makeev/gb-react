import { app } from './firebase';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

export const firebaseAuth = getAuth(app);

export const signUp = async (name: string, email: string, password: string) => {
  const operation = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );

  await updateProfile(operation.user, {
    displayName: name,
  });
};

export const logIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(firebaseAuth, email, password);

export const logOut = async () => await signOut(firebaseAuth);
