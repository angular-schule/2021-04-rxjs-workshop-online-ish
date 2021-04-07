import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject, of } from 'rxjs';
import { scan, reduce } from 'rxjs/operators';

@Component({
  selector: 'rxw-gamescore',
  templateUrl: './gamescore.component.html',
})
export class GameScoreComponent implements OnInit {

  logStream$ = new ReplaySubject<string | number>();
  score$ = new Subject<number>();

  currentScore = 0;
  finalScore: number;

  ngOnInit() {

    /**
     * Wir entwickeln ein spannendes Browser-Spiel!
     * Jetzt fehlt nur noch der Code, um den aktuellen und den finalen Punktestand zu ermitteln...
     */

    /******************************/

    this.score$.pipe(
      scan((acc, item) => acc + item, 0)
    ).subscribe({
      next: score => this.currentScore = score,
      // complete: () => this.finalScore = this.currentScore
    });
    
    this.score$.pipe(
      reduce((acc, item) => acc + item, 0)
    ).subscribe(score => this.finalScore = score);
      
    /******************************/


      const actions$ = of(
        'SETNAMEJOHANNES', // { type: 'SETNAME', payload: 'Johannes' }
        'SETNAMEMARCEL', // { type: 'SETNAME', payload: 'Marcel' }
        'SETCITYJENA',
        'SETCITYLEIPZIG',
        'SETFRANG',
        'SETNAMEMARCEL',
      );

      const initialState = { name: 'Fritz', city: 'Erfurt' };

      actions$.pipe(
        scan((state, action) => {
          switch (action) {
            case 'SETNAMEJOHANNES': return { ...state, name: 'Johannes' };
            case 'SETCITYJENA': return { ...state, city: 'Jena' };
            case 'SETCITYHAMBURG': return { ...state, city: 'Hamburg' };
            case 'SETNAMEMARCEL': return { ...state, name: 'Marcel', city: 'Jena' };
            default: return state;
          }
        }, initialState)
      ).subscribe(e => console.log(e));











    /******************************/

    this.score$.subscribe({
      next: e => this.logStream$.next(e),
      complete: () => this.logStream$.next('✅ COMPLETE')
    });
  }

  finishGame() {
    this.score$.complete();
  }

  addScore(amount: number) {
    this.score$.next(amount);
  }

}
