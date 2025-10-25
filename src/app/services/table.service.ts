import { Injectable } from '@angular/core';
import { environment } from '../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../models/table';

@Injectable({
  providedIn: 'root'
})
export class TableService {
   private serverUrl: string;

  constructor(private httpClient: HttpClient) {
    this.serverUrl = `${environment.apiUrl}/products`;
  }

  public getAll(): Observable<Array<Table>> {
    return this.httpClient.get<Array<Table>>(this.serverUrl!);
  }
}
