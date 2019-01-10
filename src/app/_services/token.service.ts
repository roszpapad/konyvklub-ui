import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  jwtHelper: JwtHelper = new JwtHelper();
  constructor() { }

  getTokenProperty(property: string) {
    if (localStorage.getItem('currentUser')) {
      var token = localStorage.getItem('currentUser');
      var jsonData = this.jwtHelper.decodeToken(token);
      // console.log(jsonData);
      return jsonData[property];
    }
    return;
  }

  isTokenExpired() {
    if (localStorage.getItem('currentUser')) {
      return this.jwtHelper.isTokenExpired(localStorage.getItem('currentUser'));
    }
    return;
  }

}
