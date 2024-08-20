import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, map, of } from 'rxjs';

export interface Usuario {
  id_usr: number;
  nom_usr: string;
  app_usr: string;
  nacionalidad_usr: string;
  sexo_usr: string;
  edad_usr: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = `${environment.baseUrl}/admin/usuario`;

  private apiUrlMarco = `${environment.baseUrl}/admin/usuario`;

  private apiUrlPaqueteUusario = `${environment.baseUrl}/usuario`;

  constructor(private http: HttpClient) { }

   getTodosUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrlMarco}`);
  }

    getAllUsuarios(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(`${this.apiUrl}s`).pipe(
        catchError(error => {
          console.error('Error en getAllUsuarios:', error);
          return of([]);
        })
      );
    }

    getUsuarioById(id_usr: number): Observable<Usuario> {
      return this.http.get<Usuario>(`${this.apiUrl}/${id_usr}`);
    }

    buscarUsuarios(termino: string): Observable<Usuario[]> {
      return this.getAllUsuarios().pipe(
        map(usuarios => usuarios.filter(usuario =>
          usuario.nom_usr.toLowerCase().includes(termino.toLowerCase()) ||
          usuario.app_usr.toLowerCase().includes(termino.toLowerCase())
        ))
      );
    }

    getMisPaquetes(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrlPaqueteUusario}/mispaquetes`);
    }
}
