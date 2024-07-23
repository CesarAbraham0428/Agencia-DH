import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageDataService {
  private serviciosSubject = new BehaviorSubject<any[]>([]);
  private experienciasSubject = new BehaviorSubject<any[]>([]);

  servicios$ = this.serviciosSubject.asObservable();
  experiencias$ = this.experienciasSubject.asObservable();

  private servicios: any[] = [];
  private experiencias: any[] = [];

  addItem(type: 'servicio' | 'experiencia', item: any) {
    if (type === 'servicio') {
      this.servicios.push(item);
      this.serviciosSubject.next(this.servicios);
    } else if (type === 'experiencia') {
      this.experiencias.push(item);
      this.experienciasSubject.next(this.experiencias);
    }
  }

  removeItem(type: 'servicio' | 'experiencia', item: any) {
    if (type === 'servicio') {
      this.servicios = this.servicios.filter(i => i !== item);
      this.serviciosSubject.next(this.servicios);
    } else if (type === 'experiencia') {
      this.experiencias = this.experiencias.filter(i => i !== item);
      this.experienciasSubject.next(this.experiencias);
    }
  }

  clearItems() {
    this.servicios = [];
    this.experiencias = [];
    this.serviciosSubject.next(this.servicios);
    this.experienciasSubject.next(this.experiencias);
  }
}
