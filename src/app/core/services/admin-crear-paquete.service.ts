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
    const itemId = this.getItemId(item);
    const itemTipo = item.tipo;
    if (!this.servicios.some(servicio => this.getServicioId(servicio) === itemId && servicio.tipo === itemTipo)) {
      this.servicios.push(item);
      this.serviciosSubject.next(this.servicios);
      console.log('Servicio añadido:', item);
      console.log('Servicios actuales:', this.servicios);
    }
  }

  removeItem(item: any) {
    const itemId = this.getItemId(item);
    const initialLength = this.servicios.length;
    this.servicios = this.servicios.filter(servicio => !(this.getServicioId(servicio) === itemId && this.getServicioTipo(servicio) === this.getServicioTipo(item)));
    console.log(`Removed ${initialLength - this.servicios.length} items`);
    this.serviciosSubject.next(this.servicios);
  }

  private getServicioId(servicio: any): number {
    if ('id_hosteleria' in servicio) return servicio.id_hosteleria;
    if ('id_trans' in servicio) return servicio.id_trans;
    if ('id_guia' in servicio) return servicio.id_guia;
    if ('id_atracTuris' in servicio) return servicio.id_atracTuris;
    return servicio.id;
  }

  private getServicioTipo(servicio: any): string {
    if ('id_hosteleria' in servicio) return 'hosteleria';
    if ('id_trans' in servicio) return 'transportista';
    if ('id_guia' in servicio) return 'guia';
    if ('id_atracTuris' in servicio) return 'atracTuristico';
    return 'generic';
  }

  private getItemId(item: any): number {
    if ('id_hosteleria' in item) return item.id_hosteleria;
    if ('id_trans' in item) return item.id_trans;
    if ('id_guia' in item) return item.id_guia;
    if ('id_atracTuris' in item) return item.id_atracTuris;
    return item.id;
  }

}