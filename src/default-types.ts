import { Timestamp } from 'firebase/firestore';

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
  createdAt: Timestamp;
  id: string;
}

export type FirebaseChats = FirebaseChat[];

export type Chat = { messages?: MessageItemWithId[] } & FirebaseChat;

export type Chats = Chat[];

export interface Message {
  text: string;
  userId: string;
}

export type MessageItemWithId = { id: string } & Message;

export type FirebaseMessage = [string, { text: string; userId: string }];

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
