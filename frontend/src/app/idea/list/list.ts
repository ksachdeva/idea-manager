import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import parse = require('parse');

import {Idea} from './../models';

const Parse = parse.Parse;
const template = require('./list.html');

@Component({
  selector: 'idea-list'
})
@View({
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class IdeaList {

  ideas: Idea[];

  constructor(public router: Router) {
    this.ideas = [];
  }

  ngOnInit() {
    const query = new Parse.Query(Idea);
    query.find().then((results: any) => {
      this.ideas = results.map((r) => new Idea(r));
      console.log(this.ideas);
    });
  }
}
