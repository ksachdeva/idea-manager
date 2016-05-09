import {
  FIREBASE_PROVIDERS,
  defaultFirebase,
  firebaseAuthConfig,
  AuthProviders,
  AuthMethods
} from 'angularfire2';

import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {MODAL_PROVIDERS} from 'angular2-modal';

export const APP_PROVIDERS = [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  FIREBASE_PROVIDERS,
  ...MODAL_PROVIDERS,
  defaultFirebase('https://test-idea-manager.firebaseio.com/'),
  firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
    remember: 'default'
  })
];

export * from './app';
