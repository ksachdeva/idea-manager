import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import parse = require('parse');

import {Idea} from './../models';

const Parse = parse.Parse;
const template = require('./new.html');

@Component({
  selector: 'new-idea'
})
@View({
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class NewIdea {

  idea: Idea;

  constructor(public router: Router) {
    this.idea = new Idea();
  }

  save() {
    this.idea.author = Parse.User.current();
    this.idea.save(this.idea.attrs).then((success) => console.log('done'));
  }
}
