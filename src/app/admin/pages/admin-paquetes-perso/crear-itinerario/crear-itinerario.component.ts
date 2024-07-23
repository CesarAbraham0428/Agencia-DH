
import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-itinerario',
  templateUrl: './crear-itinerario.component.html',
  styleUrls: ['./crear-itinerario.component.scss']
})
export class CrearItinerarioComponent {

  activities: [] = [];

  addActivity() {
    this.activities.push();
  }

  removeActivity(index: number) {
    this.activities.splice(index, 1);
  }
}
 