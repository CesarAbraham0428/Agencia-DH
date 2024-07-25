
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
}

