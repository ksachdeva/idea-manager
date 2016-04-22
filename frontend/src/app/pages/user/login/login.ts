import { Component} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import parse = require('parse');

const Parse = parse.Parse;
const template = require('./login.html');

@Component({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class LoginPage {
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
    event.preventDefault();
    Parse.User.logIn(username, password)
      .then((success) => this._onSuccessfulLogin(), (error) => console.error('error'));
  }

  private _onSuccessfulLogin() {
    this.router.parent.navigate(['IdeaList']);
  }

}
