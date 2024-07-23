import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';

@Component({
  selector: 'app-contenido-paquete',
  templateUrl: './contenido-paquete.component.html',
  styleUrls: ['./contenido-paquete.component.scss']
})
export class ContenidoPaqueteComponent implements OnInit {
  servicios: any[] = [];
  experiencias: any[] = [];

  constructor(private packageDataService: PackageDataService) {}

  ngOnInit() {
    this.packageDataService.servicios$.subscribe(servicios => {
      this.servicios = servicios;
    });

  }

  clearItems() {
    this.packageDataService.clearItems();
  }

  removeItem(type: 'servicio' , item: any) {
    this.packageDataService.removeItem(type, item);
  }
}
