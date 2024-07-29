import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';
import { ServicioGenericoCRUD } from '../../../../core/services/CRUDS/crud-servicio.service';
import { Hosteleleria, Transportista, Guia } from '../../../../interfaces/CRUDS/tablas.interface';

import { HosteleriaService } from '../../../../core/services/hosteleria.service';
import { TransportistaService } from '../../../../core/services/transportista.service';
import { GuiaService } from '../../../../core/services/guia.service';


@Component({
  selector: 'app-acordeon-paquete',
  templateUrl: './acordeon-paquete.component.html',
  styleUrls: ['./acordeon-paquete.component.scss']
})
export class AcordeonPaqueteComponent implements OnInit {
  
  hostelerias: any[] = [];
  transportistas: any[] = [];
  guias: any[] = [];

  constructor(
    private packageDataService: PackageDataService,
    private hosteleriaService: HosteleriaService,
    private transportistaService: TransportistaService,
    private guiaService: GuiaService
  ) {}

  ngOnInit() {
    this.cargarHostelerias();
    this.cargarTransportistas();
    this.cargarGuias();
  }

  cargarHostelerias() {
    this.hosteleriaService.getAllHostelerias().subscribe(
      (data) => {
        this.hostelerias = data;
        console.log('Hostelerias cargadas:', this.hostelerias);
      },
      (error) => {
        console.error('Error al cargar hostelerias:', error);
      }
    );
  }

  cargarTransportistas() {
    this.transportistaService.getAllTransportistas().subscribe(
      (data) => {
        this.transportistas = data;
        console.log('Transportistas cargados:', this.transportistas);
      },
      (error) => {
        console.error('Error al cargar transportistas:', error);
      }
    );
  }
  cargarGuias() {
    this.guiaService.getAllGuias().subscribe(
      (data) => {
        this.guias = data;
        console.log('Guías cargados:', this.guias);
      },
      (error) => {
        console.error('Error al cargar guías:', error);
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
