import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { loadBooks, rateDown, rateUp } from '../store/book.actions';
import { selectAllBooks, selectBookByISBNFactory, selectBookByISBNProps, selectBooksLoading } from '../store/book.selectors';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // angularBook$ = this.store.pipe(select(selectBookByISBNFactory('9783864907791')));
  angularBook$ = this.store.pipe(select(selectBookByISBNProps, { isbn: '9783864907791' }));

  books$ = this.store.pipe(select(selectAllBooks));
  loading$ = this.store.pipe(select(selectBooksLoading));

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadBooks());
  }

  rateUp(book: Book) {
    this.store.dispatch(rateUp({ book }));
    // const ratedBook = { ...book, rating:  };
  }
  
  rateDown(book: Book) {
    this.store.dispatch(rateDown({ book }));
    // const ratedBook = { ...book, rating: Math.max(1, book.rating - 1) };
  }

  /* updateList(ratedBook: Book) {
    this.books = this.books
      .map(b => b.isbn === ratedBook.isbn ? ratedBook : b);
  }*/

  trackBook(index: number, item: Book) {
    return item.isbn;
  }
}
