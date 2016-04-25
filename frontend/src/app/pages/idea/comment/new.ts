import {Component, Input, ViewChild} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {Modal, ModalDialogInstance, ICustomModal, ICustomModalComponent} from 'angular2-modal';
import {Idea, Comment} from './../../../models/models';
import {RichTextComponent} from '../../../components/richtext';
import {ADDED_NEW_COMMENT} from '../../../const';
import {AngularFire} from 'angularfire2';

import {Store} from './../../../store';

export interface INewCommentData {
  ideaObjectId: string;
  ideaTitle: string;
}

@Component({
  selector: 'modal-content',
  directives: [CORE_DIRECTIVES, RichTextComponent],
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
              <div class="form-group">
                <div rich-text class="form-control rich-editor" style="height:100px;"></div>
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

  @ViewChild(RichTextComponent) richText: RichTextComponent;

  constructor(
    private af: AngularFire,
    private store: Store,
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
    commentObj.value = this.richText.value;
    commentObj.author = {
       email : this.store.user.email,
       name: this.store.user.name
    };
    commentObj.idea = this.context.ideaObjectId;

    this.af.database.list('/ideas/' + this.context.ideaObjectId + '/comments')
      .push(commentObj)
      .then(() => this.dialog.close());
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
