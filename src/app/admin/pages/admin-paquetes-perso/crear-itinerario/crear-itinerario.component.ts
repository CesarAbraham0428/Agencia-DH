
// crear-itinerario.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-itinerario',
  templateUrl: './crear-itinerario.component.html',
  styleUrls: ['./crear-itinerario.component.scss']
})
export class CrearItinerarioComponent {
  startDate: string | undefined;
  endDate: string | undefined;
  activities: { date: string, time: string, description: string }[] = [];

  addActivity() {
    this.activities.push({ date: '', time: '', description: '' });
  }

  removeActivity(index: number) {
    this.activities.splice(index, 1);
  }
}
