import styled from 'styled-components';

export const ArticleDate = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.5px;
  background-color: #244c66;
  padding: 13px 10px;
  text-align: center;
  color: #b5c7cc;
  position: absolute;
  top: 25px;
  right: 48px;

  @media (max-width: 1024px) {
    font-size: 14px;
    line-height: 20px;
  }
  @media (max-width: 768px) {
    font-size: 12px;
    line-height: 18px;
  }
`;
