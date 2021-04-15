import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap, switchMap, withLatestFrom, take, filter } from 'rxjs/operators';
import { EMPTY, from, of } from 'rxjs';

import * as BookActions from './book.actions';
import { BookStoreService } from '../shared/book-store.service';
import { Router } from '@angular/router';
import { routerNavigatedAction, ROUTER_NAVIGATED } from '@ngrx/router-store';
import { selectSelectedIsbn } from './book.selectors';
import { select, Store } from '@ngrx/store';



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

  loadBookAfterNavigation$ = createEffect(() => this.actions$.pipe(
    ofType(routerNavigatedAction),
    // withLatestFrom(this.store.pipe(selectSelectedIsbn)),
    switchMap(() => this.store.pipe(select(selectSelectedIsbn), take(1))),
    filter(isbn => !!isbn),
    map(isbn => BookActions.loadBook({ isbn }))
  ));

  constructor(private actions$: Actions, private bs: BookStoreService, private router: Router, private store: Store) {}

}
