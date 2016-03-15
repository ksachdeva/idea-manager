import {Component, Input, ElementRef} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';

const MediumEditor: any = require('medium-editor');

@Component({
  selector: '[rich-text]',
  directives: [CORE_DIRECTIVES],
  template: `

  `
})
export class RichTextComponent {

  editor: any;

  constructor(private elementRef: ElementRef) {
  }

  get value() {
    return this.editor.elements[0].innerHTML;
  }

  ngOnInit() {
    this.editor = new MediumEditor(this.elementRef.nativeElement);
  }
}
