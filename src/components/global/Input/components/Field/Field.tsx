import styled from 'styled-components';

export const Field = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  height: 100%;
  width: 100%;
  font-family: 'Inter', sans-serif;
  color: #244c66;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.011em;

  &::placeholder {
    font-style: italic;
    color: #587b89;
  }
`;
