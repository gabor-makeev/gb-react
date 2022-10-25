import { Authors, IClientMessage } from './default-types';

export const api = 'https://api.spaceflightnewsapi.net/v3/articles';

enum Url {
  default = '/',
  ghPages = '/gb-react/',
}

export const BASE_URL = Url.default;

export const NAVIGATION = [
  {
    id: 1,
    name: 'Home',
    path: BASE_URL,
  },
  {
    id: 2,
    name: 'Profile',
  },
  {
    id: 3,
    name: 'Messenger',
    path: `${BASE_URL}messenger`,
  },
  {
    id: 4,
    name: 'Log in',
    path: `${BASE_URL}signin`,
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
  ] as IClientMessage[],
};
