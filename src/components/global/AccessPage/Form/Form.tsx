import styled from 'styled-components';
import { Button } from 'components/global/Button/Button';

export const Form = styled.form`
  margin-top: 40px;

  & > div {
    margin-bottom: 28px;
    &:last-of-type {
      margin-bottom: 58px;
    }
  }

  ${Button} {
    margin-bottom: 40px;
  }

  & > span {
    display: flex;
    justify-content: center;
    gap: 6px;
  }
`;
