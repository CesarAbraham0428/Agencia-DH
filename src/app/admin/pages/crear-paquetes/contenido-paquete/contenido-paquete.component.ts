import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';

@Component({
  selector: 'app-contenido-paquete',
  templateUrl: './contenido-paquete.component.html',
  styleUrls: ['./contenido-paquete.component.scss']
})
export class ContenidoPaqueteComponent implements OnInit {
  servicios: any[] = [];

  constructor(private packageDataService: PackageDataService) {}

  ngOnInit() {
    this.packageDataService.servicios$.subscribe(servicios => {
      console.log('Received updated servicios:', servicios);
      this.servicios = servicios;
    });
  }

  clearItems() {
    this.packageDataService.clearItems();
  }

  removeItem(item: any) {
    console.log('Removing item:', item);
    this.packageDataService.removeItem(item);
  }

  getNombre(item: any): string {
    return item.nom_hs || item.nom_trans || item.nom_guia || item.nom_actur || 'Sin nombre';
  }

  getDescripcion(item: any): string {
    return item.descripcion_hs || item.descripcion_actur || '';
  }

  getCosto(item: any): string {
    return item.costo_hs || item.costo_guia || item.tarifa_trans || item.costo_actur || 'No especificado';
  }

  getTelefono(item: any): string {
    return item.telefono_guia || item.tel_trans || '';
  }

  getEmail(item: any): string {
    return item.email_trans || item.email_guia || '';
  }
}