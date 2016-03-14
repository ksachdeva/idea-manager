import { Component, View, provide, Injector } from 'angular2/core';

import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import parse = require('parse');
import {ModalDialogInstance, ModalConfig, Modal, ICustomModal,
YesNoModalContent, YesNoModal} from 'angular2-modal';

import {Idea} from './../models';
import {INewCommentData, NewCommentModal} from '../comment/new';
import {CommentCountPipe} from '../comment/count-pipe';

const Parse = parse.Parse;
const template = require('./list.html');

@Component({
  selector: 'idea-list',
  providers: [Modal],
  pipes: [CommentCountPipe],
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class IdeaList {

  ideas: Idea[];

  constructor(public router: Router, private modal: Modal) {
    this.ideas = [];
  }

  ngOnInit() {
    const query = new Parse.Query(Idea);
    query.find().then((results: any) => {
      this.ideas = results.map((r) => new Idea(r));
    });
  }

  newComment(idea: Idea) {
    let dialog: Promise<ModalDialogInstance>;
    let component = NewCommentModal;

    let bindings = Injector.resolve([
      provide(ICustomModal, {
        useValue: {
          ideaObjectId: idea.id,
          ideaTitle: idea.title
        }
      })
    ]);

    dialog = this.modal.open(
      <any>component,
      bindings,
      new ModalConfig('lg', true, 27));

    dialog.then((resultPromise) => {
      return resultPromise.result.then((result) => {
        console.log('done');
      }, (error) => console.log('error ', error));
    });
  }
}
