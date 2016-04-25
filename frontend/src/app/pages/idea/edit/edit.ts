import {Observable} from 'rxjs';
import { Component, ViewChild } from 'angular2/core';
import { Router, RouterLink, RouteParams } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import {Idea} from './../../../models/models';
import {RichTextComponent} from '../../../components/richtext';
import {AngularFire} from 'angularfire2';

const template = require('./edit.html');

@Component({
  selector: 'edit-idea',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, RichTextComponent],
  template: template
})
export class EditIdeaPage {

  idea: Observable<Idea>;
  ideaId: string;

  @ViewChild(RichTextComponent) richText: RichTextComponent;

  constructor(
    private af: AngularFire,
    public router: Router,
    params: RouteParams) {

    this.idea = af.database.object('/ideas/' + params.get('id'));
  }


  ngOnInit() {

    /*const parseIdea = new Idea();
    parseIdea.id = this.ideaId;
    parseIdea.fetch({}).then(() => {
      this.idea = new Idea(parseIdea);
      this.richText.editor.setContent(this.idea.summary, 0);
    });*/

  }

  save() {
    // this.idea.summary = this.richText.value;
    // this.idea.save(this.idea.attrs).then((success) => this.router.parent.navigate(['IdeaList']));



  }
}
