import { Component, OnInit } from '@angular/core';
import { concat, fromEvent, of } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'rxw-fromevent',
  templateUrl: './fromevent.component.html',
})
export class FromeventComponent implements OnInit {

  currentWidth = 0;

  ngOnInit() {

    /**
     * Schreibe die jeweils aktuelle Fensterbreite in das Property `this.currentWidth`
     *
     * Nutze fromEvent, um das resize-Event auf window zu abonnieren.
     * Initialisiere das Observable mit der aktuellen Fensterbreite (`window.innerWidth`)
     * Entprelle den Eventstrom, damit nicht zu viele Events gefeuert werden.
     */

    /******************************/

  
    fromEvent(window, 'resize').pipe(
      debounceTime(1000),
      startWith(0),
      map(() => window.innerWidth)
    ).subscribe(width => this.currentWidth = width);
    
    /******************************/
  }

}
