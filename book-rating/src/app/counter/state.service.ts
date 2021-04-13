import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

export interface MyState {
  counter: number;
  foo: string;
}


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private actions$ = new Subject<string>();
  private initialState: MyState = {
    counter: 0,
    foo: 'hallo'
  };

  state$ = this.actions$.pipe(
    startWith('INIT'),
    scan(this.reducer, this.initialState)
  );

  private reducer(state: MyState, action: string): MyState {
    switch (action) {
      case 'INC': return { ...state, counter: state.counter + 1 };
      case 'DEC': return { ...state, counter: state.counter - 1 };
      case 'RESET': return { ...state, counter: 0 };
      case 'SETFOOTOBYE': return { ...state, foo: 'BYE' };
      default: return state;
    }
  }

  dispatch(action: string) {
    this.actions$.next(action);
  }
}
