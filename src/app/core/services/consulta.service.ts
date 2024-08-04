import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  constructor(
    private http: HttpClient
  ) {}

  private consulta = `${environment.baseUrl}/usuario/consulta`;
  private consultaAD = `${environment.baseUrl}/admin/consultas`;

  enviarConsulta(consultaEnvio: any): Observable<any>{
    return this.http.post(`${this.consulta}`, consultaEnvio)
  }

  recibirConsulta(): Observable<any>{
    return this.http.get(`${this.consultaAD}`)
  }
}
