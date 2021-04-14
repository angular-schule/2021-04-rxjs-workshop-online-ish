import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';
import { createBook } from '../store/book.actions';

@Component({
  selector: 'br-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.scss']
})
export class CreateBookComponent implements OnInit {

  constructor(private store: Store) {}

  ngOnInit() { }

  createBook(book: Book) {
    /*this.bs.create(book).subscribe(() => {
      this.router.navigate(['/books', book.isbn]);
    });*/
    this.store.dispatch(createBook({ book }));
  }

}
