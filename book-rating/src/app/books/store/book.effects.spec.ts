import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Book } from '../shared/book';
import { loadBook, loadBookSuccess } from './book.actions';

import { BookEffects } from './book.effects';

describe('BookEffects', () => {
  let actions$: Observable<any>;
  let effects: BookEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(BookEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
    actions$ = of(loadBook({ isbn: '123' }))

    effects.loadBook$.subscribe(action => {
      expect(action).toEqual(loadBookSuccess({ data: {} as Book }))
    });
  });
});
