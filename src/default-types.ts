export interface NavigationItem {
  id: number;
  name: string;
  path: string;
}

export interface FirebaseChats {
  [id: string]: {
    createdAt: string;
  };
}

export interface Chat {
  id: string;
  name: string;
}

export interface Message {
  text: string;
  author: Authors;
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
}
