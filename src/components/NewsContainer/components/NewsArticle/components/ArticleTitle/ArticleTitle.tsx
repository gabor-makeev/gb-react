import styled from 'styled-components';

export const ArticleTitle = styled.h3`
  font-size: 40px;
  font-weight: 600;
  line-height: 64px;
  letter-spacing: -1.5px;
  font-family: 'Lancelot', cursive;
  color: #244c66;
  margin-bottom: 20px;

  @media (max-width: 1024px) {
    font-size: 30px;
    line-height: 48px;
  }

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
    letter-spacing: -1px;
  }
`;
