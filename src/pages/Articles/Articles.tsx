import { FC, useEffect } from 'react';
import style from './Articles.module.scss';
import { fetchArticles } from 'store/articles/slice';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectArticles,
  selectError,
  selectLoading,
} from 'store/articles/selectors';

export const Articles: FC = () => {
  const dispatch = useDispatch() as any;
  const articles = useSelector(selectArticles);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <>
      <h2>Articles</h2>
      <button onClick={() => dispatch(fetchArticles())}>Get articles</button>
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
