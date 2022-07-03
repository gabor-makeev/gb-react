import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAh-tV-H0TbqxVHCSqMPdBLwQivTl_1u5I',
  authDomain: 'gb-react-ca669.firebaseapp.com',
  projectId: 'gb-react-ca669',
  storageBucket: 'gb-react-ca669.appspot.com',
  messagingSenderId: '414948860769',
  appId: '1:414948860769:web:184056e3963ddbfdd25b20',
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

export const signUp = async (email: string, password: string) =>
  await createUserWithEmailAndPassword(firebaseAuth, email, password);

export const logIn = async (email: string, password: string) =>
  await signInWithEmailAndPassword(firebaseAuth, email, password);

export const logOut = async () => await signOut(firebaseAuth);
