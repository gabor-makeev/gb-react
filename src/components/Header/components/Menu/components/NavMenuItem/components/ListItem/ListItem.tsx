import styled, { css } from 'styled-components';

export const ListItem = styled.li`
  ${(props: { $name: string }) => {
    if (props.$name === 'profile' || props.$name === 'log in') {
      return css`
        order: -1;
      `;
    }
  }}
`;
