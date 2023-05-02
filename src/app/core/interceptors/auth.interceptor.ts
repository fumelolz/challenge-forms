import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly _snackBar: MatSnackBar
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const routes = [
      'http://localhost:8000/auth/login',
      'http://localhost:8000/auth/register',
    ];
    if (routes.includes(request.url)) {
      return next.handle(request);
    }
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${this.authService.token}` },
    });
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this._snackBar.open('La sesión caduco', '', {
            duration: 3000,
          });
          this.authService.logout();
        }

        if (error.status === 500) {
          this._snackBar.open('Ocurrio un error', '', {
            duration: 3000,
          });
          this.authService.logout();
        }
        return throwError(() => new Error('test'));
      })
    );
  }
}
