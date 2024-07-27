import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HosteleriaService } from '../../../core/services/hosteleria.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/directives/dialog-content/confirm-dialog.component';

@Component({
  selector: 'app-admin-hosteleria',
  templateUrl: './admin-hosteleria.component.html',
  styleUrls: ['./admin-hosteleria.component.scss']
})
export class AdminHosteleriaComponent implements OnInit {
  hosteleriaForm: FormGroup;
  hosteleria: any[] = [];
  isEditing = false;
  editingHosteleriaId: number | null = null;

  constructor(private fb: FormBuilder, private hosteleriaService: HosteleriaService,
    public dialog: MatDialog) {
    this.hosteleriaForm = this.fb.group({
      nom_hs: ['', Validators.required],
      descripcion_hs: ['', Validators.required],
      accesibility_infrastr_hs: ['', Validators.required],
      tipologia_hs: ['', Validators.required],
      costo_hs: ['', Validators.required],
      capacidad_hs: ['', Validators.required],
      servicios: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadHosteleria();
  }

  loadHosteleria(): void {
    this.hosteleriaService.getAllHostelerias().subscribe((data) => {
      this.hosteleria = data;
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateHosteleria();
    } else {
      this.createHosteleria();
    }
  }

  createHosteleria(): void {
    if (this.hosteleriaForm.valid) {
      this.hosteleriaService.createHosteleria(this.hosteleriaForm.value).subscribe(() => {
        this.loadHosteleria();
        this.hosteleriaForm.reset();
      });
    }
  }

  editHosteleria(hosteleria: any): void {
    this.isEditing = true;
    this.editingHosteleriaId = hosteleria.id_hosteleria;
    this.hosteleriaForm.setValue({
      nom_hs: hosteleria.nom_hs,
      descripcion_hs: hosteleria.descripcion_hs,
      accesibility_infrastr_hs: hosteleria.accesibility_infrastr_hs,
      tipologia_hs: hosteleria.tipologia_hs,
      costo_hs: hosteleria.costo_hs,
      capacidad_hs: hosteleria.capacidad_hs,
      servicios: hosteleria.servicios
    });
  }

  updateHosteleria(): void {
    if (this.hosteleriaForm.valid && this.editingHosteleriaId !== null) {
      const updatedHosteleria = { ...this.hosteleriaForm.value, id_hosteleria: this.editingHosteleriaId };
      this.hosteleriaService.updateHosteleria(updatedHosteleria).subscribe(() => {
        this.loadHosteleria();
        this.hosteleriaForm.reset();
        this.isEditing = false;
        this.editingHosteleriaId = null;
      });
    }
  }

  deleteHosteleria(id_hosteleria: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: '¿Deseas continuar?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.hosteleriaService.deleteHosteleria(id_hosteleria).subscribe(() => {
          this.loadHosteleria();
        });
      }
    });
  }
}
