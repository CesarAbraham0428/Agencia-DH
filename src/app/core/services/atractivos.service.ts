import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtractivosService {
  private apiUrl = `${environment.baseUrl}/admin/atractivo`;

  constructor(private http: HttpClient) { }

  createAtractivo(atractivoData: any): Observable<any> {
    return this.http.post(this.apiUrl, atractivoData);
  }

  getAllAtractivos(): Observable<any> {
    return this.http.get(`${this.apiUrl}s`);
  }

  getAtractivoById(id_atracTuris: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id_atracTuris}`);
  }

  updateAtractivo(atractivoData: any): Observable<any> {
    return this.http.put(this.apiUrl, atractivoData);
  }

  deleteAtractivo(id_atracTuris: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_atracTuris}`);
  }
}
