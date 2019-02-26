import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {

    constructor(private router: Router, private _authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser') && this._authenticationService.isAdmin()) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        // this._authenticationService.logout();
        this.router.navigate(['/login']);
        return false;
    }
}
