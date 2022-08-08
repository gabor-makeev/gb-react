import { getUserDocRef } from 'src/services/firebase/refs';
import {
  collection,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
  documentId,
} from 'firebase/firestore';
import { FirebaseChat, FirebaseChats, UserProperties } from 'src/default-types';
import { removeMessagesByChat } from 'src/services/firebase/messages';
import { getAuth } from 'firebase/auth';
import { firestoreDatabase } from 'src/services/firebase/firebase';

export const addUser = async (userEmail: string, name: string) => {
  await setDoc(getUserDocRef(userEmail), {
    name,
    createdAt: Timestamp.now(),
    isPublic: false,
    chats: [],
  });
};

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

export const getUserProperties = async (
  userEmail: string
): Promise<UserProperties> => {
  const userDoc = await getDoc(getUserDocRef(userEmail));
  return userDoc.data() as UserProperties;
};

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

export const getUserChats = async (
  userEmail: string
): Promise<FirebaseChats> => {
  const userDoc = await getDoc(getUserDocRef(userEmail));
  return await userDoc.data()?.chats;
};

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
