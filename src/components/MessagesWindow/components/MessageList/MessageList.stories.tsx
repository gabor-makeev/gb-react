import { DUMMY_CONTENT } from 'src/constants';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { MessageList } from './MessageList';

export default {
  title: 'MessageList',
  component: MessageList,
} as ComponentMeta<typeof MessageList>;

const Template: ComponentStory<typeof MessageList> = (args) => (
  <MessageList {...args} messages={DUMMY_CONTENT.messages} />
);

export const Primary = Template.bind({});

export const SmallGaps = Template.bind({});
SmallGaps.args = {
  gapType: 'small',
};

export const BigGaps = Template.bind({});
BigGaps.args = {
  gapType: 'big',
};

export const SecondaryBackgroundColor = Template.bind({});
SecondaryBackgroundColor.args = {
  backgroundColor: 'secondary',
};
