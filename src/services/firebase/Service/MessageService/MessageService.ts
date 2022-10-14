import { FirebaseChat, FirebaseMessage } from 'src/default-types';
import {
  FirebaseMessageType,
  MessageRepository,
} from 'src/services/firebase/Repository/MessageRepository/MessageRepository';
import { UserRepository } from 'src/services/firebase/Repository/UserRepository/UserRepository';
import { UserService } from 'src/services/firebase/Service/UserService/UserService';
import { Timestamp } from 'firebase/firestore';

export class MessageService {
  protected static isChatEmpty = async (chatId: string) => {
    return !(
      await MessageRepository.getMessagesByProperty(
        FirebaseMessageType.chatId,
        chatId
      )
    ).length;
  };

  public static sendMessage = async (message: FirebaseMessage) => {
    const userData = await UserRepository.getUser(message.userEmail as string);
    const chat = userData.chats.find(
      (chat) => chat.id === message.chatId
    ) as FirebaseChat;

    if (await MessageService.isChatEmpty(message.chatId)) {
      await UserService.addChat(chat.toUserEmail, {
        name: message.userName,
        toUserEmail: message.userEmail as string,
        createdAt: Timestamp.now().toMillis(),
        id: message.chatId,
      });
    }

    await MessageRepository.addMessage(message);
  };
}
