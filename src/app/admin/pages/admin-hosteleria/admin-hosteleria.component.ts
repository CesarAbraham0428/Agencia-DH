import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HosteleriaService } from '../../../core/services/hosteleria.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/directives/dialog-content/confirm-dialog.component';
import Swal from 'sweetalert2';

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
      tipo_hs: [''],
      nom_hs: ['', Validators.required],
      descripcion_hs: [''],
      accesibility_infrastr_hs: [''],
      tipologia_hs: [''],
      costo_hs: [''],
      capacidad_hs: [''],
      servicios: [''],
      img_hs: ['']
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
    Swal.fire({
      title: "!Hecho!",
      text: "Registro exitoso.",
      icon: "success"
    });
  }

  editHosteleria(hosteleria: any): void {
    this.isEditing = true;
    this.editingHosteleriaId = hosteleria.id_hosteleria;
    this.hosteleriaForm.setValue({
      tipo_hs: hosteleria.tipo_hs,
      nom_hs: hosteleria.nom_hs,
      descripcion_hs: hosteleria.descripcion_hs,
      accesibility_infrastr_hs: hosteleria.accesibility_infrastr_hs,
      tipologia_hs: hosteleria.tipologia_hs,
      costo_hs: hosteleria.costo_hs,
      capacidad_hs: hosteleria.capacidad_hs,
      servicios: hosteleria.servicios,
      img_hs: hosteleria.img_hs
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
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No serás capaz de revertir está acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "!Borrado!",
          text: "Tu registro ha sido borrado.",
          icon: "success"
        });
        this.hosteleriaService.deleteHosteleria(id_hosteleria).subscribe(() => {
          this.loadHosteleria();
        });
      }
    });
  }
}
