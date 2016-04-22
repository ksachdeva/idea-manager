declare var process: any;
declare var module: any;

import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootcards/dist/css/bootcards-desktop.css';

import './assets/app.css';

import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/bootstrap.css';

import {bootstrap} from 'angular2/platform/browser';

import {App, APP_PROVIDERS} from './app';

export function main(initialHmrState?: any): Promise<any> {

  return bootstrap(App, [
    ...APP_PROVIDERS
  ])
  .catch(err => console.error(err));
}

if ('development' === ENV && HMR === true) {
  // activate hot module reload
  let ngHmr = require('angular2-hmr');
  ngHmr.hotModuleReplacement(main, module);
} else {
  // bootstrap when documetn is ready
  document.addEventListener('DOMContentLoaded', () => main());
}