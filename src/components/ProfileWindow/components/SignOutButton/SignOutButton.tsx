import styled from 'styled-components';
import { Link } from 'components/global/Link/Link';

export const SignOutButton = styled(Link).attrs({
  type: 'button',
})`
  display: block;
  margin: 0 auto 0 auto;
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: transparent;
`;
