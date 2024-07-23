import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalMaterialComponent } from './modal-material/modal-material.component';


@Component({
  selector: 'app-admin-paquetes-perso',
  templateUrl: './admin-paquetes-perso.component.html',
  styleUrls: ['./admin-paquetes-perso.component.scss']
})
export class AdminPaquetesPersoComponent {
  currentStep: number = 1;

  constructor(public dialog: MatDialog) {}

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

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalMaterialComponent, {
      width: '250px',
      data: { nombre: '', costo: null, tipo: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Paquete creado:', result);
        // Aquí puedes manejar el resultado del modal
      }
    });
  }
}
