import { ListItem } from '@mui/material';
import { styled } from '@mui/material';

export const MUIStyledMessageListItem = styled(ListItem)({
  boxSizing: 'border-box',
  position: 'relative',
  justifyContent: 'flex-end',
  borderRadius: '20px',
  listStyleType: 'none',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
});
