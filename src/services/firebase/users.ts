import { FirebaseChat } from 'src/default-types';
import { removeMessagesByChat } from 'src/services/firebase/messages';
import {
  UserPropertyType,
  UserRepository,
} from 'src/services/firebase/Repository/UserRepository/UserRepository';

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
