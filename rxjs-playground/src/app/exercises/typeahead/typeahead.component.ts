import { Component, OnInit } from '@angular/core';
import { TypeaheadService } from './typeahead.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { Book } from './book';

@Component({
  selector: 'rxw-typeahead',
  templateUrl: './typeahead.component.html',
})
export class TypeaheadComponent implements OnInit {

  searchControl: FormControl;

  loading = false;
  result$: Observable<Book[]>;

  constructor(private ts: TypeaheadService) { }

  ngOnInit() {
    this.searchControl = new FormControl('');
    const searchInput$: Observable<string> = this.searchControl.valueChanges;

    /**
     * Baue eine TypeAhead-Suche, die während der Eingabe eine Suche gegen unsere Buch-API ausführt.
     *
     * Die Eingabewerte aus dem Formular werden durch das Observable searchInput$ bekanntgegeben.
     * Zur Suche soll der Service TypeaheadService verwendet werden, er hat die Methode this.ts.search(term: string).
     * Die aktuellen Ergebnisse sollen im Property this.results gespeichert werden.
     * Der Lade-Indikator wird angezeigt, wenn das Property loading den Wert true hat.
     *
     * Extra: Refaktorisiere den Code und nutze die AsyncPipe von Angular, um die Subscription aufzubauen.
     */

    /******************************/

    this.result$ = searchInput$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      filter(term => term.length >= 3 || term.length === 0),
      tap(() => this.loading = true),
      switchMap(term => this.ts.search(term)),
      tap(() => this.loading = false),
    );
    
    /******************************/
  }

  formatAuthors(authors: string[]) {
    return Array.isArray(authors) ? authors.join(', ') : '';
  }

}
