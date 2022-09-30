import styled, { css } from 'styled-components';
import { Checkbox } from 'components/global/LabledCheckbox/components/Checkbox/Checkbox';
import { Label } from 'components/global/Label/Label';

interface ContainerProps {
  $isChecked: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;

  ${Label}:hover ~ ${Checkbox} {
    ${({ $isChecked }) => {
      if (!$isChecked) {
        return css`
          border-color: #587b89;
        `;
      }
    }}
  }
`;
