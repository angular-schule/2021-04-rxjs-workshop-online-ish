import { Component } from '@angular/core';

import { StateService } from '../state.service';

@Component({
  selector: 'br-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  counter$ = this.service.state$;

  constructor(private service: StateService) { }

  increment() {
    this.service.dispatch(1);
  }

  decrement() {
    this.service.dispatch(-1);
  }

  reset() {
    // TODO
  }

}
