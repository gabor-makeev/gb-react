import { Message } from './Message';
import { DUMMY_CONTENT } from '../../../../constants';

export default {
  title: 'Message',
  component: Message,
};

const dummyMessage = DUMMY_CONTENT.messages[0];

const Template = (args) => <Message message={dummyMessage} {...args} />;

export const Primary = Template.bind({});

export const Big = Template.bind({});
Big.args = {
  padding: '25px 15px',
  maxWidth: '300px',
};

export const Small = Template.bind({});
Small.args = {
  padding: '15px 10px',
  maxWidth: '250px',
};
