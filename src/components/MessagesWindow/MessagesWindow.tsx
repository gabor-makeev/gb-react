import style from './MessagesWindow.module.scss';
import { MessageList } from '../StyledMUIComponents/MessageList';
import { Message } from './components/Message/Message';
import { MessageItem } from 'src/default-types';
import { FC } from 'react';
import classNames from 'classnames';

interface MessageWindowProps {
  messages?: MessageItem[];
  gapType?: string;
  angleType?: string;
  backgroundColor?: string;
}

export const MessagesWindow: FC<MessageWindowProps> = ({
  messages = [],
  gapType = 'medium',
  angleType = 'round',
  backgroundColor = 'primary',
}) => {
  const classes = classNames(
    style[`gap-${gapType}`],
    style[`angle-${angleType}`],
    style[`background-color-${backgroundColor}`]
  );

  return (
    <MessageList className={classes} data-testid={'messageList'}>
      {messages.map((message, idx) => (
        <Message message={message} key={idx} />
      ))}
    </MessageList>
  );
};
