import { css } from 'styled-components';
import { Label } from 'components/global/Label/Label';
import EditIcon from 'src/assets/icons/edit.svg';

export const EditableInputCss = css`
  ${Label} {
    position: relative;
  }

  ${Label}:after {
    position: absolute;
    right: -214px;
    pointer-events: none;
    content: url('${EditIcon}');
  }
`;
