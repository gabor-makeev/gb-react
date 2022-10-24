import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 358px;
  background-color: #8ba1ad;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
