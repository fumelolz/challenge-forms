import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const logged = localStorage.getItem('access_token');
    const isRouteLogin = segments.find((x) => x.path === 'login');

    if (isRouteLogin && logged) {
      return this.router.createUrlTree(['/']);
    }

    if (!isRouteLogin && !logged) {
      return this.router.createUrlTree(['auth', 'login']);
    }

    return true;
  }
}
