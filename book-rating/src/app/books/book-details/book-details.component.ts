import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { BookStoreService } from '../shared/book-store.service';
import { Book } from '../shared/book';
import { select, Store } from '@ngrx/store';
import { selectBook } from '../store/book.actions';
import { selectSelectedBook } from '../store/book.selectors';

@Component({
  selector: 'br-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  book$ = this.store.pipe(select(selectSelectedBook));

  constructor(private route: ActivatedRoute, private store: Store) { }

  ngOnInit() {

    this.route.paramMap.pipe(
      map(paramMap => paramMap.get('isbn')),
      distinctUntilChanged()
    ).subscribe(isbn => this.store.dispatch(selectBook({ isbn })));

  }

}
