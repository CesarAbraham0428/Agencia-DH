import { Usuario } from './../interfaces/usuario.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../../app/environments/environments'; //posible fallo por una s


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuario/registro`, usuario);
  }
}
