import { Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { selectSelectedBook } from '../store/book.selectors';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book$ = this.store.pipe(select(selectSelectedBook));

  constructor(private store: Store) { }

  ngOnInit() {}

}
