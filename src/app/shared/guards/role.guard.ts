import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from '../services/general/token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.tokenService.isTokenExpired()) {
      this.router.navigateByUrl('guest');
      return false;
    }

    const allowedRoles = route.data.roles as string [];

    const userRole = this.tokenService.getRoleFromToken();

    if (allowedRoles.length === 0 || allowedRoles.indexOf(userRole) === -1) {
      this.router.navigateByUrl('/page-not-allowed');
      return false;
    }

    return true;
  }

}
