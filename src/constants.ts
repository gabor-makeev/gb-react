import { Authors, Messages } from './default-types';

export const api = 'https://api.spaceflightnewsapi.net/v3/articles';

export const NAVIGATION = [
  {
    id: 1,
    name: 'Home',
    path: '/',
  },
  {
    id: 2,
    name: 'Profile',
  },
  {
    id: 3,
    name: 'Messenger',
    path: '/messenger',
  },
  {
    id: 4,
    name: 'Log in',
    path: '/signin',
  },
];

export const DUMMY_CONTENT = {
  messages: [
    {
      body: 'placerat duis ultricies lacus sed turpis tincidunt id aliquet risus',
      userEmail: Authors.USER,
      userName: Authors.USER,
      createdAt: 875300400000,
    },
    {
      body: 'et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit',
      userEmail: Authors.USER,
      userName: Authors.USER,
      createdAt: 875300400000,
    },
    {
      body: 'felis eget velit aliquet sagittis id consectetur purus ut faucibus',
      userEmail: Authors.USER,
      userName: Authors.USER,
      createdAt: 875300400000,
    },
  ] as Messages,
};
