import {Component} from 'angular2/core';
import {Location, RouteConfig, RouterLink, Router} from 'angular2/router';
import {FirebaseAuth} from 'angularfire2';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {LoginPage, SignupPage, ForgotPage} from './pages';
import {NewIdeaPage, EditIdeaPage, IdeaListPage} from './pages';
import {Store} from './store';

const template = require('./app.html');

@Component({
  selector: 'idea-app',
  template: template,
  providers: [Store],
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
  constructor(
    public router: Router,
    private store: Store,
    private fbAuth: FirebaseAuth) {

  }

  ngOnInit() {
    if (!this.isUserLoggedOut()) {
      this.store.populateUserInfoFromLocalStorage();
      this.store.user.loggedIn = true;
    }
  }

  isUserLoggedOut() {
    return this.fbAuth.getAuth() === null;
  }

  logout() {
    this.fbAuth.logout();
    this.router.navigate(['Login']);
  }

  isActive(instruction: any[]): boolean {
    return this.router.isRouteActive(this.router.generate(instruction));
  }
}
