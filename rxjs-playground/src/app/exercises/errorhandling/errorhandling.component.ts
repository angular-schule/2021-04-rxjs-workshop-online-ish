import { Component } from '@angular/core';
import { ReplaySubject, throwError, of, Observable, EMPTY } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-errorhandling',
  templateUrl: './errorhandling.component.html',
})
export class ErrorHandlingComponent {

  logStream$ = new ReplaySubject<string>();

  constructor(private es: ExerciseService) { }

  /**
   * Das Observable aus `this.es.randomError()` liefert mit hoher Wahrscheinlichkeit einen Fehler.
   * Probiere verschiedene Strategien aus, um den Fehler zu behandeln:
   * - wiederholen
   * - Fehler weiterwerfen
   * - Fehler umwandeln (in ein normales Element)
   * - Fehler verschlucken/ignorieren
   */

  start() {
    this.es.randomError().pipe(
      // retry(5),
      catchError(err => {
        console.log('FEHLER!!', err);
        return throwError('EIN FEHLER'); // weiterwerfen
        // return of('Nichts', 'passiert'); // umwandeln in normales Element
        // return EMPTY; // verschlucken
      }),
      catchError(err => {
        console.log('CE2', err);
        return throwError(err);
      })
    ).subscribe({
      next: e => this.logStream$.next(e),
      error: err => this.logStream$.next('❌ ERROR: ' + err)
    });
  }
}
