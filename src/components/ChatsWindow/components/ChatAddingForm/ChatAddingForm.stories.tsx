import { ChatAddingForm } from 'components/ChatsWindow/components/ChatAddingForm/ChatAddingForm';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { store } from 'src/store';
import { Provider } from 'react-redux';

export default {
  title: 'ChatAddingForm',
  component: ChatAddingForm,
} as ComponentMeta<typeof ChatAddingForm>;

const Template: ComponentStory<typeof ChatAddingForm> = (args) => (
  <Provider store={store}>
    <ChatAddingForm {...args} />
  </Provider>
);

export const Primary = Template.bind({});

export const Hoverable = Template.bind({});
Hoverable.args = {
  hoverable: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabledInput: true,
  disabledButton: true,
};
