import { environment } from './../../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenciaService {
  private apiUrl = `${environment.baseUrl}/gestor/agencia`;

  constructor(private http: HttpClient) {}

  createAgencia(agenciaData: any): Observable<any> {
    return this.http.post(this.apiUrl, agenciaData);
  }

  getAllAgencias(): Observable<any> {
    return this.http.get(`${this.apiUrl}s`);
  }

  getAgenciaById(id_agencia: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id_agencia}`);
  }

  updateAgencia(agenciaData: any): Observable<any> {
    return this.http.put(this.apiUrl, agenciaData);
  }

  deleteAgencia(id_agencia: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_agencia}`);
  }
}
