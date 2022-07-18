import { FC, useEffect } from 'react';
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  Container,
} from '@mui/material';
import {
  articleVariant,
  NewsArticle,
} from 'components/NewsContainer/components/NewsArticle/NewsArticle';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectArticles,
  selectError,
  selectLoading,
} from 'store/articles/selectors';
import { fetchArticles } from 'store/articles/slice';

export const NewsContainer: FC = () => {
  const dispatch = useDispatch() as any;
  const articles = useSelector(selectArticles);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <Container maxWidth={false} sx={{ maxWidth: '1385px' }}>
      {(loading || error) && (
        <Container
          sx={{ display: 'flex', justifyContent: 'center', padding: '50px' }}
        >
          {loading && <CircularProgress />}
          {error && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              Please try again
              <Button type="submit" onClick={() => dispatch(fetchArticles())}>
                Load articles
              </Button>
            </Alert>
          )}
        </Container>
      )}
      {!loading &&
        articles.map((article) => (
          <NewsArticle key={article.id} article={article} />
        ))}
    </Container>
  );
};
