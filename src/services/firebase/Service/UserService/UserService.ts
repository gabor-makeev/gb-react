import { FirebaseChat } from 'src/default-types';
import {
  UserPropertyType,
  UserRepository,
} from 'src/services/firebase/Repository/UserRepository/UserRepository';
import { removeMessagesByChat } from 'src/services/firebase/messages';

export class UserService {
  public static addChat = async (userEmail: string, newChat: FirebaseChat) => {
    const userData = await UserRepository.getUser(userEmail);
    const newChatExists = userData.chats.find((chat) => chat.id === newChat.id);

    if (!newChatExists) {
      const updatedUserChats = [...userData.chats, newChat];

      await UserRepository.setUserProperty(
        userEmail,
        UserPropertyType.chats,
        updatedUserChats
      );
    }
  };

  public static removeChat = async (
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
}
