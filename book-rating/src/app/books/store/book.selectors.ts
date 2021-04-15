import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouteParam } from 'src/app/router.selectors';
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

export const selectSelectedIsbn = selectRouteParam('isbn');
export const selectBooksEntities = createSelector(selectBookState, selectEntities);

export const selectSelectedBook = createSelector(
  selectBooksEntities,
  selectSelectedIsbn,
  (entities, isbn) => isbn && entities[isbn]
);


export const selectBookByISBNFactory = (isbn: string) => createSelector(
  selectBooksEntities,
  (entities) => isbn && entities[isbn]
);

export const selectBookByISBNProps = createSelector(
  selectBooksEntities,
  (entities, props) => props.isbn && entities[props.isbn]
);
