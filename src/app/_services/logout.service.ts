import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private _authenticationService: AuthenticationService) { }

  logout() {
    return this._authenticationService.logout();
  }

}
