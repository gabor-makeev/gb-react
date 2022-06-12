import { MessagesWindow } from './MessagesWindow';
import { DUMMY_CONTENT } from '../../constants';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'MessageWindow',
  component: MessagesWindow,
} as ComponentMeta<typeof MessagesWindow>;

const Template: ComponentStory<typeof MessagesWindow> = (args) => (
  <MessagesWindow {...args} messages={DUMMY_CONTENT.messages} />
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

export const RoundishAndle = Template.bind({});
RoundishAndle.args = {
  angleType: 'roundish',
};

export const SecondaryBackgroundColor = Template.bind({});
SecondaryBackgroundColor.args = {
  backgroundColor: 'secondary',
};
