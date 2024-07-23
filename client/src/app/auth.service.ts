import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private loggedIn: Boolean = false;
  private storageKey = 'isLoggedIn'
  constructor() { this.loggedIn = !!localStorage.getItem('isLoggedIn'); }

  setLoginStatus(status: Boolean) {
    this.loggedIn = status;
    localStorage.setItem(this.storageKey,status? 'true': 'false');
  }

  isLoggedIn():Boolean{
    return this.loggedIn;
  }
  logout():void{
    this.setLoginStatus(false);
  }
}
