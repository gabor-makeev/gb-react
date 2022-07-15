export interface NavigationItem {
  id: number;
  name: string;
  path: string;
}

export interface FirebaseChats {
  [id: string]: {
    createdAt: string;
    messages?: {
      [id: string]: Message;
    };
  };
}

export interface Message {
  text: string;
  author: string;
}

export type MessageItemWithId = { id: string } & Message;

export type FirebaseMessage = [string, { text: string; author: string }];

export interface Chat {
  messages?: MessageItemWithId[];
}

export interface Chats {
  [key: string]: Chat;
}

export type FirebaseChat = [
  string,
  {
    createdAt: string;
    messages: {
      [key: string]: Message;
    };
  }
];

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
