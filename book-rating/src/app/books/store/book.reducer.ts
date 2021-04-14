import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Book } from '../shared/book';
import * as BookActions from './book.actions';

export const bookFeatureKey = 'book';

export interface State extends EntityState<Book> {
  loading: boolean;
  selectedIsbn: string;
}

export const bookAdapter = createEntityAdapter<Book>({
  selectId: book => book.isbn, // wenn ID nicht in "id"
});

export const initialState: State = bookAdapter.getInitialState({
  loading: false,
  selectedIsbn: null
});


export const reducer = createReducer(
  initialState,

  on(BookActions.loadBooks, state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(BookActions.loadBooksSuccess, (state, action) => {

    /*return bookAdapter.setAll(action.data, {
      ...state,
      loading: false
    });*/

    return {
      ...bookAdapter.setAll(action.data, state),
      loading: false
    };
  }),

  on(BookActions.loadBooksFailure, (state, action) => {
    return {
      ...state,
      loading: false
    };
  }),

  on(BookActions.createBookSuccess, (state, action) => {
    /*const books = Array.from(state.books);
    books.push(action.book);*/
    return bookAdapter.setOne(action.book, state);
  }),

  on(BookActions.rateUp, (state, action) => {
    return bookAdapter.updateOne({
      id: action.book.isbn,
      changes: {
        rating: Math.min(5, action.book.rating + 1)
      }
    }, state);
  }),

  on(BookActions.rateDown, (state, action) => {
    return bookAdapter.updateOne({
      id: action.book.isbn,
      changes: {
        rating: Math.max(1, action.book.rating - 1)
      }
    }, state);
  }),

  on(BookActions.selectBook, (state, action) => {
    return { ...state, selectedIsbn: action.isbn };
  })

);

