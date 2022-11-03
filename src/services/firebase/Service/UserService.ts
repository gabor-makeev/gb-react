import { UserRepository } from 'src/services/firebase/Repository/UserRepository';
import { MessageRepository } from 'src/services/firebase/Repository/MessageRepository';
import {
  EFirebaseMessageProperty,
  EFirebaseUserProperty,
  IClientUserChat,
  IFirebaseUserChat,
} from 'src/default-types';

export class UserService {
  public static addChat = async (
    userEmail: string,
    newChat: IFirebaseUserChat
  ) => {
    const userData = await UserRepository.getUser(userEmail);
    const newChatExists = userData.chats.find((chat) => chat.id === newChat.id);

    if (!newChatExists) {
      const updatedUserChats = [...userData.chats, newChat];

      await UserRepository.setUserProperty(
        userEmail,
        EFirebaseUserProperty.chats,
        updatedUserChats
      );
    }
  };

  public static removeChat = async (
    userEmail: string,
    targetChat: IFirebaseUserChat
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
      EFirebaseUserProperty.chats,
      userChats
    );

    await MessageRepository.removeMessagesByProperty(
      EFirebaseMessageProperty.chatId,
      targetChat.id
    );
  };

  public static subscribeToChats = (
    userEmail: string,
    cb: (chats: IClientUserChat[]) => void
  ) => {
    return UserRepository.subscribeToUser(userEmail, async (userData) => {
      const chats: IClientUserChat[] = [];

      for (const firebaseChat of userData[EFirebaseUserProperty.chats]) {
        const user = await UserRepository.getUser(firebaseChat.toUserEmail);

        chats.push(
          Object.assign(
            { userName: user[EFirebaseUserProperty.name] },
            firebaseChat
          )
        );
      }

      cb(chats);
    });
  };
}
