import { createAction, props } from '@ngrx/store';
import { Book } from '../shared/book';

export const loadBooks = createAction(
  '[Book] Load Books'
);

export const loadBooksSuccess = createAction(
  '[Book] Load Books Success',
  props<{ data: Book[] }>()
);

export const loadBooksFailure = createAction(
  '[Book] Load Books Failure',
  props<{ error: any }>()
);

export const loadBook = createAction(
  '[Book] Load Book',
  props<{ isbn: string }>()
);

export const loadBookSuccess = createAction(
  '[Book] Load Book Success',
  props<{ data: Book }>()
);

export const loadBookFailure = createAction(
  '[Book] Load Book Failure',
  props<{ error: any }>()
);

export const createBook = createAction(
  '[Book] Create Book',
  props<{ book: Book }>()
);

export const createBookSuccess = createAction(
  '[Book] Create Book Success',
  props<{ book: Book }>()
);

export const createBookFailure = createAction(
  '[Book] Create Book Failure',
  props<{ error: any }>()
);

export const rateUp = createAction(
  '[Book] Rate Up',
  props<{ book: Book }>()
);

export const rateDown = createAction(
  '[Book] Rate Down',
  props<{ book: Book }>()
);
