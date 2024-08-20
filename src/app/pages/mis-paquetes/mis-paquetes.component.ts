import { Component, OnInit } from '@angular/core';
import { ServicioGenericoCRUD } from '../../core/services/CRUDS/crud-servicio.service';

interface Actividad {
  id_actividad: number;
  fecha_actividad: string;
  hora_actividad: string;
  descripcion_actividad: string;
}

interface Servicio {
  id_servicio: number;
  tipo_servicio: string;
  actividades?: Actividad[]; // Hacemos que actividades sea opcional
}

interface Paquete {
  id_paquete: number;
  nom_paquete: string;
  tipo_paquete: string;
  costo_paquete: number;
  servicios?: Servicio[]; // Hacemos que servicios sea opcional
}

@Component({
  selector: 'app-mis-paquetes',
  templateUrl: './mis-paquetes.component.html',
  styleUrls: ['./mis-paquetes.component.scss']
})
export class MisPaquetesComponent implements OnInit {
  paquetes: Paquete[] = [];
  paquetesFiltrados: Paquete[] = [];
  filtroTipo: string = '';

  constructor(private paqueteService: ServicioGenericoCRUD) { }

  ngOnInit(): void {
    this.cargarPaquetes();
  }

  cargarPaquetes(): void {
    this.paqueteService.getMisPaquetes().subscribe(
      (data: Paquete[]) => {
        this.paquetes = data;
        this.aplicarFiltros();
      },
      (error) => {
        console.error('Error al cargar los paquetes', error);
      }
    );
  }

  aplicarFiltros(): void {
    this.paquetesFiltrados = this.paquetes.filter(paquete => 
      this.filtroTipo ? paquete.tipo_paquete === this.filtroTipo : true
    );
  }

  filtrarPorTipo(tipo: string): void {
    this.filtroTipo = tipo;
    this.aplicarFiltros();
  }

  limpiarFiltros(): void {
    this.filtroTipo = '';
    this.aplicarFiltros();
  }

  // Nuevo método para verificar si un paquete tiene actividades
  paqueteTieneActividades(paquete: Paquete): boolean {
    return paquete.servicios?.some(servicio => 
      servicio.actividades && servicio.actividades.length > 0
    ) ?? false;
  }
}