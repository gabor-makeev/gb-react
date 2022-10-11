import { FirebaseChat } from 'src/default-types';
import { removeMessagesByChat } from 'src/services/firebase/messages';
import {
  UserPropertyType,
  UserRepository,
} from 'src/services/firebase/UserRepository/UserRepository';

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
