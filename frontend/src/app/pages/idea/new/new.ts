import { Component, View, ViewChild } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import parse = require('parse');

import {Idea} from './../../../models/models';
import {RichTextComponent} from '../../../components/richtext';

const Parse = parse.Parse;
const template = require('./new.html');

@Component({
  selector: 'new-idea'
})
@View({
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, RichTextComponent],
  template: template
})
export class NewIdeaPage {

  idea: Idea;
  isBusy: boolean;

  @ViewChild(RichTextComponent) richText: RichTextComponent;

  constructor(public router: Router) {
    this.idea = new Idea();
    this.isBusy = false;
  }

  save() {
    this.idea.author = Parse.User.current();
    this.idea.summary = this.richText.value;

    const acl = new Parse.ACL();
    // admins can always read
    acl.setRoleReadAccess('Admin', true);
    // only this user can edit and read the post
    acl.setWriteAccess(Parse.User.current().id, true);
    acl.setReadAccess(Parse.User.current().id, true);
    acl.setPublicReadAccess(!this.idea.isPrivate);

    this.idea.setACL(acl);

    this.idea.save(this.idea.attrs).then((success) => this.router.parent.navigate(['IdeaList']));
  }
}
