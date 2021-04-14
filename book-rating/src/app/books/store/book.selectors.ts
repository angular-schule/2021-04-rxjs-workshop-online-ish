import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBook from './book.reducer';

const { selectAll } = fromBook.bookAdapter.getSelectors();

export const selectBookState = createFeatureSelector<fromBook.State>(
  fromBook.bookFeatureKey
);

export const selectAllBooks = createSelector(
  selectBookState,
  selectAll
);

export const selectBooksLoading = createSelector(
  selectBookState,
  state => state.loading
);
