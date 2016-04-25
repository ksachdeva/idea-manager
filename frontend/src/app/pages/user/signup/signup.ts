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
  constructor(
    private af: AngularFire,
    private fbAuth: FirebaseAuth,
    public router: Router,
    public http: Http) {
  }

  signup(event, name, username, password, passwordAgain) {
    event.preventDefault();

    this.fbAuth.createUser({
      email: username,
      password
    })
    .then((authData) => {
      const hashedEmail = encodeEmail(username);
      return this.af.object('/users/' + hashedEmail).set({
        name,
        email: username
      });
    })
    .then(authData => this._onSuccessfullSignup());

  }

  login(event) {
    event.preventDefault();
    this.router.parent.navigate(['Login']);
  }

  private _onSuccessfullSignup() {
    this.router.parent.navigate(['IdeaList']);
  }

}
