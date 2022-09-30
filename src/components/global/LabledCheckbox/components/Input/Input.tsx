import styled from 'styled-components';

export const Input = styled.input.attrs({
  type: 'checkbox',
})`
  visibility: hidden;
  height: 0;
  position: absolute;
`;
