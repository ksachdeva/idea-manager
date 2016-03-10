import {View, Component} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router} from 'angular2/router';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Home} from './home/home';
import {Login} from './login/login';
import {Signup} from './signup/signup';
import parse = require('parse');

const Parse = parse.Parse;
const template = require('./app.html');

@Component({
  selector: 'idea-app'
})
@View({
  template: template,
  directives: [LoggedInRouterOutlet]
})
@RouteConfig([
  { path: '/', redirectTo: ['/Home'] },
  { path: '/home', component: Home, as: 'Home' },
  { path: '/login', component: Login, as: 'Login' },
  { path: '/signup', component: Signup, as: 'Signup' }
])

export class App {
  constructor(public router: Router) {
    Parse.initialize('myAppId', 'empty');
    Parse.serverURL = 'http://localhost:1337/parse';
  }
}
