import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Link = styled(NavLink)`
  color: #244c66;
  text-decoration: none;
  border-bottom: 1px solid #244c66;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.011em;
  transition: 0.1s;

  &:hover {
    border-bottom-color: transparent;
  }
`;
