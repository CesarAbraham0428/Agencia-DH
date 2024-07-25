// PaquetesComponent
import { Component, OnInit } from '@angular/core';
import { ServicioGenericoCRUD } from '../../../core/services/CRUDS/crud-servicio.service';
import { Paquete } from '../../../interfaces/CRUDS/tablas.interface';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss']
})
export class PaquetesComponent implements OnInit {

  paquetes: any[] = [];

  constructor(private genericService: ServicioGenericoCRUD) {}

  ngOnInit(): void {
    this.cargarPaquetes();
  }

  cargarPaquetes() {
    this.genericService.getAll<Paquete>('Paquete').subscribe(
      data => {
        this.paquetes = data;
        this.paquetes.forEach(paquete => {
          this.genericService.getPaqueteCompleto(paquete.id_paquete).subscribe(
            paqueteCompleto => {
              paquete.servicios = paqueteCompleto.servicios;
              paquete.actividades = paqueteCompleto.actividades;
            },
            error => {
              console.error('Error al obtener paquete completo:', error);
            }
          );
        });
      },
      error => {
        console.error('Error al obtener Paquetes:', error);
        if (error.error && error.error.error) {
          console.error('Mensaje de error del servidor:', error.error.error);
        }
      }
    );
  }
}
