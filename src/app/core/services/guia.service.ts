import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {
  private apiUrl = `${environment.baseUrl}/admin/guia`;

  constructor(private http: HttpClient) { }

  createGuia(guiaData: any): Observable<any> {
    return this.http.post(this.apiUrl, guiaData);
  }

  getAllGuias(): Observable<any> {
    return this.http.get(`${this.apiUrl}s`);
  }

  getGuiaById(id_guia: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id_guia}`);
  }

  updateGuia(guiaData: any): Observable<any> {
    return this.http.put(this.apiUrl, guiaData);
  }

  deleteGuia(id_guia: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_guia}`);
  }
}
