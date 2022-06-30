import { StoreState } from 'src/store';

export const selectArticles = (state: StoreState) => state.articles.articles;

export const selectLoading = (state: StoreState) => state.articles.loading;

export const selectError = (state: StoreState) => state.articles.error;
