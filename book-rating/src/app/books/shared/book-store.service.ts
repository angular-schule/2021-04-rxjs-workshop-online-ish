import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Book } from './book';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  private apiUrl = 'https://api.angular.schule';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Book[]>(`${this.apiUrl}/books`).pipe(delay(1200));
  }

  getSingle(isbn: string) {
    return this.http.get<Book>(`${this.apiUrl}/books/${isbn}`);
  }

  create(book: Book) {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  delete(isbn: string) {
    return this.http.post(`${this.apiUrl}/books/${isbn}`, { responseType: 'text' });
  }

  updateRating(isbn: string, rating: number) {
    return this.http.post(`${this.apiUrl}/books/${isbn}/rate`, { rating }, { responseType: 'text' });
  }
}
