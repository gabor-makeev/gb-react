import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Link = styled(NavLink).attrs((props) => ({
  to: props.to,
}))`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 25px 10px 10px;
  background-color: #8ba1ad;
  text-decoration: none;
  border-radius: 50px;
  transition: 0.3s;
  &:hover {
    background-color: #b5c7cc;

    & svg {
      fill: #b5c7cc;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
