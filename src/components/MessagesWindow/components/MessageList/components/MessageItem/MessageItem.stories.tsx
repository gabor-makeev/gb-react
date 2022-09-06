import { MessageItem } from './MessageItem';
import { DUMMY_CONTENT } from 'src/constants';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'MessageItem',
  component: MessageItem,
} as ComponentMeta<typeof MessageItem>;

const dummyMessage = DUMMY_CONTENT.messages[0];

const Template: ComponentStory<typeof MessageItem> = (args) => (
  <MessageItem {...args} message={dummyMessage} />
);

export const Primary = Template.bind({});
