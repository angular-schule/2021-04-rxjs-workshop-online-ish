import { Component, OnInit } from '@angular/core';
import { timer, Observable, of } from 'rxjs';
import { tap, scan, first, take } from 'rxjs/operators';

@Component({
  selector: 'rxw-fromevent',
  templateUrl: './asyncpipe.component.html',
  styles: ['.big-num {font-size: 120pt}']
})
export class AsyncpipeComponent implements OnInit {

  result$: Observable<number>;

  ngOnInit() {

    /**
     * Verwende die AsyncPipe und verzichte auf den Einsatz von subscribe()!
     */

    /**************!!**************/

     this.result$ = timer(0, 700).pipe(                        
      scan((acc, item) => acc + item, 0),
      tap({
        next: e => console.log(e),
        complete: () => console.log('✅ COMPLETE')
      }),
     );        

    /*of(100,200).pipe(first()).subscribe({
      next: console.log,
      complete: () => console.log('CCCCC')
    })*/

    /**************!!**************/
  }

}
