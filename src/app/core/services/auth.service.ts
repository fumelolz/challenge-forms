import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(body: any): Observable<any> {
    return this.http.post(environment.api.concat('/auth/login'), body);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_data');

    this.router.navigate(['auth', 'login']);
  }

  isLoggedIn() {
    return localStorage.getItem('access_token') !== null ? true : false;
  }

  get token(): string {
    return localStorage.getItem('access_token')!;
  }

  get role(): string {
    return localStorage.getItem('role')!;
  }

  get user(): string {
    return JSON.parse(localStorage.getItem('user_data')!);
  }
}
