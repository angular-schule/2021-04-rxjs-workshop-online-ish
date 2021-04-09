import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private input$ = new Subject<number>();
  private initialState = 0;

  state$ = this.input$.pipe(
    scan((acc, item) => acc + item, this.initialState)
  );

  dispatch(input: number) {
    this.input$.next(input);
  }
}
