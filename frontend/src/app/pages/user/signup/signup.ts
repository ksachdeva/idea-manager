import { Component} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http } from 'angular2/http';
import {AngularFire, FirebaseAuth} from 'angularfire2';
import {encodeEmail} from './../../../utils';

const template = require('./signup.html');

@Component({
  selector: 'signup',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class SignupPage {

  invalidCredentials: boolean;
  errorMessage: string;

  constructor(
    private af: AngularFire,
    private fbAuth: FirebaseAuth,
    public router: Router,
    public http: Http) {

    this.invalidCredentials = false;
  }

  signup(event, name, username, password, passwordAgain) {
    event.preventDefault();

    this.invalidCredentials = false;

    this.fbAuth.createUser({
      email: username,
      password
    })
      .then((authData) => {
        return this.fbAuth.login({
          email: username,
          password
        });
      })
      .then((authData) => {
        return this.af.object('/users/' + authData.uid).set({
          name,
          email: username,
          uid: authData.uid,
          verified: false,
          verification_in_progress: false
        });
      })
      .then(authData => this._onSuccessfullSignup())
      .catch((error) => {
        this.invalidCredentials = true;
        switch (error.code) {
          case 'EMAIL_TAKEN':
            this.errorMessage = `The new user account cannot be created
              because the email is already in use.`;
            break;
          case 'INVALID_EMAIL':
            this.errorMessage = 'The specified email is not a valid email.';
            break;
          default:
            console.log('Error creating user:', error);
            this.errorMessage = 'Unknown error when creating the user';
        }
      });

  }

  login(event) {
    event.preventDefault();
    this.router.parent.navigate(['Login']);
  }

  private _onSuccessfullSignup() {
    this.router.parent.navigate(['Login']);
  }

}
