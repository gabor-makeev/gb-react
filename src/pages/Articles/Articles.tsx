import { FC, useEffect, useState } from 'react';
import { api } from 'src/constants';
import { Article } from 'src/default-types';

export const Articles: FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState('');

  const fetchArticles = async () => {
    try {
      const res = await fetch(api);
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <>
      <h2>Articles</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {articles.map((article) => (
          <li key={article.id}>{article.title}</li>
        ))}
      </ul>
    </>
  );
};
