import style from './MessageBox.module.scss';
import { STYLES } from '../../constants';

import { MessageList } from './components/MessageList/MessageList';
import { Container } from '@mui/material';

export const MessageBox = ({
  messages,
  backgroundColor = STYLES.color.primary,
  borderRadius = '15px',
  padding = '20px',
}) => {
  const messageBoxStyle = {
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
    flex: '0 1 300px',
    maxWidth: '300px',
    border: '1px solid black',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0 5px 15px',
    padding: padding,
  };

  return (
    <Container
      className={style['message-box']}
      sx={messageBoxStyle}
      data-testid={'messageBox'}
      maxWidth={messageBoxStyle.maxWidth}
    >
      <MessageList messages={messages} />
    </Container>
  );
};
