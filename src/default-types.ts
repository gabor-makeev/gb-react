export interface NavigationItem {
  id: number;
  name: string;
  path: string;
}

export interface UserProperties {
  createdAt: number;
  isPublic: boolean;
}

export interface FirebaseChat {
  name: string;
  createdAt: number;
  id: string;
}

export type FirebaseChats = FirebaseChat[];

export type Chat = { messages?: Message[] } & FirebaseChat;

export type Chats = Chat[];

export interface FirebaseMessage {
  createdAt: number;
  body: string;
  chatId: string;
}

export type Message = { id: string } & FirebaseMessage;

export enum Authors {
  USER = 'Gabor',
  BOT = '🤖 Bot',
}

export interface Article {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  publishedAt: string;
}
