
import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';
import { ServicioGenericoCRUD } from '../../../../core/services/CRUDS/crud-servicio.service';

interface Activity {
  time: string;
  name: string;
  description: string;
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
  id_usr: number = 1; // Asume un id_usr válido para la prueba
  id_agencia: number = 1; // Asume un id_agencia válido para la prueba
  id_guia: number = 1; // Asume un id_guia válido para la prueba
  id_hotel: number = 1; // Asume un id_hotel válido para la prueba
  id_restaurante: number = 1; // Asume un id_restaurante válido para la prueba
  selectedPackage: any;

  constructor(
    private servicioGenericoCRUD: ServicioGenericoCRUD,
    private packageDataService: PackageDataService
  ) {}

  ngOnInit() {
    this.packageDataService.selectedPackage$.subscribe(selectedPackage => {
      this.selectedPackage = selectedPackage;
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
      name: '',
      description: ''
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
        if (!activity.time || !activity.name || !activity.description) {
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
        id_guia: this.id_guia,
        id_hotel: this.id_hotel,
        id_restaurante: this.id_restaurante,
        activities: this.days,
        servicios: this.selectedPackage ? this.selectedPackage.servicios : []
      };
      this.servicioGenericoCRUD.create('Paquete', packageData).subscribe(response => {
        console.log('Paquete creado exitosamente:', response);
      }, error => {
        console.error('Error al crear el paquete:', error);
      });
    }
  }
}
