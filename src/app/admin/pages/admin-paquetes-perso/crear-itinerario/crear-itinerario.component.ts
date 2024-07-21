
import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-itinerario',
  templateUrl: './crear-itinerario.component.html',
  styleUrls: ['./crear-itinerario.component.scss']
})
export class CrearItinerarioComponent {
  startDate: string | undefined;
  endDate: string | undefined;
  activities: { time: string, description: string }[] = [];

  addActivity() {
    this.activities.push({ time: '', description: '' });
  }

  removeActivity(index: number) {
    this.activities.splice(index, 1);
  }
}
 