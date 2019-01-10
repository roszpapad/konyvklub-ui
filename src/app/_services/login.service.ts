import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  set loggedIn(value: boolean) {
    this._loggedIn = value;
  }

  private _loggedIn = false;
  
  constructor(private authenticationService: AuthenticationService) { }

  login(username, password) {
    return this.authenticationService.login(username, password);
  }

}
