import styled from 'styled-components';

export const Button = styled.button`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.5px;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
