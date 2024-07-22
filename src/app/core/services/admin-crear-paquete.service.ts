/* import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageDataService {
  private selectedItemsSource = new BehaviorSubject<any[]>([]);
  selectedItems$ = this.selectedItemsSource.asObservable();

  constructor() { }

  addItem(item: any) {
    const currentItems = this.selectedItemsSource.value;
    this.selectedItemsSource.next([...currentItems, item]);
  }

  removeItem(item: any) {
    const currentItems = this.selectedItemsSource.value;
    this.selectedItemsSource.next(currentItems.filter(i => i !== item));
  }

  clearItems() {
    this.selectedItemsSource.next([]);
  }
}

 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageDataService {
  private serviciosSource = new BehaviorSubject<any[]>([]);
  private experienciasSource = new BehaviorSubject<any[]>([]);

  servicios$ = this.serviciosSource.asObservable();
  experiencias$ = this.experienciasSource.asObservable();

  addItem(type: 'servicio' | 'experiencia', item: any) {
    if (type === 'servicio') {
      this.serviciosSource.next([...this.serviciosSource.getValue(), item]);
    } else {
      this.experienciasSource.next([...this.experienciasSource.getValue(), item]);
    }
  }

  removeItem(type: 'servicio' | 'experiencia', item: any) {
    if (type === 'servicio') {
      this.serviciosSource.next(this.serviciosSource.getValue().filter(i => i !== item));
    } else {
      this.experienciasSource.next(this.experienciasSource.getValue().filter(i => i !== item));
    }
  }

  clearItems() {
    this.serviciosSource.next([]);
    this.experienciasSource.next([]);
  }
}
