import { MessageBox } from 'components/MessageBox/MessageBox';
import { AUTHORS } from '../constants';

export default {
  title: 'MessageBox',
  component: MessageBox,
};

const dummyMessages = [
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
];

export const Primary = () => <MessageBox messageList={dummyMessages} />;

export const RedBlue = () => (
  <MessageBox
    messageList={dummyMessages}
    primaryColor={'red'}
    secondaryColor={'blue'}
  />
);

export const BlueRed = () => (
  <MessageBox
    messageList={dummyMessages}
    primaryColor={'blue'}
    secondaryColor={'red'}
  />
);
