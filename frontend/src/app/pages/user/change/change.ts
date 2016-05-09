import { Component, Inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import {AngularFire, FirebaseRef, FirebaseAuth} from 'angularfire2';

import {encodeEmail} from './../../../utils';

const template = require('./change.html');

@Component({
  selector: 'change',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class ChangePasswordPage {

  invalidCredentials: boolean;
  errorMessage: string;

  constructor(
    @Inject(FirebaseRef) private fb: Firebase,
    private fbAuth: FirebaseAuth,
    public router: Router,
    public http: Http) {

    this.invalidCredentials = false;
  }

  change(event, username, tmpPassword, password, passwordAgain) {
    event.preventDefault();

    this.invalidCredentials = false;

    this.fb.changePassword({
      email: username,
      oldPassword: tmpPassword,
      newPassword: password
    }, (error) => {
      this.invalidCredentials = true;
      if (error) {
        switch (error.code) {
          case 'INVALID_PASSWORD':
            this.errorMessage = 'The specified user account password is incorrect.';
            break;
          case 'INVALID_USER':
            this.errorMessage = 'The specified user account does not exist.';
            break;
          default:
            console.log('Error changing password:', error);
            this.errorMessage = 'Unknown Error !!';
        }
      } else {
        console.log('User password changed successfully!');
        this._onSuccessfullChange();
      }
    });
  }

  login(event) {
    event.preventDefault();
    this.router.parent.navigate(['Login']);
  }

  private _onSuccessfullChange() {
    this.router.parent.navigate(['Login']);
  }

}
