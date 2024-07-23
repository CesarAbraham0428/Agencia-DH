import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
/* import { PaqueteService } from '../../../core/services/CRUDS/paquete.service'; */

import { ModalMaterialComponent } from './modal-material/modal-material.component';

@Component({
  selector: 'app-admin-paquetes-perso',
  templateUrl: './admin-paquetes-perso.component.html',
  styleUrls: ['./admin-paquetes-perso.component.scss'],
})
export class AdminPaquetesPersoComponent {
  currentStep: number = 1;

  constructor(
    private dialog: MatDialog,
/*     private paqueteService: PaqueteService */
  ) {}

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

  openModal() {
    const dialogRef = this.dialog.open(ModalMaterialComponent, {
      width: '300px',
      data: {},
    });
  }
}
