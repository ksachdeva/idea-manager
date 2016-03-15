import {Component, Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Modal, ModalDialogInstance,
ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Idea, Comment} from './../models';

import parse = require('parse');
const Parse = parse.Parse;

export interface INewCommentData {
  ideaObjectId: string;
  ideaTitle: string;
}

@Component({
  selector: 'modal-content',
  directives: [CORE_DIRECTIVES],
  template: `
      <div class="modal-header" style="display:none;">
        <h3 class="modal-title"></h3>
      </div>
      <div class="modal-body">
        <div class="panel panel-primary">
          <div class="panel-heading clearfix">
            <h3 class="panel-title pull-left">{{context.ideaTitle}}</h3>
          </div>

          <div class="panel-body">
              <div class="form-group text-center">
                <div>
                  <textarea [(ngModel)]="comment" placeholder="Please type your comment .."
                    style="height:100px;" type="textarea"
                    class="form-control" id="summary"></textarea>
                </div>
              </div>
              <div class="form-group text-center">
                <div>
                  <button (click)="closeDialog()" class="btn btn-danger">Cancel</button>
                  <button (click)="saveComment()" class="btn btn-success"
                    type="submit">Submit</button>
                </div>
              </div>

          </div>
        </div>
      </div>
      <div class="modal-footer" style="display:none;"></div>
    `
})
export class NewCommentModal implements ICustomModalComponent {
  dialog: ModalDialogInstance;
  context: INewCommentData;
  comment: string;

  constructor(
    dialog: ModalDialogInstance,
    modelContentData: ICustomModal) {
    this.dialog = dialog;
    this.context = <INewCommentData>modelContentData;
  }

  closeDialog() {
    this.dialog.close();
  }

  saveComment() {
    const commentObj = new Comment();
    commentObj.value = this.comment;
    commentObj.author = Parse.User.current();
    commentObj.idea = new Idea();
    commentObj.idea.id = this.context.ideaObjectId;

    commentObj.save(commentObj.attrs).then((success) => {
      this.dialog.close();
    });
  }

  onKeyUp(value) {
    this.dialog.close();
  }

  beforeDismiss(): boolean {
    return true;
  }

  beforeClose(): boolean {
    return false;
  }
}
