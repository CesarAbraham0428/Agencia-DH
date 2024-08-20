import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../core/services/usuarios.service';

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
  paquetes: any[] = [];
  cargando: boolean = true;
  error: string | null = null;

  constructor(private paqueteService: UsuariosService) { }

  ngOnInit(): void {
    this.cargarPaquetes();
  }

  cargarPaquetes(): void {
    this.cargando = true;
    this.paqueteService.getMisPaquetes().subscribe(
      (data) => {
        this.paquetes = data;
        this.cargando = false;
      },
      (error) => {
        console.error('Error al cargar los paquetes', error);
        this.error = 'Hubo un problema al cargar tus paquetes. Por favor, intenta de nuevo más tarde.';
        this.cargando = false;
      }
    );
  }

  // Método para verificar si un paquete tiene actividades
  paqueteTieneActividades(paquete: Paquete): boolean {
    return paquete.servicios?.some(servicio => 
      servicio.actividades && servicio.actividades.length > 0
    ) ?? false;
  }
}