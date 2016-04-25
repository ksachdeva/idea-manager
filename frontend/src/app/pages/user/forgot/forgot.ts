import { Component} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';

const template = require('./forgot.html');

@Component({
  selector: 'forgot',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class ForgotPage {
  constructor(public router: Router, public http: Http) {
  }

  login(event) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/login');
  }

  signup(event) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/signup');
  }

}
