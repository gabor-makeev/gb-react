import { css } from 'styled-components';
import EditIcon from 'src/assets/icons/edit.svg';

export const EditedInputLabelCss = css`
  position: relative;

  &:after {
    position: absolute;
    right: -214px;
    pointer-events: none;
    content: url('${EditIcon}');
  }
`;
