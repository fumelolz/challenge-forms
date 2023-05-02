import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/Product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.api.concat('/api/products'));
  }

  getOneById(id: number): Observable<Product> {
    return this.http.get<Product>(
      environment.api.concat(`/api/products/${id}`)
    );
  }

  saveOne(body: Product): Observable<any> {
    return this.http.post(environment.api.concat('/api/products/'), body);
  }

  updateOne(id: number, body: Product): Observable<any> {
    return this.http.put(environment.api.concat(`/api/products/${id}`), body);
  }

  deleteOne(id: number): Observable<any> {
    return this.http.delete(environment.api.concat(`/api/products/${id}`));
  }
}
