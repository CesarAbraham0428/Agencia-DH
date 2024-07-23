import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioGenericoCRUD {
  private apiUrl = 'http://localhost:3000'; //  URL Generica a la base de datos

  constructor(private http: HttpClient) { }

  getAll<T>(entityName: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${entityName}`);
  }

  getOne(entityName: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${entityName}/${id}`);
  }

  create(entityName: string, entity: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${entityName}`, entity);
  }

  update(entityName: string, id: number, entity: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${entityName}/${id}`, entity);
  }

  delete(entityName: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${entityName}/${id}`);
  }
}