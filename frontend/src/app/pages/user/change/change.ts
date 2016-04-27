import { Component, Inject} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http } from 'angular2/http';
import {AngularFire, FirebaseRef, FirebaseAuth} from 'angularfire2';
import {encodeEmail} from './../../../utils';

const template = require('./change.html');

@Component({
  selector: 'change',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class ChangePasswordPage {
  constructor(
    @Inject(FirebaseRef) private fb: Firebase,
    private fbAuth: FirebaseAuth,
    public router: Router,
    public http: Http) {
  }

  change(event, username, tmpPassword, password, passwordAgain) {
    event.preventDefault();

    this.fb.changePassword({
      email: username,
      oldPassword: tmpPassword,
      newPassword: password
    }, (error) => {
      if (error) {
        switch (error.code) {
          case 'INVALID_PASSWORD':
            console.log('The specified user account password is incorrect.');
            break;
          case 'INVALID_USER':
            console.log('The specified user account does not exist.');
            break;
          default:
            console.log('Error changing password:', error);
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
