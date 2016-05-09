import {Component, ViewContainerRef} from '@angular/core';
import {RouteConfig, RouterLink, Router} from '@angular/router-deprecated';
import {FirebaseAuth} from 'angularfire2';
import {Modal} from 'angular2-modal';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {LoginPage, SignupPage, ForgotPage} from './pages';
import {NewIdeaPage, EditIdeaPage, IdeaListPage, VerifyPage, ChangePasswordPage} from './pages';
import {Store} from './store';

const template = require('./app.html');

@Component({
  selector: 'idea-app',
  template: template,
  providers: [Store, Modal],
  directives: [RouterLink, LoggedInRouterOutlet]
})
@RouteConfig([
  { path: '/', redirectTo: ['/IdeaList'] },
  { path: '/verify', component: VerifyPage, as: 'Verify' },
  { path: '/login', component: LoginPage, as: 'Login' },
  { path: '/change', component: ChangePasswordPage, as: 'ChangePassword' },
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
    private modal: Modal,
    private viewContainer: ViewContainerRef,
    private fbAuth: FirebaseAuth) {
    modal.defaultViewContainer = viewContainer;
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
