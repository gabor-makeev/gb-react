import { MessageList } from './MessageList';
import { DUMMY_CONTENT } from '../../../../constants';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'MessageList',
  component: MessageList,
} as ComponentMeta<typeof MessageList>;

const Template: ComponentStory<typeof MessageList> = (args) => (
  <MessageList {...args} messages={DUMMY_CONTENT.messages} />
);

export const Primary = Template.bind({});

export const WideMessageSpace = Template.bind({});
WideMessageSpace.args = {
  gap: '30px',
};
