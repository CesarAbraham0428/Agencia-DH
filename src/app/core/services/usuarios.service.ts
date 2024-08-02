import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.baseUrl}/admin/usuario`;

  constructor(private http: HttpClient) { }

  getAllUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}s`);
  }

  getUsuarioById(id_usr: number): Observable<any> {  //Este no se usa 
    return this.http.get(`${this.apiUrl}/${id_usr}`);
  }
}
