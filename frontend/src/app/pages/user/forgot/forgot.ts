import { Component, Inject} from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { FirebaseRef} from 'angularfire2';

const template = require('./forgot.html');

@Component({
  selector: 'forgot',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class ForgotPage {

  invalidCredentials: boolean;

  constructor(
    @Inject(FirebaseRef) private fb: Firebase,
    public router: Router,
    public http: Http) {

    this.invalidCredentials = false;
  }

  forgot(event, email) {
    event.preventDefault();

    this.invalidCredentials = false;

    this.fb.resetPassword({
      email: email
    }, (error) => {
      if (error) {
        this.invalidCredentials = true;
        // TODO: Better handling of different error codes
        switch (error.code) {
          case 'INVALID_USER':
            console.log('The specified user account does not exist.');
            break;
          default:
            console.log('Error resetting password:', error);
        }
      } else {
        console.log('Password reset email sent successfully!');
      }
    });
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
