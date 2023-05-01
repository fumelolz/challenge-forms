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
    return this.http.get<User[]>(environment.api.concat('/api/users'));
  }

  getOneById(id: number): Observable<User | null> {
    return this.http.get<User[]>(environment.api.concat(`/api/users`)).pipe(
      map((response) => {
        const users = response.filter((user) => user.id === id);
        if (users.length < 0) {
          return null;
        }
        return users[0];
      })
    );
  }

  saveOne(body: any): Observable<any> {
    return this.http.post(environment.api.concat('/api/users'), body);
  }

  updateOne(id: number, body: any): Observable<any> {
    return this.http.put(environment.api.concat(`/api/users/${id}`), body);
  }
}
