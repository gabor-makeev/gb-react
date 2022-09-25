import styled from 'styled-components';
import { StyledInput } from 'components/ProfileWindow/components/StyledInput/StyledInput';
import { FormHeader } from 'components/ProfileWindow/components/FormHeader/FormHeader';
import { StyledCheckbox } from 'components/ProfileWindow/components/StyledCheckbox/StyledCheckbox';

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: rgba(36, 76, 102, 0.7);

  ${FormHeader} {
    margin-bottom: 40px;
  }

  ${StyledInput} {
    margin-bottom: 20px;
  }

  ${StyledCheckbox} {
    margin-bottom: 20px;
  }
`;
