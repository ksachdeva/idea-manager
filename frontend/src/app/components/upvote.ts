import {Component, Input, Output, ElementRef, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

@Component({
  selector: 'upvote',
  directives: [CORE_DIRECTIVES],
  template: `
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-default"><i class="fa fa-minus"></i></button>
      <button disabled type="button" class="btn btn-default">0</button>
      <button type="button" class="btn btn-default"><i class="fa fa-plus"></i></button>
    </div>
  `
})
export class UpVoteComponent {

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
  }
}
