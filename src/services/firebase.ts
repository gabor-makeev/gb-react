import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { getDatabase, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAh-tV-H0TbqxVHCSqMPdBLwQivTl_1u5I',
  authDomain: 'gb-react-ca669.firebaseapp.com',
  projectId: 'gb-react-ca669',
  storageBucket: 'gb-react-ca669.appspot.com',
  messagingSenderId: '414948860769',
  appId: '1:414948860769:web:184056e3963ddbfdd25b20',
};

const app = initializeApp(firebaseConfig);

// Auth

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

export const database = getDatabase(app);

// Chats

export const chatsRef = ref(database, 'chats');

export const getChatRefById = (chatName: string) =>
  ref(database, `chats/${chatName}`);

export const getMessagesByChatName = (chatName: string) =>
  ref(database, `chats/${chatName}/messages`);

// Profile

export const profileRef = ref(database, 'profile');

export const getProfileChildRef = (child: string) =>
  ref(database, `profile/${child}`);
