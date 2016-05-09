import {Observable} from 'rxjs';
import { Component, Inject, ViewChild } from '@angular/core';
import { Router, RouterLink, RouteParams } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import {AngularFire, FirebaseRef} from 'angularfire2';

import {Idea} from './../../../models/models';
import {RichTextComponent} from '../../../components/richtext';

const template = require('./edit.html');

@Component({
  selector: 'edit-idea',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, RichTextComponent],
  template: template
})
export class EditIdeaPage {

  ideaKey: string;
  idea: Idea;
  ideaId: string;

  @ViewChild(RichTextComponent) richText: RichTextComponent;

  constructor(
    @Inject(FirebaseRef) private fb: Firebase,
    private af: AngularFire,
    public router: Router,
    params: RouteParams) {

    this.ideaKey = params.get('id');

    this.idea = new Idea();
  }

  ngOnInit() {
    this.fb.child('ideas').child(this.ideaKey).once('value')
      .then((snapShot: FirebaseDataSnapshot) => {
        this.idea = snapShot.val();
        this.richText.editor.setContent(this.idea.data.summary, 0);
      });
  }

  save() {
    this.idea.data.summary = this.richText.value;

    // save the data information
    this.fb.child(`ideas/${this.ideaKey}/data`).set({
      title: this.idea.data.title,
      summary: this.idea.data.summary
    }).then(() => {
      this.router.parent.navigate(['IdeaList']);
    });

    // save the selective meta information

  }
}
