import { FC } from 'react';
import style from './MessageList.module.scss';
import { MessageItem } from './components/MessageItem/MessageItem';
import { Message } from 'src/default-types';
import classNames from 'classnames';
import { MUIStyledMessageList } from '../../../MUIStyledComponents/MUIStyledMessageList';

interface MessageListProps {
  userEmail: string;
  messages: Message[];
  gapType?: string;
  backgroundColor?: string;
}

export const MessageList: FC<MessageListProps> = ({
  userEmail,
  messages,
  gapType = 'medium',
  backgroundColor = 'primary',
}) => {
  const classes = classNames(
    style[`gap-${gapType}`],
    style[`background-color-${backgroundColor}`]
  );

  return (
    <MUIStyledMessageList className={classes} data-testid={'messageList'}>
      {messages.map((message, idx) => (
        <MessageItem message={message} userEmail={userEmail} key={idx} />
      ))}
    </MUIStyledMessageList>
  );
};
