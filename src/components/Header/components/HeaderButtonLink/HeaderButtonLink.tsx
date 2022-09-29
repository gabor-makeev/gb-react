import styled from 'styled-components';
import { LinkWithSvg } from 'components/Header/components/LinkWithSvg/LinkWithSvg';

export const HeaderButtonLink = styled(LinkWithSvg)`
  @media (max-width: 768px) {
    display: none;
  }
`;
