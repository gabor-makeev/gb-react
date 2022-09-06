import { List } from '@mui/material';
import { styled } from '@mui/material';

export const MUIStyledMessageList = styled(List)({
  width: '100%',
  maxHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  overflowY: 'auto',
});
