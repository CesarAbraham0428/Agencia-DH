import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GuiaService } from '../../../core/services/guia.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/directives/dialog-content/confirm-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-guias',
  templateUrl: './admin-guias.component.html',
  styleUrls: ['./admin-guias.component.scss']
})
export class AdminGuiasComponent implements OnInit {
  guiaForm: FormGroup;
  guia: any[] = [];
  isEditing = false;
  editingGuiaId: number | null = null;

  constructor(private fb: FormBuilder, private guiaService: GuiaService,
    public dialog: MatDialog) {
    this.guiaForm = this.fb.group({
      nom_guia: ['', Validators.required],
      apellido_guia: ['', Validators.required],
      nomcalle_guia: [''],
      numcalle_guia: [''],
      comunidad_guia: [''],
      categoria_guia: [''],
      telefono_guia: ['', Validators.required],
      costo_guia: [''],
      email_guia: ['']
    });
  }

  ngOnInit(): void {
    this.loadGuias();
  }

  loadGuias(): void {
    this.guiaService.getAllGuias().subscribe((data) => {
      this.guia = data;
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.updateGuia();
    } else {
      this.createGuia();
    }
  }

  createGuia(): void {
    if (this.guiaForm.valid) {
      this.guiaService.createGuia(this.guiaForm.value).subscribe(() => {
        this.loadGuias();
        this.guiaForm.reset();
      });
    }
    Swal.fire({
      title: "!Hecho!",
      text: "Registro exitoso.",
      icon: "success"
    });
  }

  editGuia(guia: any): void {
    this.isEditing = true;
    this.editingGuiaId = guia.id_guia;
    this.guiaForm.setValue({
      nom_guia: guia.nom_guia,
      apellido_guia: guia.apellido_guia,
      nomcalle_guia: guia.nomcalle_guia,
      numcalle_guia: guia.numcalle_guia,
      comunidad_guia: guia.comunidad_guia,
      categoria_guia: guia.categoria_guia,
      telefono_guia: guia.telefono_guia,
      costo_guia: guia.costo_guia,
      email_guia: guia.email_guia
    });
  }

  updateGuia(): void {
    if (this.guiaForm.valid && this.editingGuiaId !== null) {
      const updatedGuia = { ...this.guiaForm.value, id_guia: this.editingGuiaId };
      this.guiaService.updateGuia(updatedGuia).subscribe(() => {
        this.loadGuias();
        this.guiaForm.reset();
        this.isEditing = false;
        this.editingGuiaId = null;
      });
    }
  }

  deleteGuia(id_guia: number): void {
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
        this.guiaService.deleteGuia(id_guia).subscribe(() => {
          this.loadGuias();
        });
      }
    });
  }
}
