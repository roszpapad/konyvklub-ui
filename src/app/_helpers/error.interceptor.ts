import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';
import {_throw} from "rxjs/observable/throw";


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).catch(
      err => {
        this.errorHandling(err);
        return _throw(err); 
      }
    );



  }

  errorHandling(err) {
    
    if (err.status === 401) {
      
      this.router.navigate(['/login']);
      return empty();
    }

    if (err.status === 403) {
      
      this.router.navigate(['/login']);
      return empty();
    }

    if (err.status === 404) {
      console.log("A message :");
      console.log(err.error);
      
      this.router.navigate(['/404error'],{queryParams : {message : err.error}});
      return empty();
    }
    
  }
}
