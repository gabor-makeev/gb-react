import styled from 'styled-components';
import { Container } from 'components/NewsContainer/components/NewsArticle/components/Container/Container';
import { ImageContainer } from 'components/NewsContainer/components/NewsArticle/components/ImageContainer/ImageContainer';
import { HeadlineContainer } from 'components/NewsContainer/components/NewsArticle/components/HeadlineContainer/HeadlineContainer';
import { ArticleTitle } from 'components/NewsContainer/components/NewsArticle/components/ArticleTitle/ArticleTitle';
import { Hr } from 'components/NewsContainer/components/NewsArticle/components/Hr/Hr';
import { Button } from 'components/NewsContainer/components/NewsArticle/components/Button/Button';

export const AlternativeContainer = styled(Container)`
  @media (min-width: 768px) {
    min-height: 384px;

    ${ImageContainer} {
      order: -1;
      flex: 0 1 100%;

      & > img {
        width: 100%;
      }
    }

    ${HeadlineContainer} {
      flex: 0 0 455px;
      padding: 90px 30px 45px 31px;
    }

    ${ArticleTitle} {
      order: -1;
    }

    ${Hr} {
      order: -1;
      margin-bottom: 20px;
    }

    ${Button} {
      margin-bottom: 0;
    }
  }

  @media (min-width: 1024px) {
    min-height: 474px;
  }
`;
