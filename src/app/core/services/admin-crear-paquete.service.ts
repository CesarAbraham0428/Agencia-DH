/* import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageDataService {
  private servicios: any[] = [];
  private serviciosSubject = new BehaviorSubject<any[]>(this.servicios);
  servicios$ = this.serviciosSubject.asObservable();

  private selectedPackageSubject = new BehaviorSubject<any>(null);
  selectedPackage$ = this.selectedPackageSubject.asObservable();

  setServicios(servicios: any[]) {
    this.servicios = servicios;
    this.serviciosSubject.next(servicios);
  }

  setSelectedPackage(selectedPackage: any) {
    this.selectedPackageSubject.next(selectedPackage);
  }

  clearItems() {
    this.servicios = [];
    this.serviciosSubject.next(this.servicios);
    this.selectedPackageSubject.next(null);
  }

  addItem(item: any) {
    if (!this.servicios.includes(item)) {
      this.servicios.push(item);
      this.serviciosSubject.next(this.servicios);
    }
  }

  removeItem(item: any) {
    console.log('Service removing item:', item);
    const initialLength = this.servicios.length;
    this.servicios = this.servicios.filter(servicio => {
      // Determinamos qué tipo de servicio es y usamos el ID correspondiente
      let servicioId, itemId;
  
      if ('id_hotel' in servicio) {
        servicioId = servicio.id_hotel;
        itemId = item.id_hotel;
      } else if ('id_restaurante' in servicio) {
        servicioId = servicio.id_restaurante;
        itemId = item.id_restaurante;
      } else if ('id_transporte' in servicio) {
        servicioId = servicio.id_transporte;
        itemId = item.id_transporte;
      } else if ('id_guia' in servicio) {
        servicioId = servicio.id_guia;
        itemId = item.id_guia;
      } else {
        // Si no coincide con ninguno de los tipos anteriores, usamos un ID genérico
        servicioId = servicio.id;
        itemId = item.id;
      }
  
      const keep = servicioId !== itemId;
      console.log(`Comparing ${servicioId} with ${itemId}: ${keep ? 'keeping' : 'removing'}`);
      return keep;
    });
    console.log(`Removed ${initialLength - this.servicios.length} items`);
    this.serviciosSubject.next(this.servicios);
  }
} */


  import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageDataService {
  private servicios: any[] = [];
  private serviciosSubject = new BehaviorSubject<any[]>(this.servicios);
  servicios$ = this.serviciosSubject.asObservable();

  private selectedPackageSubject = new BehaviorSubject<any>(null);
  selectedPackage$ = this.selectedPackageSubject.asObservable();

  setServicios(servicios: any[]) {
    this.servicios = servicios;
    this.serviciosSubject.next(servicios);
  }

  setSelectedPackage(selectedPackage: any) {
    this.selectedPackageSubject.next(selectedPackage);
  }

  clearItems() {
    this.servicios = [];
    this.serviciosSubject.next(this.servicios);
    this.selectedPackageSubject.next(null);
  }

  addItem(item: any) {
    if (!this.servicios.some(servicio => this.getServicioId(servicio) === this.getItemId(item))) {
      this.servicios.push(item);
      this.serviciosSubject.next(this.servicios);
    }
  }

  removeItem(item: any) {
    const initialLength = this.servicios.length;
    this.servicios = this.servicios.filter(servicio => this.getServicioId(servicio) !== this.getItemId(item));
    console.log(`Removed ${initialLength - this.servicios.length} items`);
    this.serviciosSubject.next(this.servicios);
  }

  private getServicioId(servicio: any): number {
    return servicio.id_hotel || servicio.id_restaurante || servicio.id_transporte || servicio.id_guia || servicio.id;
  }

  private getItemId(item: any): number {
    return item.id_hotel || item.id_restaurante || item.id_transporte || item.id_guia || item.id;
  }
}
