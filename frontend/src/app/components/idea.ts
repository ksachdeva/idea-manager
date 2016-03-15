import {Component, Input, Output, ElementRef, EventEmitter} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import { Router, RouterLink, RouteParams } from 'angular2/router';
import parse = require('parse');
import {Idea, Comment} from './../models/models';
import {CommentCountPipe} from './../pipes/count-pipe';

const Parse = parse.Parse;

@Component({
  selector: 'idea',
  pipes: [CommentCountPipe],
  directives: [CORE_DIRECTIVES],
  template: `
  <div class="panel panel-primary" >
    <div class="panel-heading clearfix">
      <h3 class="panel-title pull-left">{{idea.title}}</h3>
      <a (click)="editIdea()" [hidden]="!canEdit" class="btn btn-success pull-right">
        <i class="fa fa-pencil"></i>
        Edit
      </a>
    </div>
    <div class="list-group">
      <div class="list-group-item">
        <div class="list-group-item-text" [innerHTML]="idea.summary"></div>
      </div>
      <div class="list-group-item">
        <p class="list-group-item-text">Author</p>
        <p class="list-group-item-heading">{{idea.author.get('name')}}</p>
      </div>
    </div>

    <div [class.collapse]="collapse" class="panel panel-default" style="margin:10px;" >
      <div class="panel-heading clearfix">
        <h3 class="panel-title pull-left">Comments</h3>
        <a (click)="toggleComments()" class="btn btn-primary pull-right" href="javascript:void(0)">
          Hide
        </a>
      </div>

      <div *ngFor="#c of comments" class="panel panel-default" style="margin:10px;">
        <div class="list-group">
          <div class="list-group-item">
            <div class="list-group-item-text" [innerHTML]="c.value"></div>
          </div>
          <div class="list-group-item">
            <p class="list-group-item-text">by {{c.author.get('name')}}</p>
          </div>
        </div>
      </div>

    </div>

    <div class="panel-footer">
      <a class="pull-left" href="javascript:void(0)" (click)="toggleComments()"><span class="badge">
      <i class="fa fa-comments"></i> {{ idea.id | commentCount }} Comments</span></a>
      <a class="pull-right" href="javascript:void(0)" (click)="newComment()">
      <i class="fa fa-plus"></i> Add Comment</a>
    </div>
  </div>
  `
})
export class IdeaComponent {

  collapse: boolean;
  canEdit: boolean;
  comments: Comment[];

  @Input() idea: Idea;
  @Output() onAddComment = new EventEmitter();

  constructor(private router: Router) {
    this.collapse = true;
    this.canEdit = false;
  }

  toggleComments() {
    this.collapse = !this.collapse;
  }

  newComment() {
    this.onAddComment.emit({});
  }

  editIdea() {
    this.router.parent.navigate(['EditIdea', {
      id: this.idea.id
    }]);
  }

  ngOnInit() {
    this.canEdit = Parse.User.current().id === this.idea.author.id;
    console.log(this.canEdit);
    const query = new Parse.Query(Comment);
    query.equalTo('idea', this.idea);
    query.find().then((results: any) => {
      this.comments = results.map((r) => new Comment(r));
    });
  }
}
