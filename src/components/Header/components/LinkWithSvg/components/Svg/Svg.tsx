import styled, { css } from 'styled-components';

export const Svg = styled.svg`
  background-color: #244c66;
  padding: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50px;
  transition: 0.3s;

  ${({ filled, stroked }: { filled: boolean; stroked: boolean }) => {
    let styles = '';
    if (filled) {
      styles += `
        fill: #8ba1ad;
      `;
    }
    if (stroked) {
      styles += `
        stroke: #8ba1ad;
      `;
    }
    return css`
      ${styles}
    `;
  }}
`;
