import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private serverUrl: string;

  constructor(private httpClient: HttpClient) {
    this.serverUrl = `${environment.apiUrl}/products`;
  }

  public getAll(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(this.serverUrl!);
  }

  public save(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.serverUrl, product)
  }

  public update(id: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${this.serverUrl}/${id}`, product)
  }

  public delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.serverUrl}/${id}`);
  }
}

