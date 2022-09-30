import styled from 'styled-components';
import { Input } from 'components/global/Input/Input';
import { EditableInputCss } from 'components/global/css/EditableInputCss';

interface StyledInputProps {
  $isEdited: boolean;
}

export const StyledInput = styled(Input)<StyledInputProps>`
  ${({ $isEdited }) => {
    if ($isEdited) return EditableInputCss;
  }}
`;
