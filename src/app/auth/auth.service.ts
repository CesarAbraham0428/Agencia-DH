import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());

  constructor() {}

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login() {
    // Simulación de un inicio de sesión exitoso
    localStorage.setItem('authToken', 'example-token');
    this.isAuthenticatedSubject.next(true);
    return of(true);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
  }
}
