import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // All APIs Calling Method

  // Get Method
  public get(endpoint: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${endpoint}`);
  }

  // Post Method
  public post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${endpoint}`, data);
  }

  // Put Method
  public put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${endpoint}`, data);
  }

  // Delete Method
  public delete(endpoint: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${endpoint}`);
  }

}
