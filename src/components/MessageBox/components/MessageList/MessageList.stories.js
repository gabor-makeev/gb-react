import { MessageList } from './MessageList';
import { DUMMY_CONTENT } from '../../../../constants';

export default {
  title: 'MessageList',
  component: MessageList,
};

const Template = (args) => (
  <MessageList messages={DUMMY_CONTENT.messages} {...args} />
);

export const Primary = Template.bind({});

export const WideMessageSpace = Template.bind({});
WideMessageSpace.args = {
  messageListStyle: {
    gap: '30px',
  },
};
