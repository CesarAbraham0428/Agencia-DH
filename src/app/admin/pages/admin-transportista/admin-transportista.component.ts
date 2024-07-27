import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportistaService } from '../../../core/services/transportista.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/directives/dialog-content/confirm-dialog.component';


@Component({
  selector: 'app-admin-transportista',
  templateUrl: './admin-transportista.component.html',
  styleUrls: ['./admin-transportista.component.scss']
})
export class AdminTransportistaComponent implements OnInit {
  transportistaForm: FormGroup;
  transportista: any[] = [];
  isEditing = false;
  editingTransportistaId: number | null = null;

  constructor(private fb: FormBuilder, private transportistaService: TransportistaService,
    public dialog: MatDialog) {
    this.transportistaForm = this.fb.group({
      nom_trans: ['', Validators.required],
      apellidos_trans: ['', Validators.required],
      alcance_trans: ['', Validators.required],
      email_trans: ['', [Validators.required, Validators.email]],
      tarifa_trans: ['',Validators.required],
      servicios_trans: ['', Validators.required],
      tel_trans: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTransportistas();
  }

  loadTransportistas(): void {
    this.transportistaService.getAllTransportistas().subscribe((data) => {
      this.transportista = data;
    })
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateTransportista();
    } else {
      this.createTransportista();
    }
  }

  createTransportista(): void {
    if (this.transportistaForm.valid) {
      this.transportistaService.createTransportista(this.transportistaForm.value).subscribe(() => {
        this.loadTransportistas();
        this.transportistaForm.reset();
      });
    }
  }

  editTransportista(transportista: any): void {
    this.isEditing = true;
    this.editingTransportistaId = transportista.id_trans;
    this.transportistaForm.setValue({
      nom_trans: transportista.nom_trans, apellidos_trans: transportista.apellidos_trans,
      alcance_trans: transportista.alcance_trans, email_trans: transportista.email_trans,
      tarifa_trans: transportista.tarifa_trans, servicios_trans: transportista.servicios_trans,
      tel_trans: transportista.tel_trans
    });
  }

  updateTransportista(): void {
    if (this.transportistaForm.valid && this.editingTransportistaId !== null) {
      const updatedTransportista = { ...this.transportistaForm.value, id_trans: this.editingTransportistaId };
      this.transportistaService.updateTransportista(updatedTransportista).subscribe(() => {
        this.loadTransportistas();
        this.transportistaForm.reset();
        this.isEditing = false;
        this.editingTransportistaId = null;
      })
    }
  }

  deleteTransportista(id_trans: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Deseas continuar?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transportistaService.deleteTransportista(id_trans).subscribe(() => {
          this.loadTransportistas();
        })
      }
    })
  }
}
