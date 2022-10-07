import { getUserDocRef } from 'src/services/firebase/refs';
import { getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { FirebaseChat, FirebaseChats, UserProperties } from 'src/default-types';
import { removeMessagesByChat } from 'src/services/firebase/messages';
import { getAuth } from 'firebase/auth';

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
