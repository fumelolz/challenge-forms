import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.api_fake.concat('/users'));
  }

  getOneById(id: number): Observable<User> {
    return this.http.get<User>(environment.api_fake.concat(`/users/${id}`));
  }

  saveOne(body: any): Observable<any> {
    return this.http.post(environment.api.concat('/auth/register'), body);
  }

  updateOne(id: number, body: any): Observable<any> {
    return this.http.put(environment.api.concat(`/auth/users/${id}`), body);
  }
}
