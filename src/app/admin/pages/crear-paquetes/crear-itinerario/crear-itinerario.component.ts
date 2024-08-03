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
  packageCost: number | null = null;
  id_agencia: number = 1; 
  id_guia: number = 1; 
  id_hotesteleria: number = 1; 
  id_trans: number = 1; 
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

  onCostFocus() {
    if (this.packageCost === 0) {
      this.packageCost = null;
    }
  }

  canCreatePackage(): boolean {
    return this.areFieldsFilled() && this.areAllActivitiesComplete();
  }

  areFieldsFilled(): boolean {
    return !!(this.startDate && 
              this.numberOfDays > 0 && 
              this.packageName && 
              this.packageCost !== null && 
              this.packageCost > 0);
  }

  hasAtLeastOneActivity(): boolean {
    return this.days.some(day => day.activities.length > 0);
  }

  areAllActivitiesComplete(): boolean {
    if (this.days.length === 0) return false;
    
    for (let day of this.days) {
      if (day.activities.length === 0) return false;
      
      for (let activity of day.activities) {
        if (!this.isActivityComplete(activity)) {
          return false;
        }
      }
    }
    
    return true;
  }

  isActivityComplete(activity: Activity): boolean {
    return !!(activity.time &&
              activity.description &&
              activity.servicioAsociado &&
              this.getServiceId(activity.servicioAsociado) !== -1);
  }

  createPackage() {
    if (this.canCreatePackage()) {
      const packageData = {
        nom_paquete: this.packageName,
        tipo_paquete: this.packageType,
        costo_paquete: this.packageCost,
        id_agencia: this.id_agencia,
        actividades: this.days.flatMap(day => day.activities.map(act => ({
          fecha_actividad: act.date,
          hora_actividad: act.time,
          descripcion_actividad: act.description,
          id_servicio: this.getServiceId(act.servicioAsociado),
          tipo_servicio: act.servicioAsociado ? act.servicioAsociado.tipo : null
        }))).filter(act => act.id_servicio !== null),
        servicios: this.selectedPackage.servicios
          .map((s: { tipo: any; }) => ({
            id_servicio: this.getServiceId(s),
            tipo_servicio: s.tipo
          }))
          .filter((s: { id_servicio: null; }) => s.id_servicio !== null)
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
      let errorMessage = 'Por favor, complete todos los campos del paquete y asegúrese de que todas las actividades estén completas.';
      this.snackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
    }
  }

  getServiceId(servicio: any): number {
    if (!servicio) return -1;
    switch(servicio.tipo) {
      case 'Hosteleria':
        return servicio.id_hosteleria || -1;
      case 'Transportista':
        return servicio.id_transportista || -1;
      case 'Guia':
        return servicio.id_guia || -1;
      default:
        return servicio.id || -1;
    }
  }
  
  getServiceType(servicio: any): string {
    if (!servicio) return 'Otro'; // Cambiamos 'desconocido' por 'Otro'
    if (servicio.id_hosteleria) return 'Hotel';
    if (servicio.id_transportista) return 'Transportista';
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
    this.id_agencia = 1; 
    this.id_guia = 1; 
    this.id_hotesteleria = 1; 
    this.id_trans = 1; 
    this.selectedPackage = null;
    this.packageDataService.clearItems(); // Limpiar los servicios seleccionados
  }
}
