import styled, { css } from 'styled-components';
import Checkmark from 'src/assets/icons/checkmark.svg';

interface CheckboxProps {
  $isChecked: boolean;
}

export const Checkbox = styled.div<CheckboxProps>`
  content: url('${Checkmark}');
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 16px;
  width: 16px;
  border: 2px solid #244c66;
  background-color: #8ba1ad;
  border-radius: 4px;
  transition: 0.3s;
  &:hover {
    border-color: #587b89;
  }
  ${({ $isChecked }) => {
    if ($isChecked) {
      return css`
        background-color: #244c66;
        &:hover {
          border-color: transparent;
        }
      `;
    }
  }}
`;
