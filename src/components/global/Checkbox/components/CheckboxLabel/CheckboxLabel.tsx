import styled, { css } from 'styled-components';
import { Label } from 'components/global/Label/Label';
import Checkmark from 'src/assets/icons/checkmark.svg';

interface CheckboxLabelProps {
  $isChecked: boolean;
}

export const CheckboxLabel = styled(Label)<CheckboxLabelProps>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  ${({ $isChecked }) => {
    if (!$isChecked) {
      return css`
        &:hover {
          &:after {
            border-color: #587b89;
          }
        }
      `;
    }
  }}
  &:after {
    content: url('${Checkmark}');
    display: flex;
    justify-content: center;
    align-items: center;
    height: 16px;
    width: 16px;
    border: 2px solid #244c66;
    border-radius: 4px;
    background-color: #8ba1ad;
    transition: 0.3s;
    ${({ $isChecked }) => {
      if ($isChecked) {
        return css`
          background-color: #244c66;
        `;
      }
    }};
  }
`;
