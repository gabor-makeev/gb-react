import { Timestamp } from 'firebase/firestore';

export interface NavigationItem {
  id: number;
  name: string;
  path?: string;
}

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

// Firebase types / interfaces / enums

// MESSAGES

export enum EFirebaseMessageProperty {
  body = 'body',
  chatId = 'chatId',
  createdAt = 'createdAt',
  userEmail = 'userEmail',
  userName = 'userName',
}

export interface IFirebaseMessage {
  [EFirebaseMessageProperty.body]: string;
  [EFirebaseMessageProperty.chatId]: string;
  [EFirebaseMessageProperty.createdAt]: number;
  [EFirebaseMessageProperty.userEmail]: string;
  [EFirebaseMessageProperty.userName]: string;
}

// USERS

export enum EFirebaseUserProperty {
  chats = 'chats',
  createdAt = 'createdAt',
  isPublic = 'isPublic',
  name = 'name',
}

export interface IFirebaseUserChat {
  toUserEmail: string;
  createdAt: number;
  id: string;
}

export interface IFirebaseUser {
  [EFirebaseUserProperty.chats]: IFirebaseUserChat[];
  [EFirebaseUserProperty.createdAt]: Timestamp;
  [EFirebaseUserProperty.isPublic]: boolean;
  [EFirebaseUserProperty.name]: string;
}

// CLIENT MESSAGES

export interface IClientMessage extends IFirebaseMessage {
  id: string;
}

// CLIENT USERS

export interface IClientUser extends IFirebaseUser {
  email: string;
}

export interface IClientUserChat extends IFirebaseUserChat {
  userName: string;
}
