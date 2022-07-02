import { Authors, Message } from './default-types';

export const api = 'https://api.spaceflightnewsapi.net/v3/articles';

export const NAVIGATION = [
  {
    id: 1,
    name: 'Main',
    path: '/',
  },
  {
    id: 2,
    name: 'Profile',
    path: '/profile',
  },
  {
    id: 3,
    name: 'Messenger',
    path: '/messenger',
  },
  {
    id: 4,
    name: 'About',
    path: '/about',
  },
  {
    id: 5,
    name: 'Articles',
    path: '/articles',
  },
];

export const AUTHORS = {
  user: Authors.USER,
  bot: Authors.BOT,
};

export const STYLES = {
  color: {
    primary: '#cccccc',
    secondary: '#31E865',
    system: '#FF4F4F',
  },
};

export const DUMMY_CONTENT = {
  messages: [
    {
      text: 'placerat duis ultricies lacus sed turpis tincidunt id aliquet risus',
      author: AUTHORS.user,
    },
    {
      text: 'et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit',
      author: AUTHORS.user,
    },
    {
      text: 'felis eget velit aliquet sagittis id consectetur purus ut faucibus',
      author: AUTHORS.user,
    },
  ] as Message[],
};

export const DUMMY_CHATS = [
  {
    name: 'Garrett',
    id: 1,
  },
  {
    name: 'Jonathan',
    id: 2,
  },
  {
    name: 'Terry',
    id: 3,
  },
  {
    name: 'Rupert',
    id: 4,
  },
  {
    name: 'Laura',
    id: 5,
  },
  {
    name: 'Ellen',
    id: 6,
  },
];
