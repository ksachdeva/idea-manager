import {Observable} from 'rxjs';
import {Component, Input, Output, ElementRef, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import { Router, RouterLink, RouteParams } from '@angular/router-deprecated';
import {AngularFire} from 'angularfire2';

import {Idea, Comment} from './../models/models';
import {UpVoteComponent} from './upvote';
import {Store} from './../store';

@Component({
  selector: 'idea',
  directives: [CORE_DIRECTIVES, UpVoteComponent],
  template: `
  <div class="panel panel-primary" >
    <div class="panel-heading clearfix">
      <h3 class="panel-title pull-left">{{idea.data.title}}</h3>
      <!--
      <upvote class="pull-right"></upvote> -->
    </div>
    <div class="list-group">
      <div class="list-group-item">
        <div class="list-group-item-text" [innerHTML]="idea.data.summary"></div>
      </div>
      <div class="list-group-item">
        <p class="list-group-item-text">Author</p>
        <p class="list-group-item-heading">{{idea.meta.author.name}}</p>
      </div>
    </div>

    <div [class.collapse]="collapse" class="panel panel-default" style="margin:10px;" >
      <div class="panel-heading clearfix">
        <h3 class="panel-title pull-left">Comments</h3>
        <a (click)="toggleComments()" class="btn btn-primary pull-right" href="javascript:void(0)">
          Hide
        </a>
      </div>

      <div *ngFor="let c of comments | async" class="panel panel-default" style="margin:10px;">
        <div class="list-group">
          <div class="list-group-item">
            <div class="list-group-item-text" [innerHTML]="c.value"></div>
          </div>
          <div class="list-group-item">
            <p class="list-group-item-text">by {{c.author.name}}</p>
          </div>
        </div>
      </div>

    </div>

    <div class="panel-footer">
      <a class="pull-left" href="javascript:void(0)" (click)="toggleComments()"><span class="badge">
      <i class="fa fa-comments"></i> {{ (comments | async).length }} Comments</span></a>

      <div class="pull-right">
        <a href="javascript:void(0)" (click)="newComment()">
          <i class="fa fa-plus"></i> Add Comment
        </a>
        <a (click)="editIdea()" [hidden]="!canEdit"
          href="javascript:void(0)" (click)="editIdea()">
          <i class="fa fa-edit"></i> Edit
        </a>
      </div>
    </div>
  </div>
  `
})
export class IdeaComponent {

  collapse: boolean;
  canEdit: boolean;
  comments: Observable<Comment[]>;

  @Input() idea: Idea;
  @Output() onAddComment = new EventEmitter();

  constructor(
    private store: Store,
    private af: AngularFire,
    private router: Router) {

    this.collapse = true;
  }

  toggleComments() {
    this.collapse = !this.collapse;
  }

  newComment() {
    this.onAddComment.emit({});
  }

  editIdea() {
    this.router.parent.navigate(['EditIdea', {
      id: this.idea.$key
    }]);
  }

  ngOnInit() {
    this.canEdit = this.store.user.email === this.idea.meta.author.email;
    this.comments = this.af.database.list(`/ideas/${this.idea.$key}/comments`);
  }

  ngOnDestroy() {
  }
}
