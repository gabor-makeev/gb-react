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
    path: '/profile',
  },
  {
    id: 3,
    name: 'Messenger',
    path: '/messenger',
  },
];

export const DUMMY_CONTENT = {
  messages: [
    {
      body: 'placerat duis ultricies lacus sed turpis tincidunt id aliquet risus',
      userEmail: Authors.USER,
      userName: Authors.USER,
    },
    {
      body: 'et molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit',
      userEmail: Authors.USER,
      userName: Authors.USER,
    },
    {
      body: 'felis eget velit aliquet sagittis id consectetur purus ut faucibus',
      userEmail: Authors.USER,
      userName: Authors.USER,
    },
  ] as Messages,
};
