import { FC, useEffect, useRef } from 'react';
import style from './MessageList.module.scss';
import { MessageItem } from './components/MessageItem/MessageItem';
import classNames from 'classnames';
import { MUIStyledMessageList } from '../../../MUIStyledComponents/MUIStyledMessageList';
import { IClientMessage } from 'src/default-types';

interface MessageListProps {
  userEmail: string;
  messages: IClientMessage[];
  gapType?: string;
  backgroundColor?: string;
}

export const MessageList: FC<MessageListProps> = ({
  userEmail,
  messages,
  gapType = 'medium',
  backgroundColor = 'primary',
}) => {
  const scrollAnchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollAnchor.current?.scrollIntoView();
  }, [messages]);

  const classes = classNames(
    style[`gap-${gapType}`],
    style[`background-color-${backgroundColor}`]
  );

  return (
    <div className={style['message-list__container']}>
      <MUIStyledMessageList className={classes} data-testid={'messageList'}>
        {messages.map((message, idx) => (
          <MessageItem message={message} userEmail={userEmail} key={idx} />
        ))}
        <div ref={scrollAnchor}></div>
      </MUIStyledMessageList>
    </div>
  );
};
