export interface NavigationItem {
  id: number;
  name: string;
  path: string;
}

export interface ChatItem {
  name: string;
  id: string;
}

export enum Authors {
  USER = 'Gabor',
  BOT = '🤖 Bot',
}
