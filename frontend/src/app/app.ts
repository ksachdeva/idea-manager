import {View, Component} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router} from 'angular2/router';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Login, Signup, Forgot} from './user';
import {NewIdea, IdeaList} from './idea';
import parse = require('parse');

const Parse = parse.Parse;
const template = require('./app.html');

@Component({
  selector: 'idea-app'
})
@View({
  template: template,
  directives: [RouterLink, LoggedInRouterOutlet]
})
@RouteConfig([
  { path: '/', redirectTo: ['/IdeaList'] },
  { path: '/login', component: Login, as: 'Login' },
  { path: '/forgot', component: Forgot, as: 'Forgot' },
  { path: '/signup', component: Signup, as: 'SignUp' },
  { path: '/idea/new', component: NewIdea, as: 'NewIdea' },
  { path: '/idea', component: IdeaList, as: 'IdeaList' },
])

export class App {
  constructor(public router: Router) {
    Parse.initialize('myAppId', 'empty');
    Parse.serverURL = 'http://localhost:1337/parse';
  }
}
