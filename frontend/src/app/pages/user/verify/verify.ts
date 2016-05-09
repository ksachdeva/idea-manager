import { Component, Inject} from '@angular/core';
import { Router, RouterLink } from '@angular/router-deprecated';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { AngularFire, FirebaseRef, FirebaseAuthState, FirebaseAuth} from 'angularfire2';

import {Store} from './../../../store';

const template = require('./verify.html');

@Component({
  selector: 'verify',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template: template
})
export class VerifyPage {

  invalidCredentials: boolean;

  constructor(
    @Inject(FirebaseRef) private fb: Firebase,
    public router: Router,
    private af: AngularFire,
    private store: Store) {

    this.invalidCredentials = false;
  }

  verify(event, code_value) {
    event.preventDefault();

    this.invalidCredentials = false;

    const userNode = `users/${this.store.user.uid}`;

    // set the verification in progress to true
    this.fb.child(`${userNode}/verification_in_progress`).set(true)
      .then(() => {
        return this.fb.child(`code_verifier/${this.store.user.uid}`).set({
          code: code_value
        });
      })
      .then(() => {
        const fbRef = this.fb.child(`${userNode}/verification_in_progress`);
        const fn = fbRef.on('value', (snapShot) => {
          if (snapShot.val() == false) { // <= verification was done
            fbRef.off('value', fn);

            // now we check if the verification was successful or not
            this.fb.child(`${userNode}/verified`).once('value')
              .then((snapShot) => {
                if (snapShot.val() == true) {
                  this.router.parent.navigate(['IdeaList']);
                } else {
                  this.invalidCredentials = true;
                }
              });
          }
        });
      });
  }
}
