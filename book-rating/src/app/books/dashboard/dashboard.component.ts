import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { loadBooks } from '../store/book.actions';
import { selectAllBooks, selectBooksLoading } from '../store/book.selectors';

@Component({
  selector: 'br-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  books$ = this.store.pipe(select(selectAllBooks));
  loading$ = this.store.pipe(select(selectBooksLoading));

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(loadBooks());
  }

  rateUp(book: Book) {
    // const ratedBook = { ...book, rating: Math.min(5, book.rating + 1) };
  }

  rateDown(book: Book) {
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
