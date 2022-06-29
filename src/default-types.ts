export interface NavigationItem {
  id: number;
  name: string;
  path: string;
}

export interface Chat {
  name: string;
  id: string;
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
}
