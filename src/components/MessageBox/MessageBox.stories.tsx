import { MessageBox } from './MessageBox';
import { DUMMY_CONTENT, STYLES } from '../../constants';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'MessageBox',
  component: MessageBox,
} as ComponentMeta<typeof MessageBox>;

const Template: ComponentStory<typeof MessageBox> = (args) => (
  <MessageBox {...args} messages={DUMMY_CONTENT.messages} />
);

export const Primary = Template.bind({});

export const RightAngles = Template.bind({});
RightAngles.args = {
  backgroundColor: STYLES.color.primary,
  borderRadius: '0px',
};

export const BoldPadding = Template.bind({});
BoldPadding.args = {
  backgroundColor: STYLES.color.primary,
  padding: '50px',
};
