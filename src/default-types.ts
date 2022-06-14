export interface MessageItem {
  text: string;
  author: string;
}

export interface MessageList {
  [key: string]: MessageItem[];
}

export interface NavigationItem {
  id: number;
  name: string;
  path: string;
}

export interface ChatItem {
  name: string;
  id: string;
}
