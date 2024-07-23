import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-paquetes-perso',
  templateUrl: './admin-paquetes-perso.component.html',
  styleUrls: ['./admin-paquetes-perso.component.scss'],
})
export class AdminPaquetesPersoComponent {
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
