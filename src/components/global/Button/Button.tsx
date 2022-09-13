import styled from 'styled-components';

export const Button = styled.button`
  max-width: 343px;
  width: 100%;
  padding: 16px 8px;
  transition: 0.3s;
  cursor: pointer;
  border: none;
  border-radius: 16px;
  background-color: #244c66;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.011em;
  color: white;

  &:hover {
    background-color: transparent;
    color: #244c66;
    box-shadow: inset 0 0 0 1.5px #244c66;
  }

  &:active {
    background-color: #244c66;
    color: white;
  }
`;
