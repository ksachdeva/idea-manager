import { Component, View, ViewChild } from 'angular2/core';
import { Router, RouterLink, RouteParams } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import parse = require('parse');

import {Idea} from './../../../models/models';
import {RichTextComponent} from '../../../components/richtext';

const Parse = parse.Parse;
const template = require('./edit.html');

@Component({
  selector: 'edit-idea'
})
@View({
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, RichTextComponent],
  template: template
})
export class EditIdeaPage {

  idea: Idea;
  ideaId: string;
  @ViewChild(RichTextComponent) richText: RichTextComponent;

  constructor(public router: Router, params: RouteParams) {
    this.idea = new Idea();
    this.ideaId = params.get('id');
  }

  ngOnInit() {
    const parseIdea = new Idea();
    parseIdea.id = this.ideaId;
    parseIdea.fetch({}).then(() => {
      this.idea = new Idea(parseIdea);
      this.richText.editor.setContent(this.idea.summary, 0);
    });
  }

  save() {
    this.idea.summary = this.richText.value;
    this.idea.save(this.idea.attrs).then((success) => this.router.parent.navigate(['IdeaList']));
  }
}
