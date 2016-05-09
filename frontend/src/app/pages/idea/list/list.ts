import {Observable} from 'rxjs';
import { Component, provide, ReflectiveInjector } from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import {AngularFire} from 'angularfire2';
import {ModalDialogInstance, ModalConfig, Modal, ICustomModal} from 'angular2-modal';

import {Idea, Comment} from './../../../models/models';
import {INewCommentData, NewCommentModal} from '../comment/new';
import {IdeaComponent} from '../../../components/idea';
import {Store} from './../../../store';

const template = require('./list.html');

@Component({
  selector: 'idea-list',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES, IdeaComponent],
  template: template
})
export class IdeaListPage {

  ideas: Observable<Idea[]>;
  username: string;

  constructor(
    private af: AngularFire,
    private store: Store,
    public router: Router,
    private modal: Modal) {

    this.ideas = af.database.list('/ideas');
    this.username = store.user.name;
  }

  ngOnInit() {
  }

  newComment(idea: Idea) {

    let dialog: Promise<ModalDialogInstance>;
    let component = NewCommentModal;

    let bindings = ReflectiveInjector.resolve([
      provide(Store, {
        useValue: this.store
      }),
      provide(ICustomModal, {
        useValue: {
          ideaObjectId: idea.$key,
          ideaTitle: idea.data.title
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
