import { Input } from './Input';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Input',
  componenet: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
  <Input shouldAutoFocus={false} {...args} />
);

export const Primary = Template.bind({});

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  placeholder: 'placeholder',
};
