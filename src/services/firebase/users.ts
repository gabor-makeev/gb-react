import { getUserDocRef } from 'src/services/firebase/refs';
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
  documentId,
} from 'firebase/firestore';
import { FirebaseChat, FirebaseChats, UserProperties } from 'src/default-types';
import { removeMessagesByChat } from 'src/services/firebase/messages';
import { getAuth } from 'firebase/auth';
import { firestoreDatabase } from 'src/services/firebase/firebase';

// TODO: implement getUsersByName() within UserRepository class
export const getUsersByName = async (name: string) => {
  const authUserEmail = getAuth().currentUser?.email;
  const usersRef = collection(firestoreDatabase, 'users');

  const usersQuery = query(
    usersRef,
    where('name', '==', name),
    where(documentId(), '!=', authUserEmail)
  );

  const users: UserProperties[] = [];
  const usersDocs = await getDocs(usersQuery);

  usersDocs.forEach((usersDoc) => {
    users.push(
      Object.assign(usersDoc.data(), { email: usersDoc.id }) as UserProperties
    );
  });

  return users;
};

// TODO: implement getUserProperties() within UserRepository class
export const getUserProperties = async (
  userEmail: string
): Promise<UserProperties> => {
  const userDoc = await getDoc(getUserDocRef(userEmail));
  return userDoc.data() as UserProperties;
};

// TODO: implement subscribeToUserProperties() within UserRepository class
export const subscribeToUserProperties = (
  cb: (userProperties: UserProperties) => void
) => {
  return onSnapshot(
    getUserDocRef(getAuth().currentUser?.email as string),
    async (doc) => {
      const dataSnapshot = await doc.data();
      if (dataSnapshot) {
        cb(dataSnapshot as UserProperties);
      }
    }
  );
};

// TODO: implement getUserChats() within UserRepository class
export const getUserChats = async (
  userEmail: string
): Promise<FirebaseChats> => {
  const userDoc = await getDoc(getUserDocRef(userEmail));
  return await userDoc.data()?.chats;
};

// TODO: implement getUserChatByChatId() within UserRepository class
export const getUserChatByChatId = async (
  userEmail: string,
  chatId: string
): Promise<FirebaseChat | null> => {
  const userDoc = await getDoc(getUserDocRef(userEmail));
  const chats = (await userDoc.data()?.chats) as FirebaseChats;

  let targetChat = null;

  chats.forEach((chat) => {
    if (chat.id === chatId) {
      targetChat = chat;
    }
  });

  return targetChat;
};

// TODO: implement getUserChatByToUserEmail() within UserRepository class
export const getUserChatByToUserEmail = async (
  userEmail: string,
  toUserEmail: string
): Promise<FirebaseChat | null> => {
  const userDoc = await getDoc(getUserDocRef(userEmail));
  const chats = (await userDoc.data()?.chats) as FirebaseChats;

  let targetChat = null;

  chats.forEach((chat) => {
    if (chat.toUserEmail === toUserEmail) {
      targetChat = chat;
    }
  });

  return targetChat;
};

// TODO: implement addUserChat() within UserRepository class
export const addUserChat = async (
  userEmail: string,
  targetChat: FirebaseChat
) => {
  const targetChatExists = await getUserChatByChatId(userEmail, targetChat.id);

  if (!targetChatExists) {
    const chats = await getUserChats(userEmail);

    setDoc(
      getUserDocRef(userEmail),
      {
        chats: [...chats, targetChat],
      },
      { merge: true }
    );
  }
};

// TODO: implement removeUserChat() within UserRepository class
export const removeUserChat = async (
  userEmail: string,
  targetChat: FirebaseChat
) => {
  const chats = await getUserChats(userEmail);

  chats.forEach((chat, idx) => {
    if (chat.id === targetChat.id) {
      chats.splice(idx, 1);
    }
  });

  setDoc(
    getUserDocRef(userEmail),
    {
      chats,
    },
    { merge: true }
  );

  removeMessagesByChat(targetChat);
};
