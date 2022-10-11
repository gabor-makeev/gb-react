import { getUserDocRef } from 'src/services/firebase/refs';
import { getDoc } from 'firebase/firestore';
import { FirebaseChat, FirebaseChats } from 'src/default-types';
import { removeMessagesByChat } from 'src/services/firebase/messages';
import {
  UserPropertyType,
  UserRepository,
} from 'src/services/firebase/UserRepository/UserRepository';

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
  const userData = await UserRepository.getUser(userEmail);
  const [targetChatExists] = userData.chats.filter(
    (chat) => chat.id === targetChat.id
  );

  if (!targetChatExists) {
    const userChats = userData.chats;
    const updatedUserChats = [...userChats, targetChat];

    await UserRepository.setUserProperty(
      userEmail,
      UserPropertyType.chats,
      updatedUserChats
    );
  }
};

// TODO: implement removeUserChat() within UserRepository class
export const removeUserChat = async (
  userEmail: string,
  targetChat: FirebaseChat
) => {
  const userData = await UserRepository.getUser(userEmail);
  const userChats = userData.chats;

  userChats.forEach((chat, idx) => {
    if (chat.id === targetChat.id) {
      userChats.splice(idx, 1);
    }
  });

  await UserRepository.setUserProperty(
    userEmail,
    UserPropertyType.chats,
    userChats
  );
  await removeMessagesByChat(targetChat);
};
