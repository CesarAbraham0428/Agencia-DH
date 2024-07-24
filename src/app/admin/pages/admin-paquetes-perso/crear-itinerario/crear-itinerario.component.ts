import { Component, OnInit } from '@angular/core';
import { PackageDataService } from '../../../../core/services/admin-crear-paquete.service';
import { ServicioGenericoCRUD } from '../../../../core/services/CRUDS/crud-servicio.service';

interface Activity {
  time: string;
  name: string;
  description: string;
  date: string;
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
    private packageDataService: PackageDataService
  ) {}

  ngOnInit() {
    this.packageDataService.selectedPackage$.subscribe(selectedPackage => {
      this.selectedPackage = selectedPackage;
      console.log('Selected package:', this.selectedPackage); // Verifica aquí
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
      description: '',
      date: this.days[dayIndex].date
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
        if (!activity.time || !activity.name || !activity.description || !activity.date) {
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
        activities: this.days.flatMap(day => day.activities),
        servicios: this.selectedPackage ? this.selectedPackage.servicios.map((s: any) => ({ id: s.id, tipo: s.tipo })) : [] // Incluye ID y tipo de servicio
      };
      console.log('Datos del paquete a enviar:', packageData);
      this.servicioGenericoCRUD.create('Paquete', packageData).subscribe(response => {
        console.log('Paquete creado exitosamente:', response);
      }, error => {
        console.error('Error al crear el paquete:', error);
      });
    }
  }
  
  

  getDuration() {
    if (!this.startDate || this.days.length === 0) return 0;
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.days[this.days.length - 1].date);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include the start date
    return diffDays;
  }
}
