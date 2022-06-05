import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
