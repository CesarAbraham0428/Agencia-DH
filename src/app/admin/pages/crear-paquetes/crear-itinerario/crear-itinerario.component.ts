import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';
import { ServicioGenericoCRUD } from '../../../../core/services/CRUDS/crud-servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Activity {
  date: string;
  time: string;
  description: string;
  servicioAsociado: any; // Este será el servicio completo seleccionado
  tipo: string; // Añadido a la interfaz
}

interface Day {
  date: string;
  activities: Activity[];
}

@Component({
  selector: 'app-crear-itinerario',
  templateUrl: './crear-itinerario.component.html',
  styleUrls: ['./crear-itinerario.component.scss']
})
export class CrearItinerarioComponent implements OnInit {
  startDate: string = '';
  numberOfDays: number = 0;
  days: Day[] = [];
  packageName: string = '';
  packageType: string = 'Personalizado';
  packageCost: number = 0;
  id_usr: number = 1; 
  id_agencia: number = 1; 
  id_guia: number = 1; 
  id_hotel: number = 1; 
  id_restaurante: number = 1; 
  selectedPackage: any;

  constructor(
    private servicioGenericoCRUD: ServicioGenericoCRUD,
    private packageDataService: PackageDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.packageDataService.servicios$.subscribe(servicios => {
      console.log('Servicios actualizados en CrearItinerarioComponent:', servicios);
      this.selectedPackage = { ...this.selectedPackage, servicios };
    });
  }

  generateDays() {
    this.days = [];
    let start = new Date(this.startDate);
    for (let i = 0; i < this.numberOfDays; i++) {
      let currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      this.days.push({
        date: currentDate.toISOString().split('T')[0],
        activities: []
      });
    }
  }

  addActivity(dayIndex: number) {
    const newActivity: Activity = {
      time: '',
      description: '',
      date: this.days[dayIndex].date,
      servicioAsociado: '',
      tipo: '' // Inicializado con cadena vacía
    };
    this.days[dayIndex].activities.push(newActivity);
  }

  removeActivity(dayIndex: number, activityIndex: number) {
    this.days[dayIndex].activities.splice(activityIndex, 1);
  }

  areFieldsFilled(): boolean {
    if (!this.startDate || this.numberOfDays <= 0 || !this.packageName || this.packageCost <= 0) {
      return false;
    }
    for (let day of this.days) {
      for (let activity of day.activities) {
        if (!activity.time || !activity.description || !activity.date || !activity.servicioAsociado) {
          return false;
        }
      }
    }
    return true;
  }

  createPackage() {
    if (this.areFieldsFilled()) {
      const packageData = {
        nom_paquete: this.packageName,
        tipo_paquete: this.packageType,
        costo_paquete: this.packageCost,
        id_usr: this.id_usr,
        id_agencia: this.id_agencia,
        actividades: this.days.flatMap(day => day.activities.map(act => ({
          fecha_actividad: act.date,
          hora_actividad: act.time,
          descripcion_actividad: act.description,
          id_servicio: this.getServiceId(act.servicioAsociado),
          tipo_servicio: act.servicioAsociado ? act.servicioAsociado.tipo : 'Otro'
        }))),
        servicios: this.selectedPackage.servicios.map((s: { tipo: any; }) => ({
          id_servicio: this.getServiceId(s),
          tipo_servicio: s.tipo
        }))
      };
  
      console.log('Datos del paquete a enviar:', packageData);
      
      this.servicioGenericoCRUD.create(packageData).subscribe(
        response => {
          console.log('Paquete creado exitosamente:', response);
          this.snackBar.open('Paquete creado', 'Cerrar', { duration: 3000 });
          this.resetForm();
        },
        error => {
          console.error('Error al crear el paquete:', error);
          if (error.error && error.error.error) {
            console.error('Mensaje de error del servidor:', error.error.error);
          }
          this.snackBar.open('Error al crear el paquete: ' + (error.error?.error || error.message), 'Cerrar', { duration: 5000 });
        }
      );
    } else {
      console.log('Campos no llenos o incompletos');
      this.snackBar.open('Por favor, complete todos los campos', 'Cerrar', { duration: 3000 });
    }
  }

  getServiceId(servicio: any): number {
    if (!servicio) return -1; // Devolver un valor distinto de null
    switch(servicio.tipo) {
      case 'Hotel':
        return servicio.id_hotel;
      case 'Restaurante':
        return servicio.id_restaurante;
      // Añade más casos según sea necesario
      default:
        return servicio.id || -1; // Devolver un valor distinto de null
    }
  }
  
  getServiceType(servicio: any): string {
    if (!servicio) return 'Otro'; // Cambiamos 'desconocido' por 'Otro'
    if (servicio.id_hotel) return 'Hotel';
    if (servicio.id_restaurante) return 'Restaurante';
    if (servicio.id_guia) return 'Guia';
    return 'Otro';
  }
  
  getDuration() {
    if (!this.startDate || this.days.length === 0) return 0;
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.days[this.days.length - 1].date);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include the start date
    return diffDays;
  }

  resetForm() {
    this.startDate = '';
    this.numberOfDays = 0;
    this.days = [];
    this.packageName = '';
    this.packageType = 'Personalizado';
    this.packageCost = 0;
    this.id_usr = 1; 
    this.id_agencia = 1; 
    this.id_guia = 1; 
    this.id_hotel = 1; 
    this.id_restaurante = 1; 
    this.selectedPackage = null;
    this.packageDataService.clearItems(); // Limpiar los servicios seleccionados
  }
}
