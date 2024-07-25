import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-paquetes',
  templateUrl: './crear-paquetes.component.html',
  styleUrls: ['./crear-paquetes.component.scss'],
})
export class CraerPaquetesComponent {
  currentStep: number = 1;

  constructor() {}

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

}
