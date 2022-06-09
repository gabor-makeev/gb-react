import { MessageForm } from './MessageForm';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'MessageForm',
  component: MessageForm,
} as ComponentMeta<typeof MessageForm>;

const Template: ComponentStory<typeof MessageForm> = (args) => (
  <MessageForm {...args} />
);

export const Primary = Template.bind({});

export const BoldBorder = Template.bind({});
BoldBorder.args = {
  border: '5px solid black',
};

export const SquareBorders = Template.bind({});
SquareBorders.args = {
  borderRadius: 'unset',
};
