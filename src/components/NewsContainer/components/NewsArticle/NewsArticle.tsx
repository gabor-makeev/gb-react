import { FC } from 'react';
import style from './NewsArticle.module.scss';
import { Article } from 'src/default-types';
import classNames from 'classnames';
import { HeadlineContainer } from 'components/NewsContainer/components/NewsArticle/components/HeadlineContainer/HeadlineContainer';
import { ArticleDate } from 'components/NewsContainer/components/NewsArticle/components/ArticleDate/ArticleDate';
import { ArticleTitle } from 'components/NewsContainer/components/NewsArticle/components/ArticleTitle/ArticleTitle';
import { ArticleSummary } from 'components/NewsContainer/components/NewsArticle/components/ArticleSummary/ArticleSummary';
import { Button } from 'components/NewsContainer/components/NewsArticle/components/Button/Button';

export enum articleVariant {
  default = 'default',
  alternative = 'alternative',
}

interface NewsArticleProps {
  article: Article;
  variant?: articleVariant;
}

export const NewsArticle: FC<NewsArticleProps> = ({
  article,
  variant = '',
}) => {
  const cardClassNames = classNames(style.card, {
    [style['card__alternative']]: variant === 'alternative',
  });

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
    <div className={cardClassNames}>
      <HeadlineContainer>
        <ArticleDate>
          {`${publishedAtDay}-${publishedAtMonth}-${publishedAtDate.getFullYear()}`}
        </ArticleDate>
        <ArticleTitle>{article.title}</ArticleTitle>
        <ArticleSummary>{article.summary}</ArticleSummary>
        <Button>Read More...</Button>
        <hr className={style['card-headline__hr']} />
      </HeadlineContainer>
      <div className={style['card-image']}>
        <img src={article.imageUrl} alt={article.title} />
      </div>
    </div>
  );
};