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
];

export const AUTHORS = {
  user: Authors.USER,
  bot: Authors.BOT,
};

export const DUMMY_CONTENT = {
  messages: [
    {
      text: 'placerat duis ultricies lacus sed turpis tincidunt id aliquet risus',
      userId: AUTHORS.user,
    },
    {
      text: 'et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit',
      userId: AUTHORS.user,
    },
    {
      text: 'felis eget velit aliquet sagittis id consectetur purus ut faucibus',
      userId: AUTHORS.user,
    },
  ] as any[],
};
