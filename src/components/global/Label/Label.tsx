import styled from 'styled-components';
import { EditedInputLabelCss } from 'components/global/css/EditedInputLabelCss';

interface LabelProps {
  $isEdited?: boolean;
}

export const Label = styled.label<LabelProps>`
  font-family: 'Inter', sans-serif;
  color: #244c66;
  line-height: 24px;
  letter-spacing: -0.011em;
  ${({ $isEdited }) => {
    if ($isEdited) return EditedInputLabelCss;
  }}
`;
