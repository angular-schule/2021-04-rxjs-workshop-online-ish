import { Component, OnInit } from '@angular/core';
import { Observable, of, from, timer, interval, ReplaySubject, Subscriber } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'rxw-creating',
  templateUrl: './creating.component.html',
})
export class CreatingComponent implements OnInit {

  logStream$ = new ReplaySubject<string | number>();

  ngOnInit() {
    /**
     * 1. Erstelle ein Observable und abonniere den Datenstrom.
     *    Probiere dazu die verschiedenen Creation Functions aus: of(), from(), timer(), interval()
     * 2. Implementiere außerdem ein Observable manuell, indem du den Konstruktor "new Observable()" nutzt.
     *
     * Tipps:
     * Zum Abonnieren kannst du einen (partiellen) Observer oder ein einzelnes next-Callback verwenden.
     * Du kannst die Methode this.log() verwenden, um eine Ausgabe in der schwarzen Box im Browser zu erzeugen.
     */

    /******************************/


    function producer(obs: Subscriber<number>) {
      obs.next(1);
      obs.next(2);

      setTimeout(() => obs.next(3), 2000);
      setTimeout(() => obs.complete(), 4000);
      setTimeout(() => obs.next(5), 5000);
    }

    const obs = {
      next: e => console.log(e),
      error: e => console.error(e),
      complete: () => console.log('C')
    };

    
    // Argument für Observable(): Funktion mit Argument
      // Argument: Objekt
      // Objekt: 3 Methoden (N, E, C)
    const myObs$ = new Observable(producer);
    
    // producer(obs);
    
    // myObs$.subscribe(obs);
    // myObs$.subscribe(e => this.log(e));

    /*myObs$.subscribe({
      complete: () => console.log('PARTIAL OBSERVER')
    });*/

    
    /*const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('HALLO');
      }, 2000)
    });
    
    from(myPromise).subscribe((e: string) => this.log(e));*/
    
    timer(0, 1000).pipe(
      map(x => x * 3),
      filter(x => x % 2 === 0)
    ).subscribe(e => this.log(e));

    /******************************/
  }

  private log(msg: string | number) {
    this.logStream$.next(msg);
  }

}
