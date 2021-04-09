import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Book } from '../shared/book';

@Component({
  selector: 'br-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  @Output() bookSubmit = new EventEmitter<Book>();
  bookForm: FormGroup;

  ngOnInit() {
    this.bookForm = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]),
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      authors: new FormArray([
        new FormControl('')
      ])
    });
  }

  isInvalid(name: string) {
    const control = this.bookForm.get(name);
    return control.invalid && control.touched;
  }

  hasError(name: string, errorCode: string) {
    const control = this.bookForm.get(name);
    return control.hasError(errorCode) && control.touched;
  }

  get authors() {
    return this.bookForm.get('authors') as FormArray;
  }

  addAuthorControl() {
    this.authors.push(new FormControl(''));
  }

  submitForm() {
    const newBook = {
      ...this.bookForm.value,
      authors: this.bookForm.value.authors.filter(e => !!e),
      rating: 1
    };

    this.bookSubmit.emit(newBook);
  }
}
