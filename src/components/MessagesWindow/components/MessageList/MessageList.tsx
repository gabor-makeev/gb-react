import { FC } from 'react';
import style from './MessageList.module.scss';
import { MessageItem } from './components/MessageItem/MessageItem';
import { Message } from 'src/default-types';
import classNames from 'classnames';
import { MUIStyledMessageList } from '../../../MUIStyledComponents/MUIStyledMessageList';

interface MessageListProps {
  messages: Message[];
  gapType?: string;
  angleType?: string;
  backgroundColor?: string;
  userName: string;
}

export const MessageList: FC<MessageListProps> = ({
  messages,
  userName,
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
    <MUIStyledMessageList className={classes} data-testid={'messageList'}>
      {messages.map((message, idx) => (
        <MessageItem message={message} userName={userName} key={idx} />
      ))}
    </MUIStyledMessageList>
  );
};
