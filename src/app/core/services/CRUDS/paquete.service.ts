/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaqueteService {
  private apiUrl = 'http://localhost:3000/paquete'; // URL del backend

  constructor(private http: HttpClient) {}

  crearPaquete(paquete: any): Observable<any> {
    return this.http.post(this.apiUrl, paquete);
  }
}
 */