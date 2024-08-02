import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HosteleriaService {
  private apiUrl = `${environment.baseUrl}/admin/hosteleria`;

  constructor(private http: HttpClient) { }

  createHosteleria(hosteleriaData: any): Observable<any> {
    return this.http.post(this.apiUrl, hosteleriaData);
  }

  getAllHostelerias(): Observable<any> {
    return this.http.get(`${this.apiUrl}s`);
  }

  getHosteleriaById(id_hosteleria: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id_hosteleria}`);
  }

  updateHosteleria(hosteleriaData: any): Observable<any> {
    return this.http.put(this.apiUrl, hosteleriaData);
  }

  deleteHosteleria(id_hosteleria: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id_hosteleria}`);
  }
}
