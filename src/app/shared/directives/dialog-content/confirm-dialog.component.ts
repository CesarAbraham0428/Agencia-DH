import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <style>
    .titulo {
      padding-top: 10px;
      margin: auto;
    }
    .texto {
      margin: auto;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 10px;
      padding-top: 10px;
    }
    .botones {
      display:flex;
      padding-left: 20px;
      padding-bottom: 20px;
      padding-right: 20px;
    }
    .botoneIzquierdo {
      margin: auto;
    }
    .botonDerecho {
      margin: auto;
    }
  </style>
  <h1 mat-dialog-title class="titulo">Confirmación</h1>
  <div mat-dialog-content class="texto">
   <p>{{ data.message }}</p>
  </div>
  <div mat-dialog-actions class="botones">
   <button mat-button (click)="onNoClick()" class="botoneIzquierdo">Cancelar</button>
    <button mat-button (click)="onYesClick()" class="botonDerecho">Aceptar</button>
  </div>`,
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
