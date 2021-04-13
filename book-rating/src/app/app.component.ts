import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { increment } from './counter/store/counter.actions';

@Component({
  selector: 'br-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Book Rating';

  constructor(private store: Store) {
   
  }
}