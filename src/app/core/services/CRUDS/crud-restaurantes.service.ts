/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {
  private apiUrl = 'http://localhost:3000/restaurante';

  constructor(private http: HttpClient) { }

  getRestaurantes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRestaurante(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createRestaurante(restaurante: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, restaurante);
  }

  updateRestaurante(id: number, restaurante: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, restaurante);
  }

  deleteRestaurante(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
} */