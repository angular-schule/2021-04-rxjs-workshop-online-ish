import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

import * as CounterActions from './counter.actions';


@Injectable()
export class CounterEffects {




  constructor(private actions$: Actions) {}

}
