import { environment } from '../../../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioGenericoCRUD {
  private apiUrl = `${environment.baseUrl}/admin/paquete`;

  constructor(private http: HttpClient) { }

  getAll<T>(p0: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}`);
  }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getPaqueteCompleto(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/completo`);
  }

  getServiceId(servicio: any): number | null {
    return servicio && servicio.id ? servicio.id : null;
  }

  create(entity: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, entity);
  }

  update<T>(id: number, entity: T): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, entity);
  }

  delete(p0: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
