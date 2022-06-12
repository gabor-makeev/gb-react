import { Message } from './Message';
import { DUMMY_CONTENT } from '../../../../constants';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Message',
  component: Message,
} as ComponentMeta<typeof Message>;

const dummyMessage = DUMMY_CONTENT.messages[0];

const Template: ComponentStory<typeof Message> = (args) => (
  <Message {...args} message={dummyMessage} />
);

export const Primary = Template.bind({});

export const Big = Template.bind({});
Big.args = {
  variant: 'big',
};

export const Small = Template.bind({});
Small.args = {
  variant: 'small',
};
