import { Component, View } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { Router } from 'angular2/router';
import parse = require('parse');

const Parse = parse.Parse;
const styles = require('./home.css');
const template = require('./home.html');

@Component({
  selector: 'home'
})
@View({
  directives: [CORE_DIRECTIVES],
  template: template,
  styles: [styles]
})
export class Home {

  constructor(public router: Router, public http: Http) {
  }

  logout() {
    Parse.User.logOut();
    this.router.parent.navigateByUrl('/login');
  }

}
