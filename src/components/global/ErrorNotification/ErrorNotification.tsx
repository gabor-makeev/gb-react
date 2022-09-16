import styled from 'styled-components';

export const ErrorNotification = styled.div`
  position: fixed;
  z-index: 1;
  right: 4%;
  top: 50px;
  background-color: #de6564;
  font-family: 'Inter', sans-serif;
  color: #244c66;
  padding: 20px;

  @media (max-width: 375px) {
    left: 4%;
  } ;
`;
