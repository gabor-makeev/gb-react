import { FC, useEffect, useState } from 'react';
import { api } from 'src/constants';
import { Article } from 'src/default-types';
import style from './Articles.module.scss';

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
        <div className={style.wrapper}>
          <ul className={style['articles-list']}>
            {articles.map((article) => (
              <li key={article.id} className={style['articles-list__item']}>
                <h3 className={style['articles-list__item__header']}>
                  {article.title}
                </h3>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className={style['articles-list__item__img']}
                />
                <p className={style['articles-list__item__summary']}>
                  {article.summary}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
