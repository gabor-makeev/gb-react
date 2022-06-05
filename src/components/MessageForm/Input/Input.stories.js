import { Input } from './Input';

export default {
  title: 'Input',
  componenet: Input,
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'placeholder',
};
