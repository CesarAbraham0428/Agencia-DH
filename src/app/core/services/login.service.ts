import { Usuario } from '../../interfaces/usuario.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environments';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  loginUsuario(email_usr: string, passwd_usr: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuario/login`, { email_usr, passwd_usr })
      .pipe(
        tap(response => {
          if (response.token) {
            localStorage.setItem('authToken', response.token);
          }
        })
      );

    }
  }
