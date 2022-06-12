import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Button } from './Button';

export default {
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({}) as ComponentStory<typeof Button>;

export const Disabled = Template.bind({}) as ComponentStory<typeof Button>;
Disabled.args = {
  disabled: true,
};
