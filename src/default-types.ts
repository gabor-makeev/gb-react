export interface NavigationItem {
  id: number;
  name: string;
  path: string;
}

export interface UserProperties {
  name: string;
  createdAt: number;
  isPublic: boolean;
}

export interface FirebaseChat {
  name: string;
  toUserEmail: string;
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
  userEmail?: string;
}

export type FirebaseMessages = FirebaseMessage[];

export type Message = { id: string } & FirebaseMessage;

export type Messages = Message[];

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
