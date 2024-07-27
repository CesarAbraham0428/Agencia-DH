import { environment } from './../../environments/environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = `${environment.baseUrl}/gestor/admin`;
  private agenciasUrl = `${environment.baseUrl}/gestor/agencias`; // Añade esta línea

  constructor(private http: HttpClient) {}

  // Obtener todos los administradores
  getAllAdmins(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}s`);
  }

  // Obtener todas las agencias
  getAllAgencias(): Observable<any> {
    return this.http.get<any>(`${this.agenciasUrl}`);
  }

  // Crear un nuevo administrador
  createAdmin(admin: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, admin);
  }

  // Actualizar un administrador
  updateAdmin(admin: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}`, admin);
  }

  // Eliminar un administrador
  deleteAdmin(id_usr: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id_usr}`);
  }
}
