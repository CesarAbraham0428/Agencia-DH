import { environment } from '../../../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../usuarios.service';

interface AsignacionPaquete {
  id_paquete: number;
  id_usuario: number;
}

interface AsignacionResponse {
  message: string;
  id_usuario: number;
  id_paquete: number;
}

@Injectable({
  providedIn: 'root'
})

export class ServicioGenericoCRUD {
  private apiUrl = `${environment.baseUrl}/admin/paquete`;

  private agenciaUrl = `${environment.baseUrl}/admin`; // Nueva URL base para rutas de agencia

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

  asignarUsuarioPaquete(asignacion: { id_paquete: number, id_usr: number }): Observable<any> {
    console.log('Enviando asignación al servidor:', asignacion); // Añade este log
    return this.http.post<any>(`${this.apiUrl}/asignar-usuario`, asignacion);
  }

  desasignarUsuarioPaquete(idPaquete: number, idUsuario: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/desasignar-paquete/${idPaquete}/${idUsuario}`);
  }

  getUsuariosAsignados(idPaquete: number): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/${idPaquete}/usuarios-asignados`);
  }

    // Método para obtener paquetes completos por agencia
    getPaquetesCompletosByAgencia(): Observable<any> {
      return this.http.get<any>(`${this.agenciaUrl}/agencia/paquetes-completos`);
    }

}