import { MessageForm } from './MessageForm';

export default {
  title: 'MessageForm',
  component: MessageForm,
};

const Template = (args) => <MessageForm {...args} />;

export const Primary = Template.bind({});

export const BoldBorder = Template.bind({});
BoldBorder.args = {
  border: '5px solid black',
};

export const SquareBorders = Template.bind({});
SquareBorders.args = {
  borderRadius: 'unset',
};
