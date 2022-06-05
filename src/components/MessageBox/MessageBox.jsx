import style from './MessageBox.module.scss';
import { STYLES } from '../../constants';

import { MessageList } from './components/MessageList/MessageList';

export const MessageBox = ({
  messages,
  messageBoxStyle = {
    backgroundColor: STYLES.color.primary,
  },
}) => {
  return (
    <div className={style['message-box']} style={messageBoxStyle}>
      <MessageList messages={messages} />
    </div>
  );
};
