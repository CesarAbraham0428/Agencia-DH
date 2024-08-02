import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {
  private apiUrl = `${environment.baseUrl}/admin/transportista`;

  constructor(private http: HttpClient) {}

  createTransportista(transportistaData: any): Observable<any> {
    return this.http.post(this.apiUrl, transportistaData);
  }

  getAllTransportistas(): Observable<any> {
    return this.http.get(`${this.apiUrl}s`);
  }

  getTransportistaById(id_trans: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id_trans}`);
  }

  updateTransportista(transportistaData: any): Observable<any> {
    return this.http.put(this.apiUrl, transportistaData);
  }

  deleteTransportista(id_trans: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_trans}`);
  }


};
