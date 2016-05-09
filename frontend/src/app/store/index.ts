import {Injectable} from '@angular/core';
import {User} from './../models/models';

@Injectable()
export class Store {
  public user: User;

  constructor() {
    this.user = new User();
  }

  pushUserInfoInLocalStorage() {
    localStorage.setItem('authUser', JSON.stringify(this.user));
  }

  populateUserInfoFromLocalStorage() {
    const info = JSON.parse(localStorage.getItem('authUser'));
    this.user.name = info.name;
    this.user.email = info.email;
    this.user.uid = info.uid;
  }
}
