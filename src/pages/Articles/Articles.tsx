import { FC, useEffect, useState } from 'react';
import { api } from 'src/constants';
import { Article } from 'src/default-types';

export const Articles: FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchArticles = async () => {
    setLoading(true);
    setError('');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const res = await fetch(api);
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <h2>Articles</h2>
      <button onClick={fetchArticles}>Get articles</button>
      {loading && <p>Loading</p>}
      {error && <p>Error: {error}</p>}
      {!loading && (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>{article.title}</li>
          ))}
        </ul>
      )}
    </>
  );
};
