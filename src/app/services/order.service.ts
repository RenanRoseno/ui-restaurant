import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private serverUrl: string;

  constructor(private httpClient: HttpClient) {
    this.serverUrl = `${environment.apiUrl}/orders`;
  }

  public save(order: Order): Observable<Order> {
    return this.httpClient.post<Order>(this.serverUrl, order)
  }

  public getByTableSession(tableSessionId: string): Observable<Array<Order>> {
    return this.httpClient.get<Array<Order>>(`${this.serverUrl}/table-session/${tableSessionId}`);
  }

  public getTotalByTableSession(tableSessionId: string): Observable<number> {
    return this.httpClient.get<number>(`${this.serverUrl}/table-session/${tableSessionId}/total`);
  }

}
