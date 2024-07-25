import { Injectable } from '@angular/core';
import { Transportista } from '../../interfaces/transportista.interface';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  insertarTransportista(transportista: Transportista): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/transportista`, transportista);
  }

  deleteTransportista(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/transportista/${id}`);
  }

  updateTransportista(id: number, updates: Partial<Transportista>): Observable<any> {
    return this.http.patch(`${this.baseUrl}/admin/transportista/${id}`, updates);
  }

  getTransportista(id: number): Observable<Transportista> {
    return this.http.get<Transportista>(`${this.baseUrl}/admin/transportista/${id}`);
  }

};
