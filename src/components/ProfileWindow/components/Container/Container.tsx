import styled from 'styled-components';
import { FormHeader } from 'components/ProfileWindow/components/FormHeader/FormHeader';
import { SignOutButton } from 'components/ProfileWindow/components/SignOutButton/SignOutButton';
import { Container as InputContainer } from 'components/global/Input/components/Container/Container';
import { Container as CheckboxContainer } from 'components/global/Checkbox/components/Container/Container';

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

  ${InputContainer} {
    margin-bottom: 20px;
  }

  ${CheckboxContainer} {
    margin-bottom: 20px;
  }

  ${SignOutButton} {
    margin-top: 34px;
  }
`;
