import styled from 'styled-components';

export const ArticleSummary = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #244c66;
  margin-bottom: 15px;

  @media (max-width: 1024px) {
    font-size: 16px;
  }
  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`;
