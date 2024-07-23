import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackageDataService {
  private serviciosSubject = new BehaviorSubject<any[]>([]);

  servicios$ = this.serviciosSubject.asObservable();

  private servicios: any[] = [];

  addItem(type: 'servicio', item: any) {
    this.servicios.push(item);
    this.serviciosSubject.next(this.servicios);
  }

  removeItem(type: 'servicio', item: any) {
    this.servicios = this.servicios.filter((i) => i !== item);
    this.serviciosSubject.next(this.servicios);
  }

  clearItems() {
    this.servicios = [];
    this.serviciosSubject.next(this.servicios);
  }
}
