import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';
import { ServicioGenericoCRUD } from '../../../../core/services/CRUDS/crud-servicio.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Activity {
  date: string;
  time: string;
  description: string;
  servicioAsociado: any;
  tipo: string;
  subtipo?: string; // Para diferenciar entre Hotel/Restaurante o Museo/Viñedo/Atractivo
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
  numberOfDays: number | null = null;
  packageCost: number | null = null;
  numberOfDaysError: string = '';
  packageCostError: string = '';

  days: Day[] = [];
  packageName: string = '';
  packageType: string = 'Personalizado';

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

  onNumberOfDaysChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
    
    if (value === '') {
      this.numberOfDays = null;
      this.numberOfDaysError = '';
    } else {
      let numValue = parseInt(value, 10);
      if (isNaN(numValue) || numValue < 1) {
        this.numberOfDaysError = 'El número de días debe ser 1 o mayor';
        this.numberOfDays = null;
      } else {
        this.numberOfDays = numValue;
        this.numberOfDaysError = '';
      }
    }
  }

  onPackageCostChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;
    
    if (value === '') {
      this.packageCost = null;
      this.packageCostError = '';
    } else {
      let numValue = parseFloat(value);
      if (isNaN(numValue) || numValue < 0) {
        this.packageCostError = 'El costo debe ser 0 o mayor';
        this.packageCost = null;
      } else {
        this.packageCost = numValue;
        this.packageCostError = '';
      }
    }
  }

  generateDays() {
    this.days = [];
    if (this.startDate && this.numberOfDays !== null && this.numberOfDays > 0) {
      let start = new Date(this.startDate);
      for (let i = 0; i < this.numberOfDays; i++) {
        let currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        this.days.push({
          date: currentDate.toISOString().split('T')[0],
          activities: []
        });
      }
    } else {
      // Mostrar un mensaje de error o manejar el caso cuando los datos no son válidos
      console.error('Fecha de inicio o número de días no válidos');
      // Opcionalmente, puedes mostrar un mensaje al usuario
      // this.snackBar.open('Por favor, ingrese una fecha de inicio y un número de días válido', 'Cerrar', { duration: 3000 });
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
              this.numberOfDays !== null && this.numberOfDays >= 1 && 
              this.packageName && 
              this.packageCost !== null && this.packageCost >= 0);
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
        actividades: this.days.flatMap(day => day.activities.map(act => ({
          fecha_actividad: act.date,
          hora_actividad: act.time,
          descripcion_actividad: act.description,
          id_servicio: this.getServiceId(act.servicioAsociado),
          tipo_servicio: this.getServiceType(act.servicioAsociado),
          subtipo_servicio: act.servicioAsociado ? 
            (act.servicioAsociado.tipo_hs || act.servicioAsociado.tipo_actur) : null
        }))).filter(act => act.id_servicio !== null),
        servicios: this.selectedPackage.servicios
        .map((s: any) => ({
          id_servicio: this.getServiceId(s),
          tipo_servicio: this.getServiceType(s),
          subtipo_servicio: s.tipo_hs || s.tipo_actur
        }))
        .filter((s: { id_servicio: number; tipo_servicio: string }) => 
          s.id_servicio !== -1 && s.tipo_servicio !== 'Otro'
        )
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

  getServiceTypeDisplay(servicio: any): string {
    if (servicio.tipo === 'Hosteleria') {
      return servicio.tipo_hs === 'Hotel' ? 'Hotel' : 'Restaurante';
    }
    if (servicio.tipo === 'AtracTuristico') {
      return servicio.tipo_actur || 'Atractivo Turístico';
    }
    return servicio.tipo || 'Otro';
  }

  getServiceId(servicio: any): number | null {
    if (!servicio) return null;
    switch(servicio.tipo) {
      case 'Hosteleria':
        return servicio.id_hosteleria || null;
      case 'Transportista':
        return servicio.id_trans || null;
      case 'Guia':
        return servicio.id_guia || null;
      case 'AtracTuristico':
        return servicio.id_atracTuris || null;
      default:
        return servicio.id || null;
    }
  } 
  
  getServiceType(servicio: any): string {
    if (!servicio) return '';
    if (servicio.id_hosteleria) {
      return servicio.tipo_hs === 'Hotel' ? 'Hotel' : 'Restaurante';
    }
    if (servicio.id_trans) return 'Transportista';
    if (servicio.id_guia) return 'Guia';
    if (servicio.id_atracTuris) {
      switch(servicio.tipo_actur) {
        case 'Museo':
          return 'Museo';
        case 'Viñedo':
          return 'Viñedo';
        default:
          return 'Atractivo Turístico';
      }
    }
    return '';
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
    this.selectedPackage = null;
    this.packageDataService.clearItems(); // Limpiar los servicios seleccionados
  }
}
