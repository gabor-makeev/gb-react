import styled from 'styled-components';

export const ImageContainer = styled.div`
  & > img {
    width: 455px;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    & > img {
      width: 100%;
    }
  }
`;
