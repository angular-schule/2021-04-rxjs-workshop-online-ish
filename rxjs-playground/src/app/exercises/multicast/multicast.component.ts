import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, of, timer } from 'rxjs';
import { publish, refCount, share, shareReplay, take } from 'rxjs/operators';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-multicast',
  templateUrl: './multicast.component.html',
})
export class MulticastComponent implements OnInit {

  listeners = [];
  logStream$ = new ReplaySubject<string>();

  measureValues$: Observable<number>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService) { }

  ngOnInit() {
    /******************************/

      this.measureValues$ = this.mvs.getValues().pipe(
        // publish() + refCount() === share()
        shareReplay(5)
      );

      // this.measureValues$ = new Subject();
      /*this.measureValues$ = new ReplaySubject(5);
      this.mvs.getValues().subscribe(this.measureValues$);*/

      // setTimeout(() => this.measureValues$.next(5), 2000);
      // setTimeout(() => this.measureValues$.next(7), 4000);
      // setTimeout(() => this.measureValues$.next(9), 10000);

      /*this.measureValues$.subscribe({
        next: console.log,
        complete: () => console.log('COMPLETE')
      });*/

    /******************************/
  }

  addListener() {
    this.listeners.push(this.es.generateRandomString(5));
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString(5);
    this.measureValues$.subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

}
