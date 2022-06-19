import { MessageSendingForm } from './MessageSendingForm';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from '../../store';

export default {
  title: 'MessageForm',
  component: MessageSendingForm,
} as ComponentMeta<typeof MessageSendingForm>;

const Template: ComponentStory<typeof MessageSendingForm> = (args) => (
  <Provider store={store}>
    <MessageSendingForm {...args} />
  </Provider>
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
