import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

interface LinkProps {
  $name: string;
  as?: string;
}

export const Link = styled(NavLink)<LinkProps>`
  color: #8ba1ad;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    color: #b5c7cc;
  }

  &.active {
    color: #b5c7cc;
  }

  ${({ $name }) => {
    if ($name === 'profile' || $name === 'log in') {
      return css`
        display: none;
      `;
    }
  }};

  ${({ as }) => {
    if (as == 'button') {
      return css`
        background-color: transparent;
        border: none;
        cursor: pointer;
        font: inherit;
      `;
    }
  }};

  @media (max-width: 768px) {
    ${({ $name }) => {
      if ($name === 'profile' || $name === 'log in') {
        return css`
          display: inline;
        `;
      }
    }}
  }
`;
