import styled from 'styled-components';

export const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  gap: 15px;
  border: 1.5px solid #244c66;
  border-radius: 16px;
  height: 56px;
  padding: 0 20px;
  background-color: #8ba1ad;
  transition: 0.3s;

  &:hover {
    border-color: #8ba1ad;
  }

  & label {
    display: flex;
  }
`;
