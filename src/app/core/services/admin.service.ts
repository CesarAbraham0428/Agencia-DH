// import { environment } from './../../environments/environments';
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// //ya no se usa
// @Injectable({
//   providedIn: 'root'
// })
// export class AdminService {
//   private baseUrl: string = environment.baseUrl;

//   constructor(private http: HttpClient) {}

//   private getAuthToken(): string | null {
//     if (typeof localStorage !== 'undefined') {
//       return localStorage.getItem('authToken');
//     }
//     return null;
//   }

//   confirmAdmin(): Observable<any> {
//     const authToken = this.getAuthToken();
//     const headers = authToken ? new HttpHeaders({ 'Authorization': `Bearer ${authToken}` }) : new HttpHeaders();
//     //se quito 'Authorization': `Bearer ${authToken}`
//     return this.http.get(`${this.baseUrl}/admin/confirm`, { headers });
//   }
// }
