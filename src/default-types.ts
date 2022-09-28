import { Timestamp } from 'firebase/firestore';

export interface NavigationItem {
  id: number;
  name: string;
  path?: string;
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
  userName: string;
  userEmail?: string;
}

export type FirebaseMessages = FirebaseMessage[];

export type Message = { id: string } & FirebaseMessage;

export type Messages = Message[];

export interface FirebaseUserProperties {
  chats: FirebaseChat[];
  createdAt: Timestamp;
  isPublic: boolean;
  name: string;
}

export type UserProperties = { email: string } & FirebaseUserProperties;

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
