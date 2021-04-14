import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBook from './book.reducer';

const { selectAll, selectEntities } = fromBook.bookAdapter.getSelectors();

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

export const selectSelectedIsbn = createSelector(selectBookState, state => state.selectedIsbn);
export const selectBooksEntities = createSelector(selectBookState, selectEntities);

export const selectSelectedBook = createSelector(
  selectBooksEntities,
  selectSelectedIsbn,
  (entities, isbn) => isbn && entities[isbn]
);
