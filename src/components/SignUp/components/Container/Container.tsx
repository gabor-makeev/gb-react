import styled from 'styled-components';

export const Container = styled.div`
  min-height: calc(100vh - 116px);
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #587b89;

  @media (max-width: 768px) {
    padding: 0;
  }
`;
