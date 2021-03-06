import { Component, Inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { AngularFire, FirebaseRef, FirebaseAuthState, FirebaseAuth} from 'angularfire2';

import {Store} from './../../../store';
import {encodeEmail} from './../../../utils';

const template = require('./login.html');

@Component({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class LoginPage {

  invalidCredentials: boolean;

  constructor(
    @Inject(FirebaseRef) private fb: Firebase,
    public router: Router,
    private af: AngularFire,
    private fbAuth: FirebaseAuth,
    private store: Store) {

    this.invalidCredentials = false;
  }

  login(event, username, password) {
    event.preventDefault();

    this.invalidCredentials = false;

    this.fbAuth.login({
      email: username,
      password
    })
      .then((authData: FirebaseAuthState) => {
        this.store.user.uid = authData.uid;
        this.store.user.isTemporaryPassword = authData.password.isTemporaryPassword;
        return this.fb.child('users')
          .child(authData.uid)
          .once('value');
      })
      .then((snapShot: FirebaseDataSnapshot) => {
        const val = snapShot.val();
        this.store.user.loggedIn = true;
        this.store.user.email = val.email;
        this.store.user.name = val.name;
        this.store.user.verified = val.verified;
        this.store.pushUserInfoInLocalStorage();

        if (this.store.user.isTemporaryPassword) {
          this.router.parent.navigate(['ChangePassword']);
        } else {
          if (val.verified) {
            this._onSuccessfulLogin();
          } else {
            this.router.parent.navigate(['Verify']);
          }
        }
      })
      .catch((error) => {
        this.invalidCredentials = true;
      });
  }

  private _onSuccessfulLogin() {
    this.router.parent.navigate(['IdeaList']);
  }

}
