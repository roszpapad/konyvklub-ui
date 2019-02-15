import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { JwtHelper } from 'angular2-jwt';
import { TokenService } from './token.service';
import { ResourceService } from './resource.service';

const AUTHORIZATION_URL = environment.authorizationServerUrl + environment.authorizationPath;
const CLIENT_ID = environment.clientId;
const CLIENT_SECRET = environment.clientSecret;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  @Output() getUserId: EventEmitter<any> = new EventEmitter();

  grantType: string = "password";

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: HttpClient, private tokenService: TokenService, private resourceService: ResourceService) { }

  login(username: string, password: string) {

    let params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', this.grantType);
    params.append('client_id', CLIENT_ID);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
      })
    };

    return this.http.post<any>(AUTHORIZATION_URL, params.toString(), httpOptions)
      .pipe(
        map(data => {
          if (data && data.access_token) {
            localStorage.setItem('currentUser', data.access_token);
            this.getUserId.emit(this.tokenService.getTokenProperty("id"));
          }
        }
        )
      )

  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    if (this.tokenService.isTokenExpired() || !localStorage.getItem("currentUser")) {
      return false;
    }
    else {
      return true;
    }
  }

  tokenContainsAuthority(token, authority) {
    let containedAuthorities = this.tokenService.getTokenProperty('authorities');
    return containedAuthorities.includes(authority);
  }

  isUser() {
    return localStorage.getItem("currentUser") && this.tokenContainsAuthority(localStorage.getItem("currentUser"), 'ROLE_KONYVKLUB_USER') && !this.tokenContainsAuthority(localStorage.getItem("currentUser"), 'ROLE_KONYVKLUB_ADMIN');
  }

  isAdmin() {
    return localStorage.getItem("currentUser") && this.tokenContainsAuthority(localStorage.getItem("currentUser"), 'ROLE_KONYVKLUB_ADMIN');
  }


  getUserInfo() {
    if (this.isAuthenticated()) {
      // let id = this.tokenService.getTokenProperty('id');
      // return this.resourceService.getResourceFromApi("/users/" + id)
      return {
        id: this.tokenService.getTokenProperty('id'),
        username: this.tokenService.getTokenProperty('user_name'),
        email: this.tokenService.getTokenProperty('email'),
        firstName: this.tokenService.getTokenProperty('firstName'),
        lastName: this.tokenService.getTokenProperty('lastName')
      }
    }
  }

}
