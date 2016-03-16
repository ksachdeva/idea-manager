import { Component, View } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http } from 'angular2/http';
import parse = require('parse');

const Parse = parse.Parse;
const template = require('./signup.html');

@Component({
  selector: 'signup'
})
@View({
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class SignupPage {
  constructor(public router: Router, public http: Http) {
  }

  signup(event, name, username, password, passwordAgain) {
    event.preventDefault();
    Parse.User.signUp(username, password, {
      name: name
    }).then((success) => this._onSuccessfullSignup());
  }

  login(event) {
    event.preventDefault();
    this.router.parent.navigate(['Login']);
  }

  private _onSuccessfullSignup() {
    this.router.parent.navigate(['IdeaList']);
  }

}
