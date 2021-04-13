import { Action, createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';

export const counterFeatureKey = 'counter';

export interface State {
  counter: number;
  foo: string;
}

export const initialState: State = {
  counter: 0,
  foo: 'HALLO'
};


export const reducer = createReducer(
  initialState,

  on(CounterActions.increment, (state, action) => {
    return { ...state, counter: state.counter + 1 };
  }),

  on(CounterActions.decrement, (state, action) => {
    return { ...state, counter: state.counter - 1 };
  }),

  on(CounterActions.reset, (state, action) => {
    return { ...state, counter: 0 };
  }),

);

