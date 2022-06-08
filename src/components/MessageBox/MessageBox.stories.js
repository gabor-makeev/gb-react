import { MessageBox } from './MessageBox';
import { DUMMY_CONTENT, STYLES } from '../../constants';

export default {
  title: 'MessageBox',
  component: MessageBox,
};

const Template = (args) => (
  <MessageBox messages={DUMMY_CONTENT.messages} {...args} />
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
