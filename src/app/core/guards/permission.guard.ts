import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanLoad {
  constructor(
    private router: Router,
    private readonly _snackBar: MatSnackBar
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const role = localStorage.getItem('role') === 'ADMIN';
    const isRouteUsers = segments.find((x) => x.path === 'users');

    if (isRouteUsers && !role) {
      this._snackBar.open('No tienes permisos necesarios', '', {
        duration: 3000,
      });
      return this.router.createUrlTree(['/']);
    }

    return true;
  }
}
