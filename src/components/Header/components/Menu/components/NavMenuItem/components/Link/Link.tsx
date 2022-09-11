import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  color: #8ba1ad;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    color: #b5c7cc;
  }

  &.active {
    color: #b5c7cc;
  }

  ${(props: { $name: string }) => {
    if (props.$name === 'profile' || props.$name === 'log in') {
      return css`
        display: none;
      `;
    }
  }};

  @media (max-width: 768px) {
    ${(props: { $name: string }) => {
      if (props.$name === 'profile' || props.$name === 'log in') {
        return css`
          display: inline;
        `;
      }
    }}
  }
`;
