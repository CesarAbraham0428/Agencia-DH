import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';
import { ServicioGenericoCRUD } from '../../../../core/services/CRUDS/crud-servicio.service';
import { Hotel, Restaurante } from '../../../../interfaces/CRUDS/tablas.interface';

@Component({
  selector: 'app-acordeon-paquete',
  templateUrl: './acordeon-paquete.component.html',
  styleUrls: ['./acordeon-paquete.component.scss']
})
export class AcordeonPaqueteComponent implements OnInit {
  Hotel: Hotel[] = [];
  Restaurante: Restaurante[] = [];

  hoteles: any;
  restaurantes: any;

  constructor(
    private packageDataService: PackageDataService,
    private genericService: ServicioGenericoCRUD
  ) {}

  ngOnInit() {
    this.cargarHoteles();
    this.cargarRestaurantes();
  }

  cargarHoteles() {
    this.genericService.getAll<Hotel>('Hotel').subscribe(
      data => {
        this.hoteles = data;
      },
      error => {
        console.error('Error al obtener Hoteles:', error);
        if (error.error && error.error.error) {
          console.error('Mensaje de error del servidor:', error.error.error);
        }
      }
    );
  }

  cargarRestaurantes() {
    this.genericService.getAll<Restaurante>('Restaurante').subscribe(
      data => {
        this.restaurantes = data;
      },
      error => {
        console.error('Error al obtener Restaurantes:', error);
      }
    );
  }
  
  selectItem(item: any, tipo: string) {
    const servicioConTipo = { ...item, tipo };
    this.packageDataService.addItem(servicioConTipo);
    console.log('Servicio seleccionado:', servicioConTipo);
  }
  
  deselectItem(item: any) {
    this.packageDataService.removeItem(item);
  }
}
