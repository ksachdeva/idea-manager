import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {FirebaseAuth} from 'angularfire2';

@Directive({
  selector: 'router-outlet'
})
export class LoggedInRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(
    private fbAuth: FirebaseAuth,
    _elementRef: ElementRef, _loader: DynamicComponentLoader,
    _parentRouter: Router, @Attribute('name') nameAttr: string) {

    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    this.publicRoutes = ['login', 'signup', 'forgot'];
  }

  activate(instruction) {
    if (this._canActivate(instruction.urlPath)) {
      return super.activate(instruction);
    }

    this.parentRouter.navigate(['Login']);
  }

  _canActivate(url) {
    const authData = this.fbAuth.getAuth();
    return this.publicRoutes.indexOf(url) !== -1 || (authData !== null);
  }
}
