import {View, Component} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router} from 'angular2/router';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {LoginPage, SignupPage, ForgotPage} from './pages';
import {NewIdeaPage, EditIdeaPage, IdeaListPage} from './pages';
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
  { path: '/login', component: LoginPage, as: 'Login' },
  { path: '/forgot', component: ForgotPage, as: 'Forgot' },
  { path: '/signup', component: SignupPage, as: 'SignUp' },
  { path: '/idea/new', component: NewIdeaPage, as: 'NewIdea' },
  { path: '/idea/update/:id', component: EditIdeaPage, as: 'EditIdea' },
  { path: '/idea', component: IdeaListPage, as: 'IdeaList' },
])

export class App {
  constructor(public router: Router) {
    Parse.initialize('myAppId', 'empty');
    Parse.serverURL = 'http://localhost:1337/parse';
  }

  isUserLoggedOut() {
    return Parse.User.current() === null;
  }

  logout() {
    Parse.User.logOut().then(() => this.router.navigate(['Login']));
  }

  isActive(instruction: any[]): boolean {
    return this.router.isRouteActive(this.router.generate(instruction));
  }
}
