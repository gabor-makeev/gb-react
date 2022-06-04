import { MessageForm } from '../components/MessageForm/MessageForm';
import { STYLES } from '../constants';

export default {
  title: 'MessageForm',
  component: MessageForm,
};

const dummyAction = () => console.log;

export const Primary = () => <MessageForm pushMessage={dummyAction()} />;

export const BoldBorder = () => (
  <MessageForm pushMessage={dummyAction()} border={'5px solid black'} />
);

export const SquareBorders = () => (
  <MessageForm
    pushMessage={dummyAction()}
    border={STYLES.border}
    borderRadius={'unset'}
  />
);
