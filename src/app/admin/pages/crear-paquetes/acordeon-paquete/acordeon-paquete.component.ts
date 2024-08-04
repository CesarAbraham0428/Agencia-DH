import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';
import { HosteleriaService } from '../../../../core/services/hosteleria.service';
import { TransportistaService } from '../../../../core/services/transportista.service';
import { GuiaService } from '../../../../core/services/guia.service';
import { AtractivosService } from '../../../../core/services/atractivos.service';

@Component({
  selector: 'app-acordeon-paquete',
  templateUrl: './acordeon-paquete.component.html',
  styleUrls: ['./acordeon-paquete.component.scss']
})
export class AcordeonPaqueteComponent implements OnInit {
  
  hostelerias: any[] = [];
  hoteles: any[] = [];
  restaurantes: any[] = [];
  transportistas: any[] = [];
  guias: any[] = [];
  museos: any[] = [];
  vinedos: any[] = [];
  lugaresTuristicos: any[] = [];

  constructor(
    private packageDataService: PackageDataService,
    private hosteleriaService: HosteleriaService,
    private transportistaService: TransportistaService,
    private guiaService: GuiaService,
    private atractivosService: AtractivosService
  ) {}

  ngOnInit() {
    this.cargarHosteleria();
    this.cargarTransportistas();
    this.cargarGuias();
    this.cargarAtractivos();
  }

  cargarHosteleria() {
    this.hosteleriaService.getAllHostelerias().subscribe(
      (data) => {
        this.hoteles = data.filter((h: { tipo_hs: string; }) => h.tipo_hs === 'Hotel');
        this.restaurantes = data.filter((h: { tipo_hs: string; }) => h.tipo_hs === 'Restaurante');
        console.log('Hoteles cargados:', this.hoteles);
        console.log('Restaurantes cargados:', this.restaurantes);
      },
      (error) => {
        console.error('Error al cargar hostelería:', error);
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

  cargarAtractivos() {
    this.atractivosService.getAllAtractivos().subscribe(
      (data) => {
        this.lugaresTuristicos = data;
        this.museos = this.lugaresTuristicos.filter((a: { tipo_actur: string; }) => a.tipo_actur === 'Museo');
        this.vinedos = this.lugaresTuristicos.filter((a: { tipo_actur: string; }) => a.tipo_actur === 'Viñedo');
        this.lugaresTuristicos = this.lugaresTuristicos.filter((a: { tipo_actur: string; }) => a.tipo_actur === 'Atractivo');
        console.log('Atractivos cargados:', this.lugaresTuristicos);
      },
      (error) => {
        console.error('Error al cargar atractivos:', error);
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
