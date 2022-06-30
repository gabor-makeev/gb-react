import { Article } from 'src/default-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'src/constants';

interface ArticlesState {
  articles: Article[];
  loading: boolean;
  error: string;
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: '',
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload as unknown as Article[];
      })
      .addCase(fetchArticles.rejected, (state, { error: { message } }) => {
        state.loading = false;
        state.error = message as string;
      });
  },
});

export const fetchArticles = createAsyncThunk<PayloadAction>(
  'articles/fetchArticles',
  async () => {
    // the line below delays the fetching of data for 1 second in order to show that 'Loading' is displayed
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await fetch(api);
    const data = await res.json();
    return data;
  }
);

export const articlesReducer = articlesSlice.reducer;
