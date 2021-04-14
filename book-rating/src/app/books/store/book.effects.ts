import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, switchMap } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';

import * as BookActions from './book.actions';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';



@Injectable()
export class BookEffects {

  loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.loadBooks),
    concatMap(() => this.bs.getAll().pipe(
      map(data => BookActions.loadBooksSuccess({ data })),
      catchError(error => of(BookActions.loadBooksFailure({ error })))
      )),
    ));

  loadBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.loadBook),
    concatMap(({ isbn }) => this.bs.getSingle(isbn).pipe(
      map(data => BookActions.loadBookSuccess({ data })),
      catchError(error => of(BookActions.loadBookFailure({ error })))
      )),
    ));

  loadBookAfterSelect$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.selectBook),
    map(({ isbn }) => BookActions.loadBook({ isbn }))
  ));

  createBook$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.createBook),
    concatMap(action => this.bs.create(action.book).pipe(
      map(book => BookActions.createBookSuccess({ book })),
      catchError(error => of(BookActions.createBookFailure({ error })))
      )),
    ));

  navigateAfterCreate$ = createEffect(() => this.actions$.pipe(
    ofType(BookActions.createBookSuccess),
    switchMap(action => from(this.router.navigate(['/books', action.book.isbn])))
  ), { dispatch: false });

  constructor(private actions$: Actions, private bs: BookStoreService, private router: Router) {}

}
