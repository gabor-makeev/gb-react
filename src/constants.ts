import { Authors, Messages } from './default-types';

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
      body: 'placerat duis ultricies lacus sed turpis tincidunt id aliquet risus',
      userEmail: AUTHORS.user,
    },
    {
      body: 'et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit',
      userEmail: AUTHORS.user,
    },
    {
      body: 'felis eget velit aliquet sagittis id consectetur purus ut faucibus',
      userEmail: AUTHORS.user,
    },
  ] as Messages,
};
