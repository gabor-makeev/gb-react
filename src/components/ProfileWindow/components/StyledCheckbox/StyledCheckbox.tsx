import styled from 'styled-components';
import { LabledCheckbox } from 'components/global/LabledCheckbox/LabledCheckbox';
import { EditableInputCss } from 'components/global/css/EditableInputCss';

interface StyledCheckboxProps {
  $isEdited: boolean;
}

export const StyledCheckbox = styled(LabledCheckbox)<StyledCheckboxProps>`
  ${({ $isEdited }) => {
    if ($isEdited) return EditableInputCss;
  }}
`;
