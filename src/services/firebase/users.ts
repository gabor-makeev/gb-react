import { getUserDocRef } from 'src/services/firebase/refs';
import { getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { FirebaseChat, FirebaseChats } from 'src/default-types';
import { removeMessagesByChat } from 'src/services/firebase/messages';

export const addUser = async (userEmail: string, name: string) => {
  await setDoc(getUserDocRef(userEmail), {
    name,
    createdAt: Timestamp.now(),
    isPublic: false,
    chats: [],
  });
};

export const getUserProperties = async (userEmail: string) => {
  const userDoc = await getDoc(getUserDocRef(userEmail));
  return userDoc.data();
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
) => {
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

export const addUserChat = async (
  userEmail: string,
  targetChat: FirebaseChat
) => {
  const chats = await getUserChats(userEmail);

  setDoc(
    getUserDocRef(userEmail),
    {
      chats: [...chats, targetChat],
    },
    { merge: true }
  );
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
