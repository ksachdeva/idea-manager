import { Component, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import {AngularFire, FirebaseAuth} from 'angularfire2';
import * as _ from 'lodash';

import {Idea} from './../../../models/models';
import {RichTextComponent} from '../../../components/richtext';
import {Store} from './../../../store';

const template = require('./new.html');

@Component({
  selector: 'new-idea',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, RichTextComponent],
  template: template
})
export class NewIdeaPage {

  idea: Idea;
  isBusy: boolean;

  @ViewChild(RichTextComponent) richText: RichTextComponent;

  constructor(
    private store: Store,
    private af: AngularFire,
    public router: Router) {

    this.idea = new Idea();
    this.isBusy = false;
  }

  save() {

    this.idea.meta.author = {
      email: this.store.user.email,
      name: this.store.user.name,
      uid: this.store.user.uid
    };

    this.idea.data.summary = this.richText.value;

    this.af.list('/ideas')
      .push(_.omit(this.idea, '$key'))
      .then(() => this.router.parent.navigate(['IdeaList']));

  }
}
