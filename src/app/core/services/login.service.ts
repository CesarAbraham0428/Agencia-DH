import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environments';
import { tap } from 'rxjs/operators';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl: string = environment.baseUrl;
  private agenciasUrl = `${environment.baseUrl}/usuario/agencias`;
  private hotelesUrl = `${environment.baseUrl}/usuario/hoteles`;
  private restaurantesURL = `${environment.baseUrl}/usuario/restaurantes`;
  private experienciasURL = `${environment.baseUrl}/usuario/experiencias`;


  constructor(private http: HttpClient) {}

  loginUsuario(email_usr: string, passwd_usr: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuario/login`, { email_usr, passwd_usr })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
            const decodedToken: any = jwtDecode(response.token);
            localStorage.setItem('userRole', decodedToken.role); // Guarda el rol decodificado
          }
        })
      );

  }

  isLogged(): boolean {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('authToken');
      return token ? true : false;
    }
    return false;
  }

  isUser(): boolean {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('userRole') == 'usuario') {
      const token = localStorage.getItem('authToken');
      return token ? true : false;
    }
    return false;
  }

  isAdmin(): boolean {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('userRole') == 'admin') {
      const token = localStorage.getItem('authToken');
      return token ? true : false;
    }
    return false;
  }

  isGestor(): boolean {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('userRole') == 'gestor') {
      const token = localStorage.getItem('authToken');
      return token ? true : false;
    }
    return false;
  }

  getAllAgencias(): Observable<any> {
    return this.http.get<any>(`${this.agenciasUrl}`);
  }

  getAllHoteles(): Observable<any>{
    return this.http.get<any>(`${this.hotelesUrl}`);
  }

  getAllRestaurantes(): Observable<any>{
    return this.http.get<any>(`${this.restaurantesURL}`);
  }

  getAllExperiencias(): Observable<any>{
    return this.http.get<any>(`${this.experienciasURL}`);
  }
}
