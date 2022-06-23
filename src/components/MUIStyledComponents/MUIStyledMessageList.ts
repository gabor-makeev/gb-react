import { List } from '@mui/material';
import { styled } from '@mui/material';

export const MUIStyledMessageList = styled(List)({
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'flex-end',
  flex: '0 1 300px',
  maxWidth: '300px',
  border: '1px solid black',
  boxShadow: 'rgba(0, 0, 0, 0.35) 0 5px 15px',
  marginLeft: 'unset',
});
