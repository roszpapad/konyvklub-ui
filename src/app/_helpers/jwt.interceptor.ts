import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClient } from "../../../node_modules/@angular/common/http";
import { environment } from "../../environments/environment";
import { AuthenticationService } from '../_services/authentication.service';

// const API_URL = environment.apiUrl;

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = localStorage.getItem('currentUser');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        // else{
        //   this._authenticationService.logout();
        //   return this.http.get();
        // }

        return next.handle(request);
    }

    constructor(private _authenticationService: AuthenticationService, private http: HttpClient) { }
}
