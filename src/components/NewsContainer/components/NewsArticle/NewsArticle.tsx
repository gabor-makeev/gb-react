import { FC } from 'react';
import style from './NewsArticle.module.scss';
import { Article } from 'src/default-types';

interface NewsArticleProps {
  article: Article;
}

export const NewsArticle: FC<NewsArticleProps> = ({ article }) => {
  const publishedAtDate = new Date(article.publishedAt);
  const publishedAtDay =
    publishedAtDate.getUTCDate().toString().length === 1
      ? `0${publishedAtDate.getUTCDate()}`
      : publishedAtDate.getUTCDate();

  const publishedAtMonth =
    publishedAtDate.getUTCMonth().toString().length === 1
      ? `0${publishedAtDate.getUTCMonth()}`
      : publishedAtDate.getUTCMonth();

  return (
    <div className={style['card']}>
      <div className={style['card-headline']}>
        <div className={style['card-headline__date']}>
          {`${publishedAtDay}-${publishedAtMonth}-${publishedAtDate.getFullYear()}`}
        </div>
        <h3 className={style['card-headline__title']}>{article.title}</h3>
        <p className={style['card-headline__summary']}>{article.summary}</p>
        <button className={style['card-headline__button']}>Read More...</button>
        <hr className={style['card-headline__hr']} />
      </div>
      <div className={style['card-image']}>
        <img src={article.imageUrl} alt={article.title} />
      </div>
    </div>
  );
};
