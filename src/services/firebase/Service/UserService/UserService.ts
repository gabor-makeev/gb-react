import { FirebaseChat } from 'src/default-types';
import {
  UserPropertyType,
  UserRepository,
} from 'src/services/firebase/Repository/UserRepository/UserRepository';

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
}
