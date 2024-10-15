import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    console.log('isAuthenticated', isAuthenticated);

    const initRoutePattern = /^\/init\/.*/;

    if (isAuthenticated && (state.url === '/init/login' || initRoutePattern.test(state.url))) {
      this.router.navigate(['/home/principal']);
      return false;
    }

    if (!isAuthenticated && state.url !== '/init/login') {
      this.router.navigate(['/init/login']);
      return false;
    }

    return true;
  }
}
